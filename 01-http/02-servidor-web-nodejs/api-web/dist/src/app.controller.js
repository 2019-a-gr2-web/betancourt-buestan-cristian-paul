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
        return 'Hello world';
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
AppController = __decorate([
    common_1.Controller('/api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
const json = [
    {
        llave: 'valor',
        'nombre': "Cristian",
        "edad": 21,
        sueldo: 2.2,
        casado: false,
        hijos: null,
        mascotas: ["cachetas", 1, 1.25, false, null,
            {
                "nombre": "Cristian"
            }
        ]
    }
];
let objeto = {
    propiedad: 'valor',
    propiedadDos: 'valorDos'
};
objeto.propiedad;
objeto.propiedadDos;
objeto.propiedadTres = 'valorTres';
objeto['propiedadTres'] = 'valorTres';
delete objeto.propiedadTres;
objeto.propiedadTres = undefined;
//# sourceMappingURL=app.controller.js.map