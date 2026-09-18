"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMethodModule = void 0;
const common_1 = require("@nestjs/common");
const contact_method_controller_1 = require("./contact-method.controller");
const contact_method_service_1 = require("./contact-method.service");
let ContactMethodModule = class ContactMethodModule {
};
exports.ContactMethodModule = ContactMethodModule;
exports.ContactMethodModule = ContactMethodModule = __decorate([
    (0, common_1.Module)({
        controllers: [contact_method_controller_1.ContactMethodController],
        providers: [contact_method_service_1.ContactMethodService],
    })
], ContactMethodModule);
//# sourceMappingURL=contact-method.module.js.map