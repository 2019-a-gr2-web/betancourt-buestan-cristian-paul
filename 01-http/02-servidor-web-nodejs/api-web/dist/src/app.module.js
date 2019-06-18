"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const tragos_module_1 = require("./tragos/tragos.module");
const typeorm_1 = require("@nestjs/typeorm");
const tragos_entity_1 = require("./tragos/tragos.entity");
const distribuidor_entity_1 = require("./distribuidor/distribuidor.entity");
const fiesta_entity_1 = require("./fiesta/fiesta.entity");
const fiesta_module_1 = require("./fiesta/fiesta.module");
const distribuidor_module_1 = require("./distribuidor/distribuidor.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [fiesta_module_1.FiestaModule, distribuidor_module_1.DistribuidorModule, tragos_module_1.TragosModule,
            typeorm_1.TypeOrmModule.forRoot({
                name: 'default',
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'test',
                entities: [tragos_entity_1.TragosEntity, distribuidor_entity_1.DistribuidorEntity, fiesta_entity_1.FiestaEntity],
                synchronize: true,
                insecureAuth: true
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map