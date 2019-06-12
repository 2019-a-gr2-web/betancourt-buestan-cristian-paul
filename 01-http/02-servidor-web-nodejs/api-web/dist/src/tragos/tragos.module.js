"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tragos_services_1 = require("./tragos.services");
const tragos_controller_1 = require("./tragos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tragos_entity_1 = require("./tragos.entity");
let TragosModule = class TragosModule {
};
TragosModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tragos_entity_1.TragosEntity
            ], 'default')
        ],
        controllers: [tragos_controller_1.TragosController],
        providers: [tragos_services_1.TragosService],
        exports: [tragos_services_1.TragosService]
    })
], TragosModule);
exports.TragosModule = TragosModule;
//# sourceMappingURL=tragos.module.js.map