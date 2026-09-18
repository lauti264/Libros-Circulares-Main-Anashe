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
exports.CommunityService = void 0;
const common_1 = require("@nestjs/common");
const communication_service_1 = require("../communication/communication.service");
const community_1 = require("./community");
let CommunityService = class CommunityService {
    communicationService;
    constructor(communicationService) {
        this.communicationService = communicationService;
    }
    findAll() {
        return community_1.Community.findAll();
    }
    findOne(id) {
        return community_1.Community.findByIdOrFail(id);
    }
    create(dto) {
        return community_1.Community.fromDto(dto);
    }
    async update(id, dto) {
        const community = community_1.Community.updateFromDto(id, { name: dto.name });
        if (dto.persons) {
            await this.communicationService.syncCommunityPersons(id, dto.persons);
        }
        return community;
    }
    async remove(id) {
        await this.communicationService.removeCommunity(id);
    }
};
exports.CommunityService = CommunityService;
exports.CommunityService = CommunityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [communication_service_1.CommunicationService])
], CommunityService);
//# sourceMappingURL=community.service.js.map