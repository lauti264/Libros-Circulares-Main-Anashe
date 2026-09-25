import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

type OperationPayload = {
  status?: string;
  closed?: boolean;
};

@Injectable()
export class OperationManagementClient {
  constructor(private readonly httpService: HttpService) {}

  async hasOpenOperations(personId: string): Promise<boolean> {
    const baseUrl =
      process.env.OPERATION_MANAGEMENT_URL ?? 'http://localhost:3001';

    try {
      const booleanResponse = await firstValueFrom(
        this.httpService.get<boolean>(`${baseUrl}/operations/user/${personId}`),
      );

      if (typeof booleanResponse.data === 'boolean') {
        return !booleanResponse.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status !== 404) {
        // continue to the fallback below when the boolean endpoint is not available
      }
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${baseUrl}/persons/${personId}/operations`),
      );
      const data = response.data as
        | OperationPayload[]
        | { operations?: OperationPayload[] };
      const operations = Array.isArray(data)
        ? data
        : (data.operations ?? []);
      return operations.some((operation) => !this.isClosed(operation));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return false;
      }
      throw new ConflictException(
        `Cannot leave community: operations for person ${personId} could not be verified`,
      );
    }
  }

  private isClosed(operation: OperationPayload): boolean {
    if (operation.closed === true) {
      return true;
    }
    const status = (operation.status ?? '').toLowerCase();
    return ['closed', 'returned', 'completed', 'done'].includes(status);
  }
}
