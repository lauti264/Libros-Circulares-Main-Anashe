import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { OperationManagementClient } from './../src/infrastructure/operation-management.client';
import { Person } from './../src/person/person';
import { Community } from './../src/community/community';

describe('User management (e2e)', () => {
  let app: INestApplication<App>;
  const operationsClient = {
    hasOpenOperations: jest.fn().mockResolvedValue(false),
  };

  beforeEach(async () => {
    Person.reset();
    Community.reset();
    operationsClient.hasOpenOperations.mockResolvedValue(false);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(OperationManagementClient)
      .useValue(operationsClient)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates community and person, then joins via person', async () => {
    await request(app.getHttpServer())
      .post('/communities')
      .send({ id: 'c1', name: 'North' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/persons')
      .send({
        id: 'p1',
        name: 'Ana',
        surname: 'Lopez',
        dni: '111',
        fdn: '1990-01-01',
        communities: [{ communityId: 'c1', active: true }],
      })
      .expect(201);

    const persons = await request(app.getHttpServer()).get('/persons').expect(200);
    expect(persons.body[0].communities[0].communityId).toBe('c1');
  });

  it('rejects creating a community with persons', async () => {
    await request(app.getHttpServer())
      .post('/communities')
      .send({ id: 'c1', name: 'North', persons: [{ personId: 'p1' }] })
      .expect(400);
  });

  it('rejects patching immutable person fields', async () => {
    await request(app.getHttpServer())
      .post('/persons')
      .send({
        id: 'p1',
        name: 'Ana',
        surname: 'Lopez',
        dni: '111',
        fdn: '1990-01-01',
      })
      .expect(201);

    await request(app.getHttpServer())
      .patch('/persons/p1')
      .send({ name: 'Anita' })
      .expect(400);
  });
});
