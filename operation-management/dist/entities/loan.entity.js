"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
class Loan {
    static nextId = 0;
    id;
    copyId;
    owner;
    ownerLoan;
    dateBegin;
    dateEnd;
    closed;
    constructor(data = {}) {
        Loan.nextId += 1;
        this.id = data.id ?? `loan-${Loan.nextId}`;
        this.copyId = data.copyId ?? '';
        this.owner = data.owner ?? '';
        this.ownerLoan = data.ownerLoan ?? '';
        this.dateBegin = data.dateBegin ?? new Date();
        this.dateEnd = data.dateEnd ?? new Date();
        this.closed = data.closed ?? false;
    }
}
exports.Loan = Loan;
//# sourceMappingURL=loan.entity.js.map