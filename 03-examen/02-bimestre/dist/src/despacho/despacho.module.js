"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const despacho_gateway_1 = require("./despacho.gateway");
const pedido_service_1 = require("../cabecera/pedido.service");
const pedido_entity_1 = require("../cabecera/pedido.entity");
const typeorm_1 = require("@nestjs/typeorm");
let DespachoModule = class DespachoModule {
};
DespachoModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                pedido_entity_1.PedidoEntity
            ], 'default')
        ],
        providers: [despacho_gateway_1.DespachoGateway, pedido_service_1.PedidoService]
    })
], DespachoModule);
exports.DespachoModule = DespachoModule;
//# sourceMappingURL=despacho.module.js.map