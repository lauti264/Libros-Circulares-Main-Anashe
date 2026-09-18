import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationService } from './communication.service';
import { OperationManagementClient } from '../infrastructure/operation-management.client';
import { Person } from '../person/person';
import { Community } from '../community/community';

describe('CommunicationService', () => {
  let service: CommunicationService;
  let hasOpenOperations: jest.Mock;

  beforeEach(async () => {
    Person.reset();
    Community.reset();
    hasOpenOperations = jest.fn().mockResolvedValue(false);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunicationService,
        {
          provide: OperationManagementClient,
          useValue: { hasOpenOperations },
        },
      ],
    }).compile();

    service = module.get(CommunicationService);

    Community.fromDto({ id: 'c1', name: 'North' });
    Community.fromDto({ id: 'c2', name: 'South' });
    Community.fromDto({ id: 'c3', name: 'East' });
    Community.fromDto({ id: 'c4', name: 'West' });

    Person.fromDto({
      id: 'adult-1',
      name: 'Ana',
      surname: 'Lopez',
      dni: '111',
      fdn: '1990-01-01',
    });
  });

  it('adds a person to a community on both sides', async () => {
    await service.addPersonToCommunity('adult-1', 'c1', true);

    const person = Person.findByIdOrFail('adult-1');
    const community = Community.findByIdOrFail('c1');
    expect(person.communities).toEqual([
      { communityId: 'c1', active: true },
    ]);
    expect(community.persons).toEqual([{ personId: 'adult-1', active: true }]);
  });

  it('rejects a fourth active community', async () => {
    await service.addPersonToCommunity('adult-1', 'c1', true);
    await service.addPersonToCommunity('adult-1', 'c2', true);
    await service.addPersonToCommunity('adult-1', 'c3', true);

    await expect(
      service.addPersonToCommunity('adult-1', 'c4', true),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('allows a fourth community when inactive', async () => {
    await service.addPersonToCommunity('adult-1', 'c1', true);
    await service.addPersonToCommunity('adult-1', 'c2', true);
    await service.addPersonToCommunity('adult-1', 'c3', true);
    await service.addPersonToCommunity('adult-1', 'c4', false);

    expect(Person.findByIdOrFail('adult-1').communities).toHaveLength(4);
    expect(Person.findByIdOrFail('adult-1').activeCommunityCount()).toBe(3);
  });

  it('inactivates only when operations are closed', async () => {
    await service.addPersonToCommunity('adult-1', 'c1', true);
    await service.inactivate('adult-1', 'c1');

    expect(
      Person.findByIdOrFail('adult-1').communities[0].active,
    ).toBe(false);
    expect(hasOpenOperations).toHaveBeenCalledWith('adult-1');
  });

  it('rejects inactivate when operations are open', async () => {
    hasOpenOperations.mockResolvedValue(true);
    await service.addPersonToCommunity('adult-1', 'c1', true);

    await expect(service.inactivate('adult-1', 'c1')).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(
      Person.findByIdOrFail('adult-1').communities[0].active,
    ).toBe(true);
  });

  it('removes community from persons without deleting people', async () => {
    await service.addPersonToCommunity('adult-1', 'c1', true);
    await service.removeCommunity('c1');

    expect(Community.findById('c1')).toBeUndefined();
    expect(Person.findByIdOrFail('adult-1').communities).toEqual([]);
  });
});
