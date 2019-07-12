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
const websockets_1 = require("@nestjs/websockets");
let JuegoGateway = class JuegoGateway {
    constructor() {
        console.log(this.server);
    }
    holaMundo(client, data) {
        console.log(data);
        console.log('Nos hacen la peticion');
        client.broadcast.emit('saludaron', data);
        return 'Hola ' + data.nombre;
    }
    mensaje(client, data) {
        console.log(data);
        client.broadcast.emit('recepcion', data);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], JuegoGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('holaMundo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JuegoGateway.prototype, "holaMundo", null);
__decorate([
    websockets_1.SubscribeMessage('chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JuegoGateway.prototype, "mensaje", null);
JuegoGateway = __decorate([
    websockets_1.WebSocketGateway(3001, {
        namespace: '/websockets'
    }),
    __metadata("design:paramtypes", [])
], JuegoGateway);
exports.JuegoGateway = JuegoGateway;
//# sourceMappingURL=juego.gateway.js.map