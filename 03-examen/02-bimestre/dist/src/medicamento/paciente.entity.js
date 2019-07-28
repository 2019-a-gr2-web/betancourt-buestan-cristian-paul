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
        name: 'gramosAingerir',
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "gramosAingerir", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'nombre',
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "nombre", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'composicion',
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "composicion", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'usadoPara',
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "usadoPara", void 0);
__decorate([
    Column_1.Column({
        type: 'varchar',
        length: 70,
        name: 'fechaCaducidad'
    }),
    __metadata("design:type", String)
], PacienteEntity.prototype, "fechaCaducidad", void 0);
__decorate([
    Column_1.Column({
        type: 'int',
        name: 'numeroPastillas',
    }),
    __metadata("design:type", Number)
], PacienteEntity.prototype, "numeroPastillas", void 0);
__decorate([
    typeorm_1.OneToMany(type => MedicamentoEntity, compras => compras),
    __metadata("design:type", Array)
], PacienteEntity.prototype, "compras", void 0);
PacienteEntity = __decorate([
    typeorm_1.Entity('medicamento')
], PacienteEntity);
exports.PacienteEntity = PacienteEntity;
//# sourceMappingURL=paciente.entity.js.map