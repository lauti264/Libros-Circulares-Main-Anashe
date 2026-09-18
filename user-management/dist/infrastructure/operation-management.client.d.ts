import { HttpService } from '@nestjs/axios';
export declare class OperationManagementClient {
    private readonly httpService;
    constructor(httpService: HttpService);
    hasOpenOperations(personId: string): Promise<boolean>;
    private isClosed;
}
