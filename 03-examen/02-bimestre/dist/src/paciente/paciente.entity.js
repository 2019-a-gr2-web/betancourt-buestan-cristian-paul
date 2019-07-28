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
const medicamento_entity_1 = require("../medicamento/medicamento.entity");
let PacienteEntity = class PacienteEntity {
};
__decorate([
    PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PacienteEntity.prototype, "id", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'nombres',
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "nombres", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'apellidos',
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "apellidos", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'fechaNacimiento'
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "fechaNacimiento", void 0);
__decorate([
    Column_1.Column({
        type: 'int',
        name: 'hijos',
    }),
    __metadata("design:type", Number)
], PacienteEntity.prototype, "hijos", void 0);
__decorate([
    Column_1.Column({
        type: 'bool',
        name: 'tieneSeguro'
    }),
    __metadata("design:type", Boolean)
], PacienteEntity.prototype, "tieneSeguro", void 0);
__decorate([
    typeorm_1.OneToMany(type => medicamento_entity_1.MedicamentoEntity, medicamentos => medicamentos),
    __metadata("design:type", Array)
], PacienteEntity.prototype, "medicamentos", void 0);
PacienteEntity = __decorate([
    typeorm_1.Entity('paciente')
], PacienteEntity);
exports.PacienteEntity = PacienteEntity;
//# sourceMappingURL=paciente.entity.js.map