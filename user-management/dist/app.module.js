"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.ObserveInstrument = exports.ObserveModule = void 0;
const common_1 = require("@nestjs/common");
const observe_1 = require("@nestjs/observe");
const communication_module_1 = require("./communication/communication.module");
const community_module_1 = require("./community/community.module");
const contact_method_module_1 = require("./contact-method/contact-method.module");
const person_module_1 = require("./person/person.module");
_a = (0, observe_1.createObserveModule)(), exports.ObserveModule = _a.ObserveModule, exports.ObserveInstrument = _a.ObserveInstrument;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            exports.ObserveModule.forRoot({
                appKey: 'YOUR_APP_KEY',
                appSecret: 'YOUR_APP_SECRET',
                serviceId: 'user-management',
            }),
            communication_module_1.CommunicationModule,
            person_module_1.PersonModule,
            community_module_1.CommunityModule,
            contact_method_module_1.ContactMethodModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map