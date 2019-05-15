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
        this.arregloUsuarios = [];
    }
    helloWorld() {
        return 'Hello world';
    }
    holaMundo() {
        return 'Hola mundo';
    }
    salutMonde() {
        return 'Salut monde';
    }
    ciaoMondo() {
        return 'Ciao mondo';
    }
    adivina(headers) {
        console.log('Headers: ', headers);
        const numeroRandomico = Math.round(Math.random() * 10);
        const numeroCabecera = Number(headers.numero);
        if (numeroCabecera == numeroRandomico) {
            return 'ok';
        }
        else {
            return ':(';
        }
    }
    consultar(queryParams) {
        console.log(queryParams);
        if (queryParams.nombre) {
            return `Hola ${queryParams.nombre}`;
        }
        else {
            return 'Hola extraño';
        }
    }
    ciudad(parametrosRuta) {
        switch (parametrosRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que mashhh ñañoshh';
            default:
                return 'Buenas tardes';
        }
    }
    registroComida(parametrosCuerpo, respuesta) {
        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                respuesta.set('premio', 'Guatita');
            }
            return respuesta.send({ mensaje: 'Registro creado' });
        }
        else {
            return respuesta.status(400).send({ mensaje: 'ERROR. no envía nombre y cantidad', error: 400 });
        }
    }
    semilla(peticion, respuesta) {
        console.log(peticion.cookies);
        const cookies = peticion.cookies;
        const esquemaValidacionNumero = Joi.object().keys({
            numero: Joi.number().integer().required()
        });
        const objetoValidacion = { numero: cookies.numero };
        const resultado = Joi.validate(objetoValidacion, esquemaValidacionNumero);
        if (resultado.error) {
            console.log('Resultado: ', resultado);
        }
        else {
            console.log('Numero valido');
        }
        const cookieSegura = peticion.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura');
        }
        else {
            console.log('Cookie insegura, no es valida');
        }
        if (cookies.micookie) {
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            respuesta.cookie('fechaServidor', new Date().getTime(), {
                signed: true
            });
            respuesta.send('ok');
        }
        else {
            respuesta.send(':(');
        }
    }
    obtenerUsuario(peticion, respuesta) {
        const nombreUsuario = peticion.cookies.usuario;
        const resultado = Math.round(Math.random() % 100);
        console.log(nombreUsuario);
        if (nombreUsuario) {
            respuesta.send({
                nombreUsuario: `${nombreUsuario}`,
                resultado: `${resultado}`
            });
        }
        else {
            respuesta.send({
                error: 'Usuario no definido'
            });
        }
    }
    inicio(respuesta) {
        return respuesta.render('inicio', {
            estaVivo: true
        });
    }
    peliculas(respuesta) {
        return respuesta.render('peliculas/inicio', {});
    }
    prueba(respuesta) {
        return respuesta.render('peliculas/estilos', {});
    }
    cinecalidad(respuesta) {
        return respuesta.render('copia/cinecalidad', {});
    }
};
__decorate([
    common_1.Get('/hello-world'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "helloWorld", null);
__decorate([
    common_1.Post('/hola-mundo'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "holaMundo", null);
__decorate([
    common_1.Put('/salut-monde'),
    common_1.HttpCode(202),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "salutMonde", null);
__decorate([
    common_1.Delete('/ciao-mondo'),
    common_1.HttpCode(203),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ciaoMondo", null);
__decorate([
    common_1.Get('/adivina'),
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "adivina", null);
__decorate([
    common_1.Get('/consultar'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "consultar", null);
__decorate([
    common_1.Get('/ciudad/:idCiudad'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ciudad", null);
__decorate([
    common_1.Post('registroComida'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registroComida", null);
__decorate([
    common_1.Get('semilla'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "semilla", null);
__decorate([
    common_1.Get('usuario'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "obtenerUsuario", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
__decorate([
    common_1.Get('peliculas'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "peliculas", null);
__decorate([
    common_1.Get('estilos'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "prueba", null);
__decorate([
    common_1.Get('cinecalidad'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cinecalidad", null);
AppController = __decorate([
    common_1.Controller('/api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
function holaMundo() {
    console.log('Hola mundo');
}
const respuestaHolaMundo = holaMundo();
function suma(a, b) {
    return a + b;
}
const respuestaSuma = suma(1, 2);
console.log('Respuesta suma:', respuestaSuma);
if ({}) {
    console.log('Verdadero');
}
else {
    console.log('Falso');
}
const arregloNumeros = [1, 2, 3, 4, 5, 6];
const rForEach = arregloNumeros.forEach(valorActual => console.log(`Valor: ${valorActual}`));
console.log("Respuesta forEach: ", rForEach);
const arregloNumerosMap = [1, 2, 3, 4, 5, 6];
const rMap = arregloNumerosMap.map(valorActual => {
    const esPar = valorActual % 2;
    if (esPar) {
        return valorActual + 2;
    }
    else {
        return valorActual + 1;
    }
});
console.log("Respuesta map: ", rMap);
const rFind = arregloNumeros.find(valorActual => valorActual == 10);
console.log("Respuesta find: ", rFind);
const arregloNumerosFilter = [1, 2, 3, 4, 5, 6];
const rFilter = arregloNumerosFilter.filter(valorActual => valorActual < 5);
console.log("Respuesta filter: ", rFilter);
const arregloNumerosEvery = [1, 2, 3, 4, 5, 6];
const respuestaEvery = arregloNumerosEvery.every(valorActual => valorActual > 0);
console.log("Respuesta every: ", respuestaEvery);
const arregloNumerosSome = [1, 2, 3, 4, 5, 6];
const respuestaSome = arregloNumerosSome.some(valorActual => valorActual > 6);
console.log("Respuesta some: ", respuestaSome);
const arregloNumerosReduce = [1, 2, 3, 4, 5, 6];
const valorInicioCalculo = 0;
const respuestaReduce = arregloNumerosReduce.reduce((valorAcumulado, valorActual) => {
    return valorAcumulado + valorActual;
}, valorInicioCalculo);
console.log("Respuesta reduce: ", respuestaReduce);
const valorInicioCalculo2 = 0;
const respuestaReduce2 = arregloNumerosReduce
    .map(valorActual => {
    if (valorActual < 4) {
        return (valorActual * 1.1) + 5;
    }
    else {
        return (valorActual * 1.15) + 3;
    }
})
    .reduce((valorAcumulado, valorActual) => {
    return valorAcumulado + valorActual;
}, valorInicioCalculo2);
console.log("Respuesta reduce2: ", respuestaReduce2);
const arregloNumerosReduce3 = [1, 2, 3, 4, 5, 6];
const valorInicioCalculo3 = 100;
const respuestaReduce3 = arregloNumerosReduce3.reduce((valorAcumulado, valorActual) => {
    return valorAcumulado - valorActual;
}, valorInicioCalculo3);
console.log("Respuesta reduce3: ", respuestaReduce3);
const arregloEjercicio = [1, 2, 3, 4, 5, 6];
const respuestaEjercicio = arregloEjercicio
    .map(valorActual => valorActual + 10)
    .filter(valorActual => valorActual > 15)
    .some(valorActual => valorActual > 30);
console.log("Respuesta ejercicio: ", respuestaEjercicio);
//# sourceMappingURL=app.controller.js.map