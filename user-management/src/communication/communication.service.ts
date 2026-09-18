import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Community } from '../community/community';
import { Person } from '../person/person';
import { CommunityPerson, PersonCommunity } from '../shared/membership';
import { OperationManagementClient } from '../infrastructure/operation-management.client';

@Injectable()
export class CommunicationService {
  constructor(
    private readonly operationManagementClient: OperationManagementClient,
  ) {}

  async addPersonToCommunity(
    personId: string,
    communityId: string,
    active = true,
  ): Promise<void> {
    const person = Person.findByIdOrFail(personId);
    const community = Community.findByIdOrFail(communityId);

    const existing = person.communities.find(
      (membership: PersonCommunity) => membership.communityId === communityId,
    );

    if (existing) {
      if (existing.active === active) {
        return;
      }
      if (active) {
        this.assertCanActivate(person, communityId);
        existing.active = true;
        const communityMember = community.persons.find(
          (member: CommunityPerson) => member.personId === personId,
        );
        if (communityMember) {
          communityMember.active = true;
        }
        return;
      }
      await this.inactivate(personId, communityId);
      return;
    }

    if (active) {
      this.assertCanActivate(person, communityId);
    }

    person.communities.push(new PersonCommunity(communityId, active));
    community.persons.push(new CommunityPerson(personId, active));
  }

  async inactivate(personId: string, communityId: string): Promise<void> {
    const person = Person.findByIdOrFail(personId);
    Community.findByIdOrFail(communityId);

    const membership = person.communities.find(
      (item) => item.communityId === communityId,
    );
    if (!membership) {
      throw new BadRequestException(
        `Person ${personId} is not a member of community ${communityId}`,
      );
    }
    if (!membership.active) {
      return;
    }

    await this.assertOperationsClosed(personId);
    membership.active = false;
    const community = Community.findByIdOrFail(communityId);
    const member = community.persons.find(
      (item: CommunityPerson) => item.personId === personId,
    );
    if (member) {
      member.active = false;
    }
  }

  async removePersonFromCommunity(
    personId: string,
    communityId: string,
  ): Promise<void> {
    const person = Person.findByIdOrFail(personId);
    const community = Community.findByIdOrFail(communityId);

    const membership = person.communities.find(
      (item) => item.communityId === communityId,
    );
    if (!membership) {
      return;
    }

    if (membership.active) {
      await this.assertOperationsClosed(personId);
    }

    person.communities = person.communities.filter(
      (item: PersonCommunity) => item.communityId !== communityId,
    );
    community.persons = community.persons.filter(
      (item: CommunityPerson) => item.personId !== personId,
    );
  }

  async syncPersonCommunities(
    personId: string,
    desired: { communityId: string; active?: boolean }[],
  ): Promise<void> {
    const person = Person.findByIdOrFail(personId);
    const desiredIds = new Set(desired.map((item) => item.communityId));

    for (const membership of [...person.communities]) {
      if (!desiredIds.has(membership.communityId)) {
        await this.removePersonFromCommunity(
          personId,
          membership.communityId,
        );
      }
    }

    for (const item of desired) {
      await this.addPersonToCommunity(
        personId,
        item.communityId,
        item.active ?? true,
      );
    }
  }

  async syncCommunityPersons(
    communityId: string,
    desired: { personId: string; active?: boolean }[],
  ): Promise<void> {
    const community = Community.findByIdOrFail(communityId);
    const currentIds = new Set(
      community.persons.map((member) => member.personId),
    );
    const desiredIds = new Set(desired.map((item) => item.personId));

    for (const personId of desiredIds) {
      if (!currentIds.has(personId)) {
        throw new BadRequestException(
          `Cannot add person ${personId} from community; join from person`,
        );
      }
    }

    for (const member of [...community.persons]) {
      if (!desiredIds.has(member.personId)) {
        await this.removePersonFromCommunity(member.personId, communityId);
      }
    }

    for (const item of desired) {
      await this.addPersonToCommunity(
        item.personId,
        communityId,
        item.active ?? true,
      );
    }
  }

  async removeCommunity(communityId: string): Promise<void> {
    const community = Community.findByIdOrFail(communityId);
    for (const member of [...community.persons]) {
      await this.removePersonFromCommunity(member.personId, communityId);
    }
    Community.deleteById(communityId);
  }

  async removePerson(personId: string): Promise<void> {
    const person = Person.findByIdOrFail(personId);
    for (const membership of [...person.communities]) {
      await this.removePersonFromCommunity(personId, membership.communityId);
    }
    Person.deleteById(personId);
  }

  private assertCanActivate(person: Person, communityId: string): void {
    const alreadyActive = person.communities.some(
      (membership: PersonCommunity) =>
        membership.communityId === communityId && membership.active,
    );
    if (alreadyActive) {
      return;
    }
    if (person.activeCommunityCount() >= 3) {
      throw new ConflictException(
        'Person already has 3 active communities; inactivate one first',
      );
    }
  }

  private async assertOperationsClosed(personId: string): Promise<void> {
    const hasOpen =
      await this.operationManagementClient.hasOpenOperations(personId);
    if (hasOpen) {
      throw new ConflictException(
        `Person ${personId} has open operations and cannot leave or inactivate a community`,
      );
    }
  }
}
