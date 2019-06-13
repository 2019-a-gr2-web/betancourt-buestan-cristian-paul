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
const cliente_entity_1 = require("./cliente.entity");
const typeorm_1 = require("@nestjs/typeorm");
const zapato_entity_1 = require("./zapato.entity");
const compras_entity_1 = require("./compras.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                name: 'default',
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'CRISTIAN',
                password: 'password',
                database: 'catalogo_zapatos',
                entities: [cliente_entity_1.ClienteEntity, zapato_entity_1.ZapatoEntity, compras_entity_1.ComprasEntity],
                synchronize: true,
                insecureAuth: true
            }),
            typeorm_1.TypeOrmModule.forFeature([
                cliente_entity_1.ClienteEntity, zapato_entity_1.ZapatoEntity, compras_entity_1.ComprasEntity
            ], 'default')
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map