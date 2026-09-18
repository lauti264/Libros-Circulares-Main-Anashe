"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMethodService = void 0;
const common_1 = require("@nestjs/common");
const person_1 = require("../person/person");
let ContactMethodService = class ContactMethodService {
    findAll(personId) {
        return person_1.Person.findByIdOrFail(personId).contactMethods;
    }
    create(personId, dto) {
        const person = person_1.Person.findByIdOrFail(personId);
        return person.addContactMethod(dto);
    }
    update(personId, contactMethodId, dto) {
        const person = person_1.Person.findByIdOrFail(personId);
        const contactMethod = person.contactMethods.find((item) => item.id === contactMethodId);
        if (!contactMethod) {
            throw new common_1.NotFoundException(`ContactMethod ${contactMethodId} not found`);
        }
        contactMethod.updateFromDto(dto);
        if (dto.favourite) {
            for (const item of person.contactMethods) {
                if (item.id !== contactMethodId) {
                    item.favourite = false;
                }
            }
        }
        return contactMethod;
    }
    remove(personId, contactMethodId) {
        const person = person_1.Person.findByIdOrFail(personId);
        const index = person.contactMethods.findIndex((item) => item.id === contactMethodId);
        if (index < 0) {
            throw new common_1.NotFoundException(`ContactMethod ${contactMethodId} not found`);
        }
        const [removed] = person.contactMethods.splice(index, 1);
        if (removed.favourite && person.contactMethods.length > 0) {
            person.contactMethods[0].favourite = true;
        }
    }
};
exports.ContactMethodService = ContactMethodService;
exports.ContactMethodService = ContactMethodService = __decorate([
    (0, common_1.Injectable)()
], ContactMethodService);
//# sourceMappingURL=contact-method.service.js.map