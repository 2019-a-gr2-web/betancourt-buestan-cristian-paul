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
    login(res) {
        res.render('login');
    }
    cerrarSesion(req, res) {
        res.clearCookie('usuario');
        res.redirect('/api/login');
    }
    usuario(tipoUsuario, res, nombreUsuario) {
        res.clearCookie('usuario');
        console.log(`${tipoUsuario}`);
        res.cookie('tipoUsuario', tipoUsuario, {
            signed: true
        });
        if (tipoUsuario == 'administrador') {
            res.redirect('/paciente/lista');
        }
        else if (tipoUsuario == 'usuario') {
            res.redirect('/pedido/validarUsuario?nombre=' + `${nombreUsuario}`);
        }
        else if (tipoUsuario == 'despachador') {
            res.redirect('/websockets/despachadorPedidos.html');
        }
        else {
        }
    }
};
__decorate([
    common_1.Get('login'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    common_1.Get('cerrar'),
    __param(0, common_1.Request()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cerrarSesion", null);
__decorate([
    common_1.Post('usuario'),
    __param(0, common_1.Body('tipoUsuario')),
    __param(1, common_1.Response()),
    __param(2, common_1.Body('nombreUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "usuario", null);
AppController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map