"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnOperation = void 0;
class ReturnOperation {
    static nextId = 0;
    id;
    loanId;
    date;
    constructor(data = {}) {
        ReturnOperation.nextId += 1;
        this.id = data.id ?? `return-${ReturnOperation.nextId}`;
        this.loanId = data.loanId ?? '';
        this.date = data.date ?? new Date();
    }
}
exports.ReturnOperation = ReturnOperation;
//# sourceMappingURL=return.entity.js.map