"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const common_1 = require("@nestjs/common");
const contact_method_1 = require("../contact-method/contact-method");
class Person {
    static persons = [];
    id;
    name;
    surname;
    dni;
    contactPerson;
    fdn;
    communities;
    contactMethods;
    static fromDto(dto) {
        if (Person.findById(dto.id)) {
            throw new common_1.ConflictException(`Person ${dto.id} already exists`);
        }
        if (Person.findByDni(dto.dni)) {
            throw new common_1.ConflictException(`DNI ${dto.dni} already exists`);
        }
        const person = new Person();
        person.id = dto.id;
        person.name = dto.name;
        person.surname = dto.surname;
        person.dni = dto.dni;
        person.fdn = dto.fdn;
        person.contactPerson = dto.contactPerson ?? null;
        person.communities = [];
        person.contactMethods = [];
        Person.persons.push(person);
        if (dto.contactMethods?.length) {
            for (const methodDto of dto.contactMethods) {
                person.addContactMethod(methodDto);
            }
        }
        return person;
    }
    static updateFromDto(id, dto) {
        const person = Person.findByIdOrFail(id);
        if (dto.contactPerson !== undefined) {
            person.contactPerson = dto.contactPerson;
        }
        if (dto.contactMethods) {
            person.contactMethods = [];
            for (const methodDto of dto.contactMethods) {
                person.addContactMethod(methodDto);
            }
        }
        return person;
    }
    addContactMethod(dto) {
        const contactMethod = contact_method_1.ContactMethod.fromDto(dto, this.id);
        if (this.contactMethods.some((item) => item.id === contactMethod.id)) {
            throw new common_1.ConflictException(`ContactMethod ${contactMethod.id} already exists`);
        }
        if (contactMethod.favourite) {
            for (const item of this.contactMethods) {
                item.favourite = false;
            }
        }
        this.contactMethods.push(contactMethod);
        return contactMethod;
    }
    static findAll() {
        return Person.persons;
    }
    static findById(id) {
        return Person.persons.find((person) => person.id === id);
    }
    static findByIdOrFail(id) {
        const person = Person.findById(id);
        if (!person) {
            throw new common_1.NotFoundException(`Person ${id} not found`);
        }
        return person;
    }
    static findByDni(dni) {
        return Person.persons.find((person) => person.dni === dni);
    }
    static deleteById(id) {
        const index = Person.persons.findIndex((person) => person.id === id);
        if (index < 0) {
            throw new common_1.NotFoundException(`Person ${id} not found`);
        }
        Person.persons.splice(index, 1);
    }
    static reset() {
        Person.persons = [];
    }
    isAdult() {
        return Person.isAdult(this.fdn);
    }
    static isAdult(fdn) {
        const birth = new Date(fdn);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        if (monthDiff < 0 ||
            (monthDiff === 0 && now.getDate() < birth.getDate())) {
            age -= 1;
        }
        return age >= 18;
    }
    activeCommunityCount() {
        return this.communities.filter((membership) => membership.active).length;
    }
}
exports.Person = Person;
//# sourceMappingURL=person.js.map