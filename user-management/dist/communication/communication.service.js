"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationService = void 0;
const common_1 = require("@nestjs/common");
const community_1 = require("../community/community");
const person_1 = require("../person/person");
const membership_1 = require("../shared/membership");
const operation_management_client_1 = require("../infrastructure/operation-management.client");
let CommunicationService = class CommunicationService {
    operationManagementClient;
    constructor(operationManagementClient) {
        this.operationManagementClient = operationManagementClient;
    }
    async addPersonToCommunity(personId, communityId, active = true) {
        const person = person_1.Person.findByIdOrFail(personId);
        const community = community_1.Community.findByIdOrFail(communityId);
        const existing = person.communities.find((membership) => membership.communityId === communityId);
        if (existing) {
            if (existing.active === active) {
                return;
            }
            if (active) {
                this.assertCanActivate(person, communityId);
                existing.active = true;
                const communityMember = community.persons.find((member) => member.personId === personId);
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
        person.communities.push(new membership_1.PersonCommunity(communityId, active));
        community.persons.push(new membership_1.CommunityPerson(personId, active));
    }
    async inactivate(personId, communityId) {
        const person = person_1.Person.findByIdOrFail(personId);
        community_1.Community.findByIdOrFail(communityId);
        const membership = person.communities.find((item) => item.communityId === communityId);
        if (!membership) {
            throw new common_1.BadRequestException(`Person ${personId} is not a member of community ${communityId}`);
        }
        if (!membership.active) {
            return;
        }
        await this.assertOperationsClosed(personId);
        membership.active = false;
        const community = community_1.Community.findByIdOrFail(communityId);
        const member = community.persons.find((item) => item.personId === personId);
        if (member) {
            member.active = false;
        }
    }
    async removePersonFromCommunity(personId, communityId) {
        const person = person_1.Person.findByIdOrFail(personId);
        const community = community_1.Community.findByIdOrFail(communityId);
        const membership = person.communities.find((item) => item.communityId === communityId);
        if (!membership) {
            return;
        }
        if (membership.active) {
            await this.assertOperationsClosed(personId);
        }
        person.communities = person.communities.filter((item) => item.communityId !== communityId);
        community.persons = community.persons.filter((item) => item.personId !== personId);
    }
    async syncPersonCommunities(personId, desired) {
        const person = person_1.Person.findByIdOrFail(personId);
        const desiredIds = new Set(desired.map((item) => item.communityId));
        for (const membership of [...person.communities]) {
            if (!desiredIds.has(membership.communityId)) {
                await this.removePersonFromCommunity(personId, membership.communityId);
            }
        }
        for (const item of desired) {
            await this.addPersonToCommunity(personId, item.communityId, item.active ?? true);
        }
    }
    async syncCommunityPersons(communityId, desired) {
        const community = community_1.Community.findByIdOrFail(communityId);
        const currentIds = new Set(community.persons.map((member) => member.personId));
        const desiredIds = new Set(desired.map((item) => item.personId));
        for (const personId of desiredIds) {
            if (!currentIds.has(personId)) {
                throw new common_1.BadRequestException(`Cannot add person ${personId} from community; join from person`);
            }
        }
        for (const member of [...community.persons]) {
            if (!desiredIds.has(member.personId)) {
                await this.removePersonFromCommunity(member.personId, communityId);
            }
        }
        for (const item of desired) {
            await this.addPersonToCommunity(item.personId, communityId, item.active ?? true);
        }
    }
    async removeCommunity(communityId) {
        const community = community_1.Community.findByIdOrFail(communityId);
        for (const member of [...community.persons]) {
            await this.removePersonFromCommunity(member.personId, communityId);
        }
        community_1.Community.deleteById(communityId);
    }
    async removePerson(personId) {
        const person = person_1.Person.findByIdOrFail(personId);
        for (const membership of [...person.communities]) {
            await this.removePersonFromCommunity(personId, membership.communityId);
        }
        person_1.Person.deleteById(personId);
    }
    assertCanActivate(person, communityId) {
        const alreadyActive = person.communities.some((membership) => membership.communityId === communityId && membership.active);
        if (alreadyActive) {
            return;
        }
        if (person.activeCommunityCount() >= 3) {
            throw new common_1.ConflictException('Person already has 3 active communities; inactivate one first');
        }
    }
    async assertOperationsClosed(personId) {
        const hasOpen = await this.operationManagementClient.hasOpenOperations(personId);
        if (hasOpen) {
            throw new common_1.ConflictException(`Person ${personId} has open operations and cannot leave or inactivate a community`);
        }
    }
};
exports.CommunicationService = CommunicationService;
exports.CommunicationService = CommunicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [operation_management_client_1.OperationManagementClient])
], CommunicationService);
//# sourceMappingURL=communication.service.js.map