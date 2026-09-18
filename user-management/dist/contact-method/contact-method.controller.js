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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMethodController = void 0;
const common_1 = require("@nestjs/common");
const contact_method_service_1 = require("./contact-method.service");
const create_contact_method_dto_1 = require("./dto/create-contact-method.dto");
const update_contact_method_dto_1 = require("./dto/update-contact-method.dto");
let ContactMethodController = class ContactMethodController {
    contactMethodService;
    constructor(contactMethodService) {
        this.contactMethodService = contactMethodService;
    }
    findAll(personId) {
        return this.contactMethodService.findAll(personId);
    }
    create(personId, dto) {
        return this.contactMethodService.create(personId, dto);
    }
    update(personId, contactMethodId, dto) {
        return this.contactMethodService.update(personId, contactMethodId, dto);
    }
    remove(personId, contactMethodId) {
        this.contactMethodService.remove(personId, contactMethodId);
    }
};
exports.ContactMethodController = ContactMethodController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactMethodController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_contact_method_dto_1.CreateContactMethodDto]),
    __metadata("design:returntype", void 0)
], ContactMethodController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':contactMethodId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('contactMethodId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_contact_method_dto_1.UpdateContactMethodDto]),
    __metadata("design:returntype", void 0)
], ContactMethodController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':contactMethodId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('contactMethodId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ContactMethodController.prototype, "remove", null);
exports.ContactMethodController = ContactMethodController = __decorate([
    (0, common_1.Controller)('persons/:id/contact-methods'),
    __metadata("design:paramtypes", [contact_method_service_1.ContactMethodService])
], ContactMethodController);
//# sourceMappingURL=contact-method.controller.js.map