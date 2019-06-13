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
    login(res) {
        res.render('login');
    }
    usuario(usuario, res) {
        res.cookie('usuario', usuario, {
            signed: true
        }).redirect('/api/inicio');
    }
    listaClientes(res) {
        const listaClientes = [];
        res.render('lista-clientes', { listaClientes: listaClientes });
    }
    crearCliente(res) {
        res.render('crear-cliente');
    }
    insertarCliente(cliente, res) {
        cliente.nombre = cliente.nombre.toString();
        cliente.apellido = cliente.nombre.toString();
        cliente.cedula = cliente.cedula.toString();
        console.log(`${cliente.nombre} ${cliente.apellido} ${cliente.cedula}`);
        res.redirect('/shoes/clientes');
    }
    eliminarCliente(res, cliente) {
        console.log(cliente.codigoCli.toString());
        res.redirect('/shoes/clientes');
    }
    actualizarCliente(res, par) {
        const idCli = par.idCli;
        res.render('actualizar-cliente', { idCli: idCli });
    }
    listaCompras(res) {
        const listaClientes = [];
        res.render('lista-compras', { listaClientes: listaClientes });
    }
    crearCompra(res) {
        res.render('crear-compra');
    }
    listaZapatos(res) {
        const listaClientes = [];
        res.render('lista-zapatos', { listaClientes: listaClientes });
    }
    crearZapato(res) {
        res.render('crear-zapato');
    }
    insertarZapato(zapato, res) {
        zapato.marca = zapato.marca.toString();
        zapato.color = zapato.color.toString();
        zapato.talla = Number(zapato.talla);
        zapato.cantidad = Number(zapato.cantidad);
        zapato.precio = Number(zapato.precio);
        zapato.tipo = zapato.tipo.toString();
        console.log(`${zapato.marca} ${zapato.color} ${zapato.talla} ${zapato.cantidad} ${zapato.precio} ${zapato.tipo}`);
        res.redirect('/shoes/zapatos');
    }
    inicio(res) {
        res.render('inicio', {});
    }
    cookieValida(res, usuario) {
        if (!usuario) {
            res.redirect('/api/cerrar');
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
    common_1.Post('usuario'),
    __param(0, common_1.Body('usuario')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "usuario", null);
__decorate([
    common_1.Get('clientes'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "listaClientes", null);
__decorate([
    common_1.Get('clientes/crear'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearCliente", null);
__decorate([
    common_1.Post('clientes/crear'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "insertarCliente", null);
__decorate([
    common_1.Post('clientes/borrar'),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "eliminarCliente", null);
__decorate([
    common_1.Get('clientes/actualizar/:idCli'),
    __param(0, common_1.Response()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizarCliente", null);
__decorate([
    common_1.Get('compras'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "listaCompras", null);
__decorate([
    common_1.Get('compras/crear'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearCompra", null);
__decorate([
    common_1.Get('zapatos'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "listaZapatos", null);
__decorate([
    common_1.Get('zapatos/crear'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearZapato", null);
__decorate([
    common_1.Post('zapatos/crear'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "insertarZapato", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cookieValida", null);
AppController = __decorate([
    common_1.Controller('shoes'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map