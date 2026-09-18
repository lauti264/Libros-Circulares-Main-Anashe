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
exports.CreatePersonDto = exports.CreatePersonCommunityDto = exports.CreatePersonContactMethodDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePersonContactMethodDto {
    id;
    tipe;
    value;
    favourite;
}
exports.CreatePersonContactMethodDto = CreatePersonContactMethodDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonContactMethodDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['email', 'phone', 'address']),
    __metadata("design:type", String)
], CreatePersonContactMethodDto.prototype, "tipe", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonContactMethodDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePersonContactMethodDto.prototype, "favourite", void 0);
class CreatePersonCommunityDto {
    communityId;
    active;
}
exports.CreatePersonCommunityDto = CreatePersonCommunityDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonCommunityDto.prototype, "communityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePersonCommunityDto.prototype, "active", void 0);
class CreatePersonDto {
    id;
    name;
    surname;
    dni;
    fdn;
    contactPerson;
    communities;
    contactMethods;
}
exports.CreatePersonDto = CreatePersonDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "fdn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "contactPerson", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePersonCommunityDto),
    __metadata("design:type", Array)
], CreatePersonDto.prototype, "communities", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePersonContactMethodDto),
    __metadata("design:type", Array)
], CreatePersonDto.prototype, "contactMethods", void 0);
//# sourceMappingURL=create-person.dto.js.map