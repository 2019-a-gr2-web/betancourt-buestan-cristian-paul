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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(__appService) {
        this.__appService = __appService;
    }
    listaClientes(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arregloClientes = yield this.__appService.obtenerClientes();
            res.render('lista-clientes', { arregloClientes: arregloClientes });
        });
    }
    crearCliente(res) {
        res.render('crear-cliente');
    }
    insertarCliente(cliente, res) {
        return __awaiter(this, void 0, void 0, function* () {
            cliente.nombre = cliente.nombre.toString();
            cliente.apellido = cliente.apellido.toString();
            cliente.cedula = cliente.cedula.toString();
            const resp = yield this.__appService.insertarCliente(cliente);
            res.redirect('/shoes/clientes');
        });
    }
    actualizarCliente(res, par) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigoCli = par.codigoCli;
            const arregloClientes = yield this.__appService.obtenerClientes();
            res.render('actualizar-cliente', { arregloClientes: arregloClientes, codigoCli: codigoCli });
        });
    }
    ejecutarCambioCliente(metodo, res, codigoCli, nombre, apellido, cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = {};
            cliente.codigoCli = Number(codigoCli);
            if (metodo == "DELETE") {
                yield this.__appService.borrarCliente(cliente);
            }
            else {
                cliente.nombre = nombre;
                cliente.apellido = apellido;
                cliente.cedula = cedula;
                yield this.__appService.actualizarCliente(cliente);
            }
            res.redirect('/shoes/clientes');
        });
    }
    listaCompras(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arregloZapatos = yield this.__appService.obtenerZapatos();
            const arregloClientes = yield this.__appService.obtenerClientes();
            const arregloCompras = yield this.__appService.obtenerCompras();
            console.log(arregloZapatos);
            console.log(arregloCompras);
            console.log(arregloClientes);
            res.render('lista-compras', {
                arregloClientes: arregloClientes,
                arregloZapatos: arregloZapatos,
                arregloCompras: arregloCompras,
            });
        });
    }
    crearCompra(res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('crear-compra');
        });
    }
    insertarCompra(res, compra) {
        return __awaiter(this, void 0, void 0, function* () {
            compra.cantidad = Number(compra.cantidad);
            compra.comCliId = Number(compra.comCliId);
            compra.comZapId = Number(compra.comZapId);
            compra.fecha = new Date(compra.fecha);
            compra.validez = true;
            const arregloZapatos = yield this.__appService.obtenerZapatos();
            arregloZapatos.forEach(zapato => {
                if (zapato.codigoZap == compra.comZapId) {
                    compra.total = zapato.precio * compra.cantidad;
                }
            });
            console.log(`${compra.comCliId} ${compra.comZapId} ${compra.cantidad} ${compra.fecha} ${compra.validez} ${compra.total}`);
            this.__appService.insertarCompra(compra);
            res.redirect('/shoes/compras');
        });
    }
    listaZapatos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arregloZapatos = yield this.__appService.obtenerZapatos();
            res.render('lista-zapatos', { arregloZapatos: arregloZapatos });
        });
    }
    crearZapato(res) {
        res.render('crear-zapato');
    }
    insertarZapato(zapato, res) {
        return __awaiter(this, void 0, void 0, function* () {
            zapato.marca = zapato.marca.toString();
            zapato.color = zapato.color.toString();
            zapato.talla = Number(zapato.talla);
            zapato.cantidad = Number(zapato.cantidad);
            zapato.precio = Number(zapato.precio);
            zapato.tipo = zapato.tipo.toString();
            yield this.__appService.insertarZapato(zapato);
            res.redirect('/shoes/zapatos');
        });
    }
    actualizarZapato(par, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigoZap = par.codigoZap;
            const arregloZapatos = yield this.__appService.obtenerZapatos();
            res.render('actualizar-zapato', { arregloZapatos: arregloZapatos, codigoZap: codigoZap });
        });
    }
    ejecutarCambioZapato(metodo, res, codigoZap, talla, tipo, color, precio, cantidad, marca) {
        return __awaiter(this, void 0, void 0, function* () {
            const zapato = {};
            zapato.codigoZap = Number(codigoZap);
            if (metodo == "DELETE") {
                yield this.__appService.borrarZapato(zapato);
            }
            else {
                zapato.codigoZap = Number(codigoZap);
                zapato.talla = Number(talla);
                zapato.marca = marca;
                zapato.color = color;
                zapato.cantidad = Number(cantidad);
                zapato.precio = Number(precio);
                zapato.tipo = tipo;
                yield this.__appService.actualizarZapato(zapato);
            }
            res.redirect('/shoes/zapatos');
        });
    }
    inicio(res) {
        res.render('inicio', {});
    }
};
__decorate([
    common_1.Get('clientes'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
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
    __metadata("design:returntype", Promise)
], AppController.prototype, "insertarCliente", null);
__decorate([
    common_1.Get('clientes/actualizar/:codigoCli'),
    __param(0, common_1.Response()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "actualizarCliente", null);
__decorate([
    common_1.Post('clientes/actualizar'),
    __param(0, common_1.Body('_method')),
    __param(1, common_1.Response()),
    __param(2, common_1.Body('codigoCli')),
    __param(3, common_1.Body('nombre')),
    __param(4, common_1.Body('apellido')),
    __param(5, common_1.Body('cedula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "ejecutarCambioCliente", null);
__decorate([
    common_1.Get('compras'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "listaCompras", null);
__decorate([
    common_1.Get('compras/crear'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "crearCompra", null);
__decorate([
    common_1.Post('compras/crear'),
    __param(0, common_1.Response()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "insertarCompra", null);
__decorate([
    common_1.Get('zapatos'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
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
    __metadata("design:returntype", Promise)
], AppController.prototype, "insertarZapato", null);
__decorate([
    common_1.Get('zapatos/actualizar/:codigoZap'),
    __param(0, common_1.Param()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "actualizarZapato", null);
__decorate([
    common_1.Post('zapatos/actualizar'),
    __param(0, common_1.Body('_method')),
    __param(1, common_1.Response()),
    __param(2, common_1.Body('codigoZap')),
    __param(3, common_1.Body('talla')),
    __param(4, common_1.Body('tipo')),
    __param(5, common_1.Body('color')),
    __param(6, common_1.Body('precio')),
    __param(7, common_1.Body('cantidad')),
    __param(8, common_1.Body('marca')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "ejecutarCambioZapato", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
AppController = __decorate([
    common_1.Controller('shoes'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map