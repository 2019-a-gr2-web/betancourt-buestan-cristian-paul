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
const medicamento_entity_1 = require("./medicamento.entity");
let MedicamentoService = class MedicamentoService {
    constructor(_medicamentoRepository) {
        this._medicamentoRepository = _medicamentoRepository;
    }
    insertarMedicamento(medicamento) {
        const objetoEntidad = this._medicamentoRepository
            .create(medicamento);
        this._medicamentoRepository.save(objetoEntidad);
    }
    obtenerMedicamentos(parametrosBusqueda) {
        return this._medicamentoRepository.find(parametrosBusqueda);
    }
    actualizarMedicamento(medicamento) {
        return this._medicamentoRepository.createQueryBuilder()
            .update(medicamento)
            .set({
            nombre: `${medicamento.nombre}`,
            composicion: `${medicamento.composicion}`,
            gramosAIngerir: medicamento.gramosAIngerir,
            usadoPara: medicamento.usadoPara,
            fechaCaducidad: `${medicamento.fechaCaducidad}`,
            numeroPastillas: medicamento.numeroPastillas,
            precio: medicamento.precio
        })
            .where("id = :id", { id: medicamento.id })
            .execute();
    }
    eliminarMedicamento(idMedicamento) {
        return this._medicamentoRepository
            .createQueryBuilder()
            .delete()
            .from('medicamento')
            .where("id = :id", { id: idMedicamento })
            .execute();
    }
};
MedicamentoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(medicamento_entity_1.MedicamentoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MedicamentoService);
exports.MedicamentoService = MedicamentoService;
//# sourceMappingURL=medicamento.service.js.map