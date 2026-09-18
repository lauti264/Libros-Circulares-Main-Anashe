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
exports.OperationManagementClient = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let OperationManagementClient = class OperationManagementClient {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async hasOpenOperations(personId) {
        const baseUrl = process.env.OPERATION_MANAGEMENT_URL ?? 'http://localhost:3001';
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${baseUrl}/persons/${personId}/operations`));
            const data = response.data;
            const operations = Array.isArray(data)
                ? data
                : (data.operations ?? []);
            return operations.some((operation) => !this.isClosed(operation));
        }
        catch (error) {
            const axiosError = error;
            if (axiosError.response?.status === 404) {
                return false;
            }
            throw new common_1.ConflictException(`Cannot leave community: operations for person ${personId} could not be verified`);
        }
    }
    isClosed(operation) {
        if (operation.closed === true) {
            return true;
        }
        const status = (operation.status ?? '').toLowerCase();
        return ['closed', 'returned', 'completed', 'done'].includes(status);
    }
};
exports.OperationManagementClient = OperationManagementClient;
exports.OperationManagementClient = OperationManagementClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], OperationManagementClient);
//# sourceMappingURL=operation-management.client.js.map