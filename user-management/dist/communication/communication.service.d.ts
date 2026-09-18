import { OperationManagementClient } from '../infrastructure/operation-management.client';
export declare class CommunicationService {
    private readonly operationManagementClient;
    constructor(operationManagementClient: OperationManagementClient);
    addPersonToCommunity(personId: string, communityId: string, active?: boolean): Promise<void>;
    inactivate(personId: string, communityId: string): Promise<void>;
    removePersonFromCommunity(personId: string, communityId: string): Promise<void>;
    syncPersonCommunities(personId: string, desired: {
        communityId: string;
        active?: boolean;
    }[]): Promise<void>;
    syncCommunityPersons(communityId: string, desired: {
        personId: string;
        active?: boolean;
    }[]): Promise<void>;
    removeCommunity(communityId: string): Promise<void>;
    removePerson(personId: string): Promise<void>;
    private assertCanActivate;
    private assertOperationsClosed;
}
