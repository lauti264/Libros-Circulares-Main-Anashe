import { AxiosError, AxiosHeaders } from 'axios';
import { of, throwError } from 'rxjs';
import { ConflictException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OperationManagementClient } from './operation-management.client';

describe('OperationManagementClient', () => {
  const get = jest.fn();
  const client = new OperationManagementClient({ get } as unknown as HttpService);

  beforeEach(() => {
    get.mockReset();
  });

  it('reports open operations when status is not closed', async () => {
    get.mockReturnValue(of({ data: [{ status: 'loan' }] }));
    await expect(client.hasOpenOperations('p1')).resolves.toBe(true);
  });

  it('treats empty list as closed', async () => {
    get.mockReturnValue(of({ data: [] }));
    await expect(client.hasOpenOperations('p1')).resolves.toBe(false);
  });

  it('treats 404 as no open operations', async () => {
    const error = new AxiosError('not found');
    error.response = {
      status: 404,
      statusText: 'Not Found',
      data: {},
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    get.mockReturnValue(throwError(() => error));
    await expect(client.hasOpenOperations('p1')).resolves.toBe(false);
  });

  it('rejects leave when the operations service is down', async () => {
    get.mockReturnValue(throwError(() => new Error('ECONNREFUSED')));
    await expect(client.hasOpenOperations('p1')).rejects.toBeInstanceOf(
      ConflictException,
    );
  });
});
