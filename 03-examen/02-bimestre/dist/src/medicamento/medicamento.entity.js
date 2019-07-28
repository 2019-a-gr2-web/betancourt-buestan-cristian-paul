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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const PrimaryGeneratedColumn_1 = require("typeorm/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("typeorm/decorator/columns/Column");
const paciente_entity_1 = require("../paciente/paciente.entity");
let MedicamentoEntity = class MedicamentoEntity {
};
__decorate([
    PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MedicamentoEntity.prototype, "id", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'gramosAIngerir',
    }),
    __metadata("design:type", String)
], MedicamentoEntity.prototype, "gramosAIngerir", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'nombre',
    }),
    __metadata("design:type", String)
], MedicamentoEntity.prototype, "nombre", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'composicion',
    }),
    __metadata("design:type", String)
], MedicamentoEntity.prototype, "composicion", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'usadoPara',
    }),
    __metadata("design:type", String)
], MedicamentoEntity.prototype, "usadoPara", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'fechaCaducidad'
    }),
    __metadata("design:type", String)
], MedicamentoEntity.prototype, "fechaCaducidad", void 0);
__decorate([
    Column_1.Column({
        type: 'int',
        name: 'numeroPastillas',
    }),
    __metadata("design:type", Number)
], MedicamentoEntity.prototype, "numeroPastillas", void 0);
__decorate([
    Column_1.Column({
        type: 'double',
        name: 'precio',
    }),
    __metadata("design:type", Number)
], MedicamentoEntity.prototype, "precio", void 0);
__decorate([
    typeorm_1.ManyToOne(type => paciente_entity_1.PacienteEntity, paciente => paciente.medicamentos),
    __metadata("design:type", paciente_entity_1.PacienteEntity)
], MedicamentoEntity.prototype, "paciente", void 0);
MedicamentoEntity = __decorate([
    typeorm_1.Entity('medicamento')
], MedicamentoEntity);
exports.MedicamentoEntity = MedicamentoEntity;
//# sourceMappingURL=medicamento.entity.js.map