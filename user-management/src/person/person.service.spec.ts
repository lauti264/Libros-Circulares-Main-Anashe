import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { CommunicationService } from '../communication/communication.service';
import { Person } from './person';
import { Community } from '../community/community';

describe('PersonService', () => {
  let service: PersonService;
  let communication: {
    syncPersonCommunities: jest.Mock;
    removePerson: jest.Mock;
  };

  beforeEach(async () => {
    Person.reset();
    Community.reset();
    communication = {
      syncPersonCommunities: jest.fn().mockResolvedValue(undefined),
      removePerson: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: CommunicationService, useValue: communication },
      ],
    }).compile();

    service = module.get(PersonService);
  });

  it('creates an adult without contactPerson', async () => {
    const person = await service.create({
      id: 'p1',
      name: 'Ana',
      surname: 'Lopez',
      dni: '111',
      fdn: '1990-01-01',
    });
    expect(person.id).toBe('p1');
    expect(Person.findAll()).toHaveLength(1);
  });

  it('rejects duplicate dni', async () => {
    await service.create({
      id: 'p1',
      name: 'Ana',
      surname: 'Lopez',
      dni: '111',
      fdn: '1990-01-01',
    });
    await expect(
      service.create({
        id: 'p2',
        name: 'Bruno',
        surname: 'Diaz',
        dni: '111',
        fdn: '1991-01-01',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects a minor without contactPerson', async () => {
    await expect(
      service.create({
        id: 'kid',
        name: 'Luz',
        surname: 'Perez',
        dni: '222',
        fdn: '2020-01-01',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('creates a minor with an existing adult contactPerson', async () => {
    await service.create({
      id: 'adult',
      name: 'Ana',
      surname: 'Lopez',
      dni: '111',
      fdn: '1990-01-01',
    });
    const kid = await service.create({
      id: 'kid',
      name: 'Luz',
      surname: 'Perez',
      dni: '222',
      fdn: '2020-01-01',
      contactPerson: 'adult',
    });
    expect(kid.contactPerson).toBe('adult');
  });

  it('rejects a minor whose contactPerson is also a minor', async () => {
    await service.create({
      id: 'adult',
      name: 'Ana',
      surname: 'Lopez',
      dni: '111',
      fdn: '1990-01-01',
    });
    await service.create({
      id: 'kid1',
      name: 'Luz',
      surname: 'Perez',
      dni: '222',
      fdn: '2020-01-01',
      contactPerson: 'adult',
    });
    await expect(
      service.create({
        id: 'kid2',
        name: 'Max',
        surname: 'Perez',
        dni: '333',
        fdn: '2021-01-01',
        contactPerson: 'kid1',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
