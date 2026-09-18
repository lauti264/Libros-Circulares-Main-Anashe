"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Community = void 0;
const common_1 = require("@nestjs/common");
class Community {
    static communities = [];
    id;
    name;
    persons;
    static fromDto(dto) {
        if (Community.findById(dto.id)) {
            throw new common_1.ConflictException(`Community ${dto.id} already exists`);
        }
        if (Community.communities.some((item) => item.name === dto.name)) {
            throw new common_1.ConflictException(`Community name ${dto.name} already exists`);
        }
        const community = new Community();
        community.id = dto.id;
        community.name = dto.name;
        community.persons = [];
        Community.communities.push(community);
        return community;
    }
    static updateFromDto(id, dto) {
        const community = Community.findByIdOrFail(id);
        if (dto.name !== undefined && dto.name !== community.name) {
            if (Community.communities.some((item) => item.name === dto.name)) {
                throw new common_1.ConflictException(`Community name ${dto.name} already exists`);
            }
            community.name = dto.name;
        }
        return community;
    }
    static findAll() {
        return Community.communities;
    }
    static findById(id) {
        return Community.communities.find((community) => community.id === id);
    }
    static findByIdOrFail(id) {
        const community = Community.findById(id);
        if (!community) {
            throw new common_1.NotFoundException(`Community ${id} not found`);
        }
        return community;
    }
    static deleteById(id) {
        const index = Community.communities.findIndex((community) => community.id === id);
        if (index < 0) {
            throw new common_1.NotFoundException(`Community ${id} not found`);
        }
        Community.communities.splice(index, 1);
    }
    static reset() {
        Community.communities = [];
    }
}
exports.Community = Community;
//# sourceMappingURL=community.js.map