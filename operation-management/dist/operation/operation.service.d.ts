import { Assignment } from '../entities/assignment.entity';
import { Loan } from '../entities/loan.entity';
import { ReturnOperation } from '../entities/return.entity';
import { UnsubscribeB } from '../entities/unsubscribe-b.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateLoanDto } from './dto/create-loan.dto';
import { CreateReturnDto } from './dto/create-return.dto';
import { CreateUnsuscribeDto } from './dto/create-unsubscribe.dto';
export declare class OperationService {
    static loans: Loan[];
    static returns: ReturnOperation[];
    static assignments: Assignment[];
    static unsubscribeBs: UnsubscribeB[];
    getCopyState(copyId: string): {
        id: string;
        ownerId: string;
        currentHolderId: string;
        unsubscribed: boolean;
    };
    createLoan(input: CreateLoanDto): Promise<Loan>;
    createReturn(input: CreateReturnDto): Promise<ReturnOperation>;
    createAssignment(input: CreateAssignmentDto): Promise<Assignment>;
    createUnsuscribeB(input: CreateUnsuscribeDto): Promise<UnsubscribeB>;
    hasOpenOperations(personId: string): boolean;
    areAllOperationsClosed(personId: string): boolean;
    getPersonOperations(personId: string): Array<{
        id: string;
        copyId: string;
        closed: boolean;
        owner: string;
        ownerLoan: string;
        status: 'open' | 'closed';
    }>;
    private ensureCopyIsActive;
    private findOpenLoanForCopy;
}
