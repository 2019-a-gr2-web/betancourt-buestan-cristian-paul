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
const medicamento_service_1 = require("./medicamento.service");
const typeorm_1 = require("typeorm");
let MedicamentoController = class MedicamentoController {
    constructor(medicamento) {
        this.medicamento = medicamento;
    }
    medicamentos(res, req, idPaciente, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
            let consulta;
            let listaMedicamentos;
            if (query.nombre) {
                consulta = {
                    where: [
                        {
                            nombre: typeorm_1.Like(`%${query.nombre}%`),
                            paciente: idPaciente
                        }
                    ]
                };
                listaMedicamentos = yield this.medicamento.obtenerMedicamentos(consulta);
            }
            else if (query.composicion) {
                consulta = {
                    where: [
                        {
                            composicion: typeorm_1.Like(`%${query.composicion}%`),
                            paciente: idPaciente
                        }
                    ]
                };
                listaMedicamentos = yield this.medicamento.obtenerMedicamentos(consulta);
            }
            else {
                consulta = {
                    where: [
                        {
                            paciente: idPaciente
                        }
                    ]
                };
                listaMedicamentos = yield this.medicamento.obtenerMedicamentos(consulta);
            }
            console.log(idPaciente);
            console.log(listaMedicamentos);
            res.render('medicamentos', {
                idPaciente: idPaciente,
                listaMedicamentos: listaMedicamentos
            });
        });
    }
    crearMedicamento(req, res, medicamento, idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
            medicamento.paciente = {
                nombres: "",
                apellidos: "",
                id: idPaciente,
                hijos: 0,
                fechaNacimiento: "",
                tieneSeguro: true
            };
            yield this.medicamento.insertarMedicamento(medicamento);
            res.redirect('/medicamento/lista' + `/${idPaciente}`);
        });
    }
    insertarMedicamento(res, req, idPaciente) {
        const tipoUsuario = req.signedCookies.tipoUsuario;
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
        res.render('crearMedicamento', { idPaciente: idPaciente, actualizar: false, medicamento: null });
    }
    eliminarMedicamento(res, req, idPaciente, id) {
        const tipoUsuario = req.signedCookies.tipoUsuario;
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
        this.medicamento.eliminarMedicamento(id);
        res.redirect('/medicamento/lista/' + `${idPaciente}`);
    }
    actualizarPaciente(res, req, idPaciente, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
            const listaMedicamentos = yield this.medicamento.obtenerMedicamentos();
            const medicamento = listaMedicamentos.find(med => {
                return med.id == id;
            });
            res.render('crearMedicamento', { idPaciente: idPaciente, actualizar: true, medicamento: medicamento });
        });
    }
    ejecutarActualizacion(req, res, medicamento, idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
            yield this.medicamento.actualizarMedicamento(medicamento);
            res.redirect('/medicamento/lista/' + `${idPaciente}`);
        });
    }
    cookieUsuarioValida(res, tipoUsuario, tipoUsuarioV) {
        if (!tipoUsuario || tipoUsuario != tipoUsuarioV) {
            res.redirect('/api/cerrar');
        }
    }
};
__decorate([
    common_1.Get('lista/:idPaciente?'),
    __param(0, common_1.Response()), __param(1, common_1.Request()), __param(2, common_1.Param('idPaciente')), __param(3, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], MedicamentoController.prototype, "medicamentos", null);
__decorate([
    common_1.Post('insertar'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body()), __param(3, common_1.Body('idPaciente')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], MedicamentoController.prototype, "crearMedicamento", null);
__decorate([
    common_1.Get('insertar/:idPaciente'),
    __param(0, common_1.Response()), __param(1, common_1.Request()), __param(2, common_1.Param('idPaciente')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", void 0)
], MedicamentoController.prototype, "insertarMedicamento", null);
__decorate([
    common_1.Post('eliminar/:idPaciente'),
    __param(0, common_1.Response()), __param(1, common_1.Request()), __param(2, common_1.Param('idPaciente')), __param(3, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number]),
    __metadata("design:returntype", void 0)
], MedicamentoController.prototype, "eliminarMedicamento", null);
__decorate([
    common_1.Post('actualizar/:idPaciente'),
    __param(0, common_1.Response()), __param(1, common_1.Request()), __param(2, common_1.Param('idPaciente')), __param(3, common_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], MedicamentoController.prototype, "actualizarPaciente", null);
__decorate([
    common_1.Post('actualizarEjecutar'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Body()), __param(3, common_1.Body('idPaciente')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], MedicamentoController.prototype, "ejecutarActualizacion", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], MedicamentoController.prototype, "cookieUsuarioValida", null);
MedicamentoController = __decorate([
    common_1.Controller('medicamento'),
    __metadata("design:paramtypes", [medicamento_service_1.MedicamentoService])
], MedicamentoController);
exports.MedicamentoController = MedicamentoController;
//# sourceMappingURL=medicamento.controller.js.map