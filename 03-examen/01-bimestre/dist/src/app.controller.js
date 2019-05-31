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
    constructor(__appService) {
        this.__appService = __appService;
    }
    inicio(res) {
        res.render('login');
    }
    usuario(usuario, res) {
        res.cookie('usuario', usuario, {
            signed: true
        }).redirect('/api/sistemaOperativo');
    }
    sistemaOperativo(req, res, nombre) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        let arregloSO;
        if (nombre) {
            arregloSO = this.__appService.buscarPorNombreSO(nombre);
        }
        else {
            arregloSO = this.__appService.sistemasOperativos;
        }
        res.render('lista-so', {
            usuario: usuario,
            arregloSO: arregloSO
        });
    }
    cerrarSesion(req, res) {
        res.clearCookie('usuario');
        res.redirect('/api/inicio');
    }
    enviarCrearSO(req, res) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        res.render('crear-so', { usuario: usuario });
    }
    crearSO(req, res, body) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        body.versionApi = Number(body.versionApi);
        body.fechaLanzamiento = new Date(body.fechaLanzamiento);
        body.pesoEnGigas = Number(body.pesoEnGigas);
        body.instalado = Boolean(body.instalado);
        this.__appService.insertarSO(body);
        res.redirect('/api/sistemaOperativo');
    }
    eliminarTrago(req, res, idSO) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        this.__appService.eliminarSO(idSO);
        res.redirect('/api/sistemaOperativo');
    }
    aplicacion(req, res, param, nombre) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        let arregloApp;
        const idSO = param.idSO;
        if (nombre) {
            arregloApp = this.__appService.buscarPorNombreApp(nombre, idSO);
        }
        else {
            arregloApp = this.__appService.buscarApp(idSO);
        }
        res.render('lista-app', { usuario: usuario, idSO: idSO, arregloApp: arregloApp });
    }
    enviarCrearApp(req, res, idSO) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        res.render('crear-app', { usuario: usuario, idSO: idSO });
    }
    insertarDatosApp(req, res, app) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        app.sistemaOperativoId = Number(app.sistemaOperativoId);
        app.version = Number(app.version);
        app.fechaLanzamiento = new Date(app.fechaLanzamiento);
        app.costo = Number(app.costo);
        app.pesoEnGigas = Number(app.pesoEnGigas);
        this.__appService.insertarApp(app);
        res.redirect('/api/sistemaOperativo/gestion/' + app.sistemaOperativoId);
    }
    eliminarApp(req, res, idApp, idSO) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        this.__appService.eliminarApp(Number(idApp));
        res.redirect('/api/sistemaOperativo/gestion/' + idSO);
    }
    cookieValida(res, usuario) {
        if (!usuario) {
            res.redirect('/api/cerrar');
        }
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
__decorate([
    common_1.Post('usuario'),
    __param(0, common_1.Body('usuario')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "usuario", null);
__decorate([
    common_1.Get('sistemaOperativo'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Query('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sistemaOperativo", null);
__decorate([
    common_1.Get('cerrar'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cerrarSesion", null);
__decorate([
    common_1.Get('sistemaOperativo/crear'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "enviarCrearSO", null);
__decorate([
    common_1.Post('sistemaOperativo/crear'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearSO", null);
__decorate([
    common_1.Post('sistemaOperativo/eliminar'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __param(2, common_1.Body('idSO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "eliminarTrago", null);
__decorate([
    common_1.Get('sistemaOperativo/gestion/:idSO'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Param()), __param(3, common_1.Query('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "aplicacion", null);
__decorate([
    common_1.Post('sistemaOperativo/gestion/crear'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body('idSO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "enviarCrearApp", null);
__decorate([
    common_1.Post('sistemaOperativo/gestion/insertar'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "insertarDatosApp", null);
__decorate([
    common_1.Post('sistemaoperativo/gestion/eliminar'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body('id')), __param(3, common_1.Body('idSO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "eliminarApp", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cookieValida", null);
AppController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map