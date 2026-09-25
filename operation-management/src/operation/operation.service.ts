import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Assignment } from '../entities/assignment.entity';
import { Loan } from '../entities/loan.entity';
import { ReturnOperation } from '../entities/return.entity';
import { UnsubscribeB } from '../entities/unsubscribe-b.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateLoanDto } from './dto/create-loan.dto';
import { CreateReturnDto } from './dto/create-return.dto';
import { CreateUnsuscribeDto } from './dto/create-unsubscribe.dto';

@Injectable()
export class OperationService {
  static loans: Loan[] = [];
  static returns: ReturnOperation[] = [];
  static assignments: Assignment[] = [];
  static unsubscribeBs: UnsubscribeB[] = [];

  getCopyState(copyId: string): {
    id: string;
    ownerId: string;
    currentHolderId: string;
    unsubscribed: boolean;
  } {
    const latestAssignment = [...OperationService.assignments]
      .reverse()
      .find((assignment) => assignment.copyId === copyId);

    const latestLoan = [...OperationService.loans]
      .reverse()
      .find((loan) => loan.copyId === copyId);

    const unsubscribed = OperationService.unsubscribeBs.some(
      (item) => item.copyId === copyId,
    );

    const ownerId = latestAssignment?.ownerAssignment ?? latestLoan?.owner ?? 'unknown';
    const currentHolderId = latestLoan?.ownerLoan ?? ownerId;

    return {
      id: copyId,
      ownerId,
      currentHolderId,
      unsubscribed,
    };
  }

  async createLoan(input: CreateLoanDto): Promise<Loan> {
    const copy = this.getCopyState(input.copyId);
    this.ensureCopyIsActive(copy);

    if (!input.owner || !input.ownerLoan) {
      throw new BadRequestException('Loan requires both owner and ownerLoan');
    }

    if (input.owner !== copy.currentHolderId) {
      throw new BadRequestException(
        `The person who owns the copy at the moment of the loan must be the current holder: ${copy.currentHolderId}`,
      );
    }

    if (input.ownerLoan === input.owner) {
      throw new BadRequestException(
        'The borrower must be different from the current holder',
      );
    }

    const activeLoan = this.findOpenLoanForCopy(input.copyId);
    if (activeLoan) {
      throw new ConflictException(
        `Copy ${input.copyId} already has an active loan: ${activeLoan.id}`,
      );
    }

    const loan = new Loan({
      copyId: input.copyId,
      owner: input.owner,
      ownerLoan: input.ownerLoan,
      dateBegin: input.dateBegin ?? new Date(),
      dateEnd:
        input.dateEnd ?? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    OperationService.loans.push(loan);

    return loan;
  }

  async createReturn(input: CreateReturnDto): Promise<ReturnOperation> {
    const loan = OperationService.loans.find((item) => item.id === input.loanId);

    if (!loan) {
      throw new NotFoundException(`Loan ${input.loanId} was not found`);
    }

    if (loan.closed) {
      throw new ConflictException(`Loan ${input.loanId} is already closed`);
    }

    const copy = this.getCopyState(loan.copyId);
    this.ensureCopyIsActive(copy);

    const returned = new ReturnOperation({
      loanId: loan.id,
      date: input.date ?? new Date(),
    });

    OperationService.returns.push(returned);
    loan.closed = true;

    return returned;
  }

  async createAssignment(input: CreateAssignmentDto): Promise<Assignment> {
    const copy = this.getCopyState(input.copyId);
    this.ensureCopyIsActive(copy);

    if (!input.ownerAssignment) {
      throw new BadRequestException('ownerAssignment is required');
    }

    if (copy.ownerId !== input.owner) {
      throw new BadRequestException(
        `The specified owner ${input.owner} is not the current owner of copy ${input.copyId}`,
      );
    }

    const assignment = new Assignment({
      copyId: input.copyId,
      owner: input.owner,
      ownerAssignment: input.ownerAssignment,
      date: input.date ?? new Date(),
    });

    OperationService.assignments.push(assignment);
    return assignment;
  }

  async createUnsuscribeB(input: CreateUnsuscribeDto): Promise<UnsubscribeB> {
    const copy = this.getCopyState(input.copyId);

    if (copy.unsubscribed) {
      const unsubscribe = new UnsubscribeB({
        copyId: input.copyId,
        date: input.date ?? new Date(),
      });
      OperationService.unsubscribeBs.push(unsubscribe);
      return unsubscribe;
    }

    copy.unsubscribed = true;
    const unsubscribe = new UnsubscribeB({
      copyId: input.copyId,
      date: input.date ?? new Date(),
    });

    OperationService.unsubscribeBs.push(unsubscribe);
    return unsubscribe;
  }

  hasOpenOperations(personId: string): boolean {
    return this.getPersonOperations(personId).some(
      (operation) => !operation.closed,
    );
  }

  areAllOperationsClosed(personId: string): boolean {
    return !this.hasOpenOperations(personId);
  }

  getPersonOperations(personId: string): Array<{
    id: string;
    copyId: string;
    closed: boolean;
    owner: string;
    ownerLoan: string;
    status: 'open' | 'closed';
  }> {
    return OperationService.loans
      .filter((loan) => loan.owner === personId || loan.ownerLoan === personId)
      .map((loan) => ({
        id: loan.id,
        copyId: loan.copyId,
        closed: loan.closed,
        owner: loan.owner,
        ownerLoan: loan.ownerLoan,
        status: loan.closed ? 'closed' : 'open',
      }));
  }

  private ensureCopyIsActive(copy: {
    id: string;
    ownerId: string;
    currentHolderId: string;
    unsubscribed: boolean;
  }): void {
    if (copy.unsubscribed) {
      throw new ConflictException(
        `Copy ${copy.id} is unsubscribed and cannot accept further operations`,
      );
    }
  }

  private findOpenLoanForCopy(copyId: string): Loan | undefined {
    return OperationService.loans.find(
      (loan) => loan.copyId === copyId && !loan.closed,
    );
  }
}
