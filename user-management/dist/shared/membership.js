"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityPerson = exports.PersonCommunity = void 0;
class PersonCommunity {
    communityId;
    active;
    constructor(communityId, active = true) {
        this.communityId = communityId;
        this.active = active;
    }
}
exports.PersonCommunity = PersonCommunity;
class CommunityPerson {
    personId;
    active;
    constructor(personId, active = true) {
        this.personId = personId;
        this.active = active;
    }
}
exports.CommunityPerson = CommunityPerson;
//# sourceMappingURL=membership.js.map