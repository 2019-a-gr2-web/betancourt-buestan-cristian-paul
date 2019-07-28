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
const paciente_service_1 = require("./paciente.service");
let PacienteController = class PacienteController {
    constructor(paciente) {
        this.paciente = paciente;
    }
    listaPacientes(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.signedCookies.tipoUsuario;
            this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
            const listaPacientes = yield this.paciente.obtenerPaciente();
            res.render('pacientes', {
                pacientes: listaPacientes
            });
        });
    }
    cookieUsuarioValida(res, tipoUsuario, tipoUsuarioV) {
        if (!tipoUsuario || tipoUsuario != tipoUsuarioV) {
            res.redirect('/api/cerrar');
        }
    }
};
__decorate([
    common_1.Get('lista'),
    __param(0, common_1.Response()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PacienteController.prototype, "listaPacientes", null);
__decorate([
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PacienteController.prototype, "cookieUsuarioValida", null);
PacienteController = __decorate([
    common_1.Controller('paciente'),
    __metadata("design:paramtypes", [paciente_service_1.PacienteService])
], PacienteController);
exports.PacienteController = PacienteController;
//# sourceMappingURL=paciente.controller.js.map