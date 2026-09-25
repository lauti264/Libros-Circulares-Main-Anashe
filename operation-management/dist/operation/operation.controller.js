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
exports.OperationController = void 0;
const common_1 = require("@nestjs/common");
const create_assignment_dto_1 = require("./dto/create-assignment.dto");
const create_loan_dto_1 = require("./dto/create-loan.dto");
const create_return_dto_1 = require("./dto/create-return.dto");
const create_unsubscribe_dto_1 = require("./dto/create-unsubscribe.dto");
const operation_service_1 = require("./operation.service");
let OperationController = class OperationController {
    operationService;
    constructor(operationService) {
        this.operationService = operationService;
    }
    getOperationsByPerson(personId) {
        return this.operationService.getPersonOperations(personId);
    }
    isPersonOperationsClosed(personId) {
        return this.operationService.areAllOperationsClosed(personId);
    }
    createLoan(dto) {
        return this.operationService.createLoan(dto);
    }
    createReturn(dto) {
        return this.operationService.createReturn(dto);
    }
    createAssignment(dto) {
        return this.operationService.createAssignment(dto);
    }
    createUnsuscribe(dto) {
        return this.operationService.createUnsuscribeB(dto);
    }
};
exports.OperationController = OperationController;
__decorate([
    (0, common_1.Get)('persons/:personId/operations'),
    __param(0, (0, common_1.Param)('personId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperationController.prototype, "getOperationsByPerson", null);
__decorate([
    (0, common_1.Get)(['operations/user/:personId', 'users/:personId/operations/closed']),
    __param(0, (0, common_1.Param)('personId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperationController.prototype, "isPersonOperationsClosed", null);
__decorate([
    (0, common_1.Post)('loans'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loan_dto_1.CreateLoanDto]),
    __metadata("design:returntype", void 0)
], OperationController.prototype, "createLoan", null);
__decorate([
    (0, common_1.Post)('returns'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_return_dto_1.CreateReturnDto]),
    __metadata("design:returntype", void 0)
], OperationController.prototype, "createReturn", null);
__decorate([
    (0, common_1.Post)('assignments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], OperationController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Post)('unsuscribe-bs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unsubscribe_dto_1.CreateUnsuscribeDto]),
    __metadata("design:returntype", void 0)
], OperationController.prototype, "createUnsuscribe", null);
exports.OperationController = OperationController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [operation_service_1.OperationService])
], OperationController);
//# sourceMappingURL=operation.controller.js.map