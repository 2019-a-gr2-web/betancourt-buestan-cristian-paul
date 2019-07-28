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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const pedido_service_1 = require("../cabecera/pedido.service");
const typeorm_1 = require("typeorm");
let DespachoGateway = class DespachoGateway {
    constructor(pedido) {
        this.pedido = pedido;
    }
    preparacion(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = {
                where: [
                    {
                        estado: typeorm_1.Like(`POR DESPACHAR`),
                    }
                ]
            };
            const pedidos = yield this.pedido.obtenerPedidos(consulta);
            client.broadcast.emit('pedido', { pedidos: pedidos });
            return pedidos;
        });
    }
    despachar(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let pedido;
            pedido = {
                id: Number(data.id),
                nombre: '',
                direccion: '',
                telefono: '',
                cedula: '',
                estado: 'DESPACHADO',
                subtotal: 0,
                total: 0
            };
            this.pedido.despacharPedido(pedido);
            const consulta = {
                where: [
                    {
                        estado: typeorm_1.Like(`POR DESPACHAR`),
                    }
                ]
            };
            const pedidos = yield this.pedido.obtenerPedidos(consulta);
            client.broadcast.emit('pedido', { pedidos: pedidos });
            return pedidos;
        });
    }
    validarRespuesta(client, data) {
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], DespachoGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('peticion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DespachoGateway.prototype, "preparacion", null);
__decorate([
    websockets_1.SubscribeMessage('despachar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DespachoGateway.prototype, "despachar", null);
__decorate([
    websockets_1.SubscribeMessage('respuesta'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DespachoGateway.prototype, "validarRespuesta", null);
DespachoGateway = __decorate([
    websockets_1.WebSocketGateway(3001, {
        namespace: '/websockets'
    }),
    __metadata("design:paramtypes", [pedido_service_1.PedidoService])
], DespachoGateway);
exports.DespachoGateway = DespachoGateway;
//# sourceMappingURL=despacho.gateway.js.map