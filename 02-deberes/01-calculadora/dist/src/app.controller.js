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
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    sumar(headers, response) {
        const numeroUno = Number(headers.numero1);
        const numeroDos = Number(headers.numero2);
        if (numeroUno != null && numeroDos != null) {
            const resultado = numeroUno + numeroDos;
            response.status(200).send({ suma: `${resultado}` });
        }
        else {
            response.status(400).send({ error: 'Parámetros a sumar incorrectos' });
        }
    }
    restar(body, response) {
        const numeroUno = Number(body.numero1);
        const numeroDos = Number(body.numero2);
        if (!isNaN(numeroUno) && !isNaN(numeroDos)) {
            const resultado = numeroUno - numeroDos;
            response.set('resta', `${resultado}`);
            response.status(201).send({ resta: `${resultado}` });
        }
        else {
            response.status(401).send({ error: 'Parámetros a restar incorrectos' });
        }
    }
    multiplicar(query, response) {
        const numeroUno = Number(query.numero1);
        const numeroDos = Number(query.numero2);
        console.log(`${numeroUno} ${numeroDos}`);
        if (!isNaN(numeroUno) && !isNaN(numeroDos)) {
            const resultado = numeroUno * numeroDos;
            response.status(202).send({ multiplicacion: `${resultado}` });
        }
        else {
            response.status(402).send({ error: 'Parámetros a multiplicar incorrectos' });
        }
    }
    dividir(query, body, response) {
        const numeroUno = Number(body.numero1);
        const numeroDos = Number(query.numero2);
        console.log(`${numeroUno} ${numeroDos}`);
        if (!isNaN(numeroUno) && !isNaN(numeroDos) && numeroDos != 0) {
            const resultado = numeroUno / numeroDos;
            response.status(203).send({ division: `${resultado}` });
        }
        else {
            response.status(403).send({ error: 'Parámetros a dividir incorrectos' });
        }
    }
};
__decorate([
    common_1.Get('suma'),
    __param(0, common_1.Headers()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sumar", null);
__decorate([
    common_1.Post('resta'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "restar", null);
__decorate([
    common_1.Put('multiplicacion'),
    __param(0, common_1.Query()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicar", null);
__decorate([
    common_1.Delete('division'),
    __param(0, common_1.Query()), __param(1, common_1.Body()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "dividir", null);
AppController = __decorate([
    common_1.Controller('calculadora'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map