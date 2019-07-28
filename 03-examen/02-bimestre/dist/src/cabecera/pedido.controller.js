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
const pedido_service_1 = require("./pedido.service");
const paciente_service_1 = require("../paciente/paciente.service");
const medicamento_service_1 = require("../medicamento/medicamento.service");
let PedidoController = class PedidoController {
    constructor(pedido, paciente, medicamento) {
        this.pedido = pedido;
        this.paciente = paciente;
        this.medicamento = medicamento;
        this.listaMedicamento = [];
        this.valorTotal = 0;
        this.impuesto = 0.12;
        this.nombrePaciente = "";
        this.carrito = [];
        this.pacienteId = -1;
    }
    validar(req, res, nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
            const listaPacientes = yield this.paciente.obtenerPacientes();
            this.validarUsuario(res, nombre, listaPacientes);
            res.redirect('/pedido/compra');
        });
    }
    crearCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
            const consulta = {
                where: [
                    {
                        paciente: this.pacienteId
                    }
                ]
            };
            this.listaMedicamento = yield this.medicamento.obtenerMedicamentos(consulta);
            res.render('compra', { nombrePaciente: this.nombrePaciente, medicamentos: this.listaMedicamento });
        });
    }
    agregarMedicamento(req, res, cantidad, elementoCarrito) {
        const tipoUsuario = req.signedCookies.tipoUsuario;
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        const existe = this.carrito.find((c) => {
            return elementoCarrito.idMedicamento == c.idMedicamento;
        });
        if (elementoCarrito.cantidad > 0) {
            if (existe) {
                this.carrito.map((c) => {
                    if (c.idMedicamento == elementoCarrito.idMedicamento) {
                        c.cantidad = Number(c.cantidad) + Number(elementoCarrito.cantidad);
                    }
                });
            }
            else {
                this.carrito.push(elementoCarrito);
            }
            res.redirect('compra');
        }
    }
    desagregarMedicamento(req, res, elementoCarrito) {
        const tipoUsuario = req.signedCookies.tipoUsuario;
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        this.carrito = this.carrito.filter((c) => {
            return c.idMedicamento != elementoCarrito.idMedicamento;
        });
        res.redirect('/pedido/compra');
    }
    mostrarCarrito(res, req) {
        const tipoUsuario = req.signedCookies.tipoUsuario;
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        res.render('carrito', { carrito: this.carrito, impuesto: this.impuesto });
    }
    confirmarCompra(res, req) {
        const tipoUsuario = req.signedCookies.tipoUsuario;
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        res.render('confirmarCompra', { nombrePaciente: this.nombrePaciente });
    }
    ingresarCompra(res, req, pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
            let subtotal = 0;
            this.carrito.forEach(c => {
                subtotal = subtotal + (Number(c.cantidad) * Number(c.precio));
            });
            pedido.estado = 'POR DESPACHAR';
            pedido.nombre = this.nombrePaciente;
            pedido.subtotal = subtotal;
            pedido.total = (Number(this.impuesto) + 1) * subtotal;
            console.log(pedido);
            yield this.pedido.insertarPedido(pedido);
            this.carrito = [];
            res.redirect('/pedido/compra');
        });
    }
    validarUsuario(res, nombre, listaPacientes) {
        const paciente = listaPacientes.find(pac => {
            return (nombre.trim().toUpperCase()) === (`${pac.nombres.trim().toUpperCase()} ${pac.apellidos.trim().toUpperCase()}`);
        });
        if (paciente) {
            this.pacienteId = paciente.id;
            this.nombrePaciente = `${paciente.nombres.trim().toUpperCase()} ${paciente.apellidos.trim().toUpperCase()}`;
        }
        else {
            res.redirect('/api/cerrar');
        }
    }
    listaPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
            const listaPedidos = yield this.pedido.obtenerPedidos();
            const pedidos = listaPedidos.filter(pedido => {
                return pedido.nombre === this.nombrePaciente;
            });
            console.log(pedidos);
            res.render('pedidos', { pedidos: pedidos });
        });
    }
    eliminarPedido(res, req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
            yield this.pedido.eliminarPedido(id);
            res.redirect('/pedido/lista');
        });
    }
    cookieUsuarioValida(res, tipoUsuario, tipoUsuarioV) {
        if (!tipoUsuario || tipoUsuario != tipoUsuarioV) {
            res.redirect('/api/cerrar');
        }
    }
};
__decorate([
    common_1.Get('validarUsuario'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Query('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "validar", null);
__decorate([
    common_1.Get('compra'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "crearCompra", null);
__decorate([
    common_1.Post('agregarMedicamento'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body('cantidad')), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "agregarMedicamento", null);
__decorate([
    common_1.Post('desagregarMedicamento'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "desagregarMedicamento", null);
__decorate([
    common_1.Get('carrito'),
    __param(0, common_1.Response()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "mostrarCarrito", null);
__decorate([
    common_1.Get('confirmarCompra'),
    __param(0, common_1.Response()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "confirmarCompra", null);
__decorate([
    common_1.Post('ingresarCompra'),
    __param(0, common_1.Response()), __param(1, common_1.Request()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "ingresarCompra", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "validarUsuario", null);
__decorate([
    common_1.Get('lista'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "listaPedidos", null);
__decorate([
    common_1.Post('eliminar'),
    __param(0, common_1.Response()), __param(1, common_1.Request()), __param(2, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "eliminarPedido", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "cookieUsuarioValida", null);
PedidoController = __decorate([
    common_1.Controller('pedido'),
    __metadata("design:paramtypes", [pedido_service_1.PedidoService,
        paciente_service_1.PacienteService,
        medicamento_service_1.MedicamentoService])
], PedidoController);
exports.PedidoController = PedidoController;
//# sourceMappingURL=pedido.controller.js.map