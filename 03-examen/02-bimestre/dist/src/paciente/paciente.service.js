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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paciente_entity_1 = require("./paciente.entity");
let PacienteService = class PacienteService {
    constructor(_pacienteRepository) {
        this._pacienteRepository = _pacienteRepository;
        let paciente1;
        paciente1 = {
            nombres: 'Paul',
            id: 0,
            apellidos: 'Betancourt',
            fechaNacimiento: '1975-05-21',
            hijos: 3,
            tieneSeguro: true,
            medicamentos: null
        };
    }
    crear(paciente) {
        console.log(`crear-pacienteeeeeesssss ${paciente.nombres}`);
        const objetoEntidad = this._pacienteRepository.create(paciente);
        this._pacienteRepository.save(objetoEntidad);
    }
    obtenerPacientes(parametrosBusqueda) {
        return this._pacienteRepository.find(parametrosBusqueda);
    }
};
PacienteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(paciente_entity_1.PacienteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PacienteService);
exports.PacienteService = PacienteService;
//# sourceMappingURL=paciente.service.js.map