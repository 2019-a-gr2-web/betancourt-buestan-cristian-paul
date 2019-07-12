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
        this.elementos = ["piedra", "papel", "tijera"];
        this.secuencia = [0, 2, 1, 1, 2, 1, 1, 0, 0, 1, 2, 1, 0, 2, 0, 1, 2];
        this.seleccionado = 0;
        this.primeraRespuesta = true;
        console.log(this.server);
    }
    preparacion(client, data) {
        client.emit('preparacion', {});
        console.log(client.id);
        client.broadcast.emit('preparacion', {});
    }
    comenzar(client, data) {
        const elemento = this.elementos[this.secuencia[this.seleccionado]];
        console.log(elemento);
        client.emit('elemento', {
            url: "http://192.168.0.102:3000/websockets/images/" + elemento + ".png",
            elemento: elemento
        });
    }
    validarRespuesta(client, data) {
        var respuesta = "Perdiste";
        switch (this.secuencia[this.seleccionado]) {
            case 0:
                if (data.respuesta == 1) {
                    respuesta = "Ganaste";
                }
                break;
            case 1:
                if (data.respuesta == 2) {
                    respuesta = "Ganaste";
                }
                break;
            case 2:
                if (data.respuesta == 0) {
                    respuesta = "Ganaste";
                }
                break;
        }
        if (this.primeraRespuesta) {
            this.primeraRespuesta = false;
            this.enviarResultado(client, respuesta);
        }
        else {
            this.primeraRespuesta = true;
            this.seleccionado++;
        }
    }
    enviarResultado(client, resultado) {
        client.emit('resultado', {
            resultado: resultado
        });
        client.broadcast.emit('resultado', {
            resultado: "Perdiste"
        });
        this.seleccionado++;
    }
    prueba(client, data) {
        client.emit('prueba', { hola: 'hola' });
        client.broadcast.emit('prueba', { hola: 'hola todos' });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], JuegoGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('preparado'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JuegoGateway.prototype, "preparacion", null);
__decorate([
    websockets_1.SubscribeMessage('comenzar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JuegoGateway.prototype, "comenzar", null);
__decorate([
    websockets_1.SubscribeMessage('respuesta'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JuegoGateway.prototype, "validarRespuesta", null);
__decorate([
    websockets_1.SubscribeMessage('prueba'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JuegoGateway.prototype, "prueba", null);
JuegoGateway = __decorate([
    websockets_1.WebSocketGateway(3001, {
        namespace: '/websockets'
    }),
    __metadata("design:paramtypes", [])
], JuegoGateway);
exports.JuegoGateway = JuegoGateway;
//# sourceMappingURL=juego.gateway.js.map