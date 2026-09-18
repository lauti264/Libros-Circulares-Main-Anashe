export class PersonCommunity {
  communityId: string;
  active: boolean;

  constructor(communityId: string, active = true) {
    this.communityId = communityId;
    this.active = active;
  }
}

export class CommunityPerson {
  personId: string;
  active: boolean;

  constructor(personId: string, active = true) {
    this.personId = personId;
    this.active = active;
  }
}
