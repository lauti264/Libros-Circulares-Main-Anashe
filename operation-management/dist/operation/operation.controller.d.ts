import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateLoanDto } from './dto/create-loan.dto';
import { CreateReturnDto } from './dto/create-return.dto';
import { CreateUnsuscribeDto } from './dto/create-unsubscribe.dto';
import { OperationService } from './operation.service';
export declare class OperationController {
    private readonly operationService;
    constructor(operationService: OperationService);
    getOperationsByPerson(personId: string): {
        id: string;
        copyId: string;
        closed: boolean;
        owner: string;
        ownerLoan: string;
        status: "open" | "closed";
    }[];
    isPersonOperationsClosed(personId: string): boolean;
    createLoan(dto: CreateLoanDto): Promise<import("../entities/loan.entity").Loan>;
    createReturn(dto: CreateReturnDto): Promise<import("../entities/return.entity").ReturnOperation>;
    createAssignment(dto: CreateAssignmentDto): Promise<import("../entities/assignment.entity").Assignment>;
    createUnsuscribe(dto: CreateUnsuscribeDto): Promise<import("../entities/unsubscribe-b.entity").UnsubscribeB>;
}
