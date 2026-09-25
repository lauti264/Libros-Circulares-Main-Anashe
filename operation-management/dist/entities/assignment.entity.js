"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
class Assignment {
    static nextId = 0;
    id;
    copyId;
    owner;
    ownerAssignment;
    date;
    constructor(data = {}) {
        Assignment.nextId += 1;
        this.id = data.id ?? `assignment-${Assignment.nextId}`;
        this.copyId = data.copyId ?? '';
        this.owner = data.owner ?? '';
        this.ownerAssignment = data.ownerAssignment ?? '';
        this.date = data.date ?? new Date();
    }
}
exports.Assignment = Assignment;
//# sourceMappingURL=assignment.entity.js.map