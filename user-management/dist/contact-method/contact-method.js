"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMethod = void 0;
class ContactMethod {
    id;
    tipe;
    value;
    favourite;
    static fromDto(dto, personId) {
        const contactMethod = new ContactMethod();
        contactMethod.id =
            dto.id ?? `${personId}-cm-${Date.now()}-${Math.random()}`;
        contactMethod.tipe = dto.tipe;
        contactMethod.value = dto.value;
        contactMethod.favourite = dto.favourite;
        return contactMethod;
    }
    updateFromDto(dto) {
        if (dto.tipe !== undefined) {
            this.tipe = dto.tipe;
        }
        if (dto.value !== undefined) {
            this.value = dto.value;
        }
        if (dto.favourite !== undefined) {
            this.favourite = dto.favourite;
        }
        return this;
    }
}
exports.ContactMethod = ContactMethod;
//# sourceMappingURL=contact-method.js.map