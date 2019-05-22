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
const tragos_services_1 = require("./tragos.services");
let TragosController = class TragosController {
    constructor(_tragosService) {
        this._tragosService = _tragosService;
    }
    listarTragos(res) {
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos', { arregloTragos: arregloTragos });
    }
    crearTrago(res) {
        res.render('tragos/crear-editar');
    }
    crearTragoPost(trago, res) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista');
        console.log(trago);
    }
    eliminarTrago(res, id) {
        this._tragosService.eliminar(id);
        res.redirect('/api/traguito/lista');
    }
};
__decorate([
    common_1.Get('lista'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "listarTragos", null);
__decorate([
    common_1.Get('crear'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "crearTrago", null);
__decorate([
    common_1.Post('crear'),
    __param(0, common_1.Body()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "crearTragoPost", null);
__decorate([
    common_1.Post('eliminar'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TragosController.prototype, "eliminarTrago", null);
TragosController = __decorate([
    common_1.Controller('/api/traguito'),
    __metadata("design:paramtypes", [tragos_services_1.TragosService])
], TragosController);
exports.TragosController = TragosController;
//# sourceMappingURL=tragos.controller.js.map