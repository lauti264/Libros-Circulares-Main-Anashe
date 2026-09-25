"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsubscribeB = void 0;
class UnsubscribeB {
    static nextId = 0;
    id;
    copyId;
    date;
    constructor(data = {}) {
        UnsubscribeB.nextId += 1;
        this.id = data.id ?? `unsuscribe-b-${UnsubscribeB.nextId}`;
        this.copyId = data.copyId ?? '';
        this.date = data.date ?? new Date();
    }
}
exports.UnsubscribeB = UnsubscribeB;
//# sourceMappingURL=unsubscribe-b.entity.js.map