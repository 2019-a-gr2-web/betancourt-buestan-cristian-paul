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
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const Joi = require("@hapi/joi");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    iniciarSesion(request, response, query) {
        const usuario = query.usuario;
        if (usuario) {
            response.cookie('USER', usuario, {
                signed: true
            }).cookie('POINTS', 100, {
                signed: true
            }).send({
                usuario: usuario,
                puntaje: 100,
                mensaje: 'YA PUEDE COMENZAR EL JUEGO'
            });
        }
        else {
            response.send('INGRESE EL NOMBRE DE USUARIO');
        }
    }
    sumar(headers, request, response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, headers.numero1, headers.numero2)) {
                const numeroUno = Number(headers.numero1);
                const numeroDos = Number(headers.numero2);
                const resultado = numeroUno + numeroDos;
                this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 200);
            }
        }
    }
    restar(request, body, response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, body.numero1, body.numero2)) {
                const numeroUno = Number(body.numero1);
                const numeroDos = Number(body.numero2);
                const resultado = numeroUno - numeroDos;
                this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 300);
            }
        }
    }
    multiplicar(request, query, response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, query.numero1, query.numero2)) {
                const numeroUno = Number(query.numero1);
                const numeroDos = Number(query.numero2);
                const resultado = numeroUno * numeroDos;
                this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 400);
            }
        }
    }
    dividir(request, query, body, response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, body.numero1, query.numero2)) {
                const numeroUno = Number(body.numero1);
                const numeroDos = Number(query.numero2);
                if (numeroDos == 0) {
                    response.send({
                        error: 'DIVISOR(numero2) NO PUEDE SER IGUAL A 0'
                    });
                }
                else {
                    const resultado = numeroUno / numeroDos;
                    this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 500);
                }
            }
        }
    }
    valorPuntaje(response, usuario, puntaje, resultado, status) {
        const resultadoPuntaje = puntaje - resultado;
        if (resultadoPuntaje > 0) {
            this.respuesta(response, usuario, resultadoPuntaje, status, false);
        }
        else {
            this.respuesta(response, usuario, resultadoPuntaje, status + 200, true);
        }
    }
    cookiesValidas(request, response) {
        try {
            const usuario = request.signedCookies.USER;
            const puntaje = request.signedCookies.POINTS;
            if (!(usuario && puntaje)) {
                response.status(401).send({
                    error: 'INICIE SESIÓN'
                });
                return false;
            }
        }
        catch (e) {
            return false;
        }
        return true;
    }
    numerosValidos(response, numeroUno, numeroDos) {
        if (numeroUno && numeroDos) {
            const esquemaValidacionNumero = Joi.object().keys({
                numero: Joi.number().integer().required()
            });
            let objetoValidacion = { numero: numeroUno };
            const resultado1 = Joi.validate(objetoValidacion, esquemaValidacionNumero);
            objetoValidacion = { numero: numeroDos };
            const resultado2 = Joi.validate(objetoValidacion, esquemaValidacionNumero);
            if (resultado1.error || resultado2.error) {
                response.send({ error: 'ERROR AL INGRESAR LOS NÚMEROS' });
                return false;
            }
            return true;
        }
        return false;
    }
    respuesta(response, usuario, puntaje, status, fin) {
        if (!fin) {
            response.status(status)
                .cookie('POINTS', puntaje, { signed: true })
                .send({
                usuario: usuario,
                puntaje: puntaje
            });
        }
        else {
            response.clearCookie('USER').clearCookie('POINTS').send({
                usuario: usuario,
                puntaje: 0,
                mensaje: 'SE LE TERMINARON SUS PUNTOS'
            }).status(status);
        }
    }
};
__decorate([
    common_1.Get('sesion'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "iniciarSesion", null);
__decorate([
    common_1.Get('suma'),
    __param(0, common_1.Headers()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sumar", null);
__decorate([
    common_1.Post('resta'),
    __param(0, common_1.Request()), __param(1, common_1.Body()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "restar", null);
__decorate([
    common_1.Put('multiplicacion'),
    __param(0, common_1.Request()), __param(1, common_1.Query()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicar", null);
__decorate([
    common_1.Delete('division'),
    __param(0, common_1.Request()), __param(1, common_1.Query()), __param(2, common_1.Body()), __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "dividir", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "valorPuntaje", null);
__decorate([
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Boolean)
], AppController.prototype, "cookiesValidas", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Boolean)
], AppController.prototype, "numerosValidos", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "respuesta", null);
AppController = __decorate([
    common_1.Controller('calculadora'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map