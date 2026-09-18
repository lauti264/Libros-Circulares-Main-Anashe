"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const common_1 = require("@nestjs/common");
const communication_service_1 = require("../communication/communication.service");
const person_1 = require("./person");
let PersonService = class PersonService {
    communicationService;
    constructor(communicationService) {
        this.communicationService = communicationService;
    }
    findAll() {
        return person_1.Person.findAll();
    }
    findOne(id) {
        return person_1.Person.findByIdOrFail(id);
    }
    async create(dto) {
        this.assertContactPerson(dto.fdn, dto.contactPerson);
        const communities = dto.communities;
        const person = person_1.Person.fromDto({ ...dto, communities: undefined });
        if (communities?.length) {
            await this.communicationService.syncPersonCommunities(person.id, communities);
        }
        return person;
    }
    async update(id, dto) {
        person_1.Person.findByIdOrFail(id);
        if (dto.contactPerson !== undefined) {
            const person = person_1.Person.findByIdOrFail(id);
            this.assertContactPerson(person.fdn, dto.contactPerson ?? undefined);
        }
        const person = person_1.Person.updateFromDto(id, {
            contactPerson: dto.contactPerson,
            contactMethods: dto.contactMethods,
        });
        if (dto.communities) {
            await this.communicationService.syncPersonCommunities(id, dto.communities);
        }
        return person;
    }
    async remove(id) {
        await this.communicationService.removePerson(id);
    }
    assertContactPerson(fdn, contactPersonId) {
        const isAdult = person_1.Person.isAdult(fdn);
        if (!isAdult) {
            if (!contactPersonId) {
                throw new common_1.BadRequestException('A minor must have a registered adult contactPerson');
            }
        }
        if (!contactPersonId) {
            return;
        }
        const contactPerson = person_1.Person.findById(contactPersonId);
        if (!contactPerson) {
            throw new common_1.BadRequestException('contactPerson must already exist in the system');
        }
        if (!contactPerson.isAdult()) {
            throw new common_1.BadRequestException('contactPerson must be an adult');
        }
    }
};
exports.PersonService = PersonService;
exports.PersonService = PersonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [communication_service_1.CommunicationService])
], PersonService);
//# sourceMappingURL=person.service.js.map