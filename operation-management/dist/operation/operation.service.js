"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OperationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationService = void 0;
const common_1 = require("@nestjs/common");
const assignment_entity_1 = require("../entities/assignment.entity");
const loan_entity_1 = require("../entities/loan.entity");
const return_entity_1 = require("../entities/return.entity");
const unsubscribe_b_entity_1 = require("../entities/unsubscribe-b.entity");
let OperationService = class OperationService {
    static { OperationService_1 = this; }
    static loans = [];
    static returns = [];
    static assignments = [];
    static unsubscribeBs = [];
    getCopyState(copyId) {
        const latestAssignment = [...OperationService_1.assignments]
            .reverse()
            .find((assignment) => assignment.copyId === copyId);
        const latestLoan = [...OperationService_1.loans]
            .reverse()
            .find((loan) => loan.copyId === copyId);
        const unsubscribed = OperationService_1.unsubscribeBs.some((item) => item.copyId === copyId);
        const ownerId = latestAssignment?.ownerAssignment ?? latestLoan?.owner ?? 'unknown';
        const currentHolderId = latestLoan?.ownerLoan ?? ownerId;
        return {
            id: copyId,
            ownerId,
            currentHolderId,
            unsubscribed,
        };
    }
    async createLoan(input) {
        const copy = this.getCopyState(input.copyId);
        this.ensureCopyIsActive(copy);
        if (!input.owner || !input.ownerLoan) {
            throw new common_1.BadRequestException('Loan requires both owner and ownerLoan');
        }
        if (input.owner !== copy.currentHolderId) {
            throw new common_1.BadRequestException(`The person who owns the copy at the moment of the loan must be the current holder: ${copy.currentHolderId}`);
        }
        if (input.ownerLoan === input.owner) {
            throw new common_1.BadRequestException('The borrower must be different from the current holder');
        }
        const activeLoan = this.findOpenLoanForCopy(input.copyId);
        if (activeLoan) {
            throw new common_1.ConflictException(`Copy ${input.copyId} already has an active loan: ${activeLoan.id}`);
        }
        const loan = new loan_entity_1.Loan({
            copyId: input.copyId,
            owner: input.owner,
            ownerLoan: input.ownerLoan,
            dateBegin: input.dateBegin ?? new Date(),
            dateEnd: input.dateEnd ?? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        });
        OperationService_1.loans.push(loan);
        return loan;
    }
    async createReturn(input) {
        const loan = OperationService_1.loans.find((item) => item.id === input.loanId);
        if (!loan) {
            throw new common_1.NotFoundException(`Loan ${input.loanId} was not found`);
        }
        if (loan.closed) {
            throw new common_1.ConflictException(`Loan ${input.loanId} is already closed`);
        }
        const copy = this.getCopyState(loan.copyId);
        this.ensureCopyIsActive(copy);
        const returned = new return_entity_1.ReturnOperation({
            loanId: loan.id,
            date: input.date ?? new Date(),
        });
        OperationService_1.returns.push(returned);
        loan.closed = true;
        return returned;
    }
    async createAssignment(input) {
        const copy = this.getCopyState(input.copyId);
        this.ensureCopyIsActive(copy);
        if (!input.ownerAssignment) {
            throw new common_1.BadRequestException('ownerAssignment is required');
        }
        if (copy.ownerId !== input.owner) {
            throw new common_1.BadRequestException(`The specified owner ${input.owner} is not the current owner of copy ${input.copyId}`);
        }
        const assignment = new assignment_entity_1.Assignment({
            copyId: input.copyId,
            owner: input.owner,
            ownerAssignment: input.ownerAssignment,
            date: input.date ?? new Date(),
        });
        OperationService_1.assignments.push(assignment);
        return assignment;
    }
    async createUnsuscribeB(input) {
        const copy = this.getCopyState(input.copyId);
        if (copy.unsubscribed) {
            const unsubscribe = new unsubscribe_b_entity_1.UnsubscribeB({
                copyId: input.copyId,
                date: input.date ?? new Date(),
            });
            OperationService_1.unsubscribeBs.push(unsubscribe);
            return unsubscribe;
        }
        copy.unsubscribed = true;
        const unsubscribe = new unsubscribe_b_entity_1.UnsubscribeB({
            copyId: input.copyId,
            date: input.date ?? new Date(),
        });
        OperationService_1.unsubscribeBs.push(unsubscribe);
        return unsubscribe;
    }
    hasOpenOperations(personId) {
        return this.getPersonOperations(personId).some((operation) => !operation.closed);
    }
    areAllOperationsClosed(personId) {
        return !this.hasOpenOperations(personId);
    }
    getPersonOperations(personId) {
        return OperationService_1.loans
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
    ensureCopyIsActive(copy) {
        if (copy.unsubscribed) {
            throw new common_1.ConflictException(`Copy ${copy.id} is unsubscribed and cannot accept further operations`);
        }
    }
    findOpenLoanForCopy(copyId) {
        return OperationService_1.loans.find((loan) => loan.copyId === copyId && !loan.closed);
    }
};
exports.OperationService = OperationService;
exports.OperationService = OperationService = OperationService_1 = __decorate([
    (0, common_1.Injectable)()
], OperationService);
//# sourceMappingURL=operation.service.js.map