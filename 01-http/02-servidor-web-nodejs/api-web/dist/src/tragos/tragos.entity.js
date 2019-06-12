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
let TragosEntity = class TragosEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TragosEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_trago',
    }),
    __metadata("design:type", String)
], TragosEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 10,
        name: 'tipo_trago',
    }),
    __metadata("design:type", String)
], TragosEntity.prototype, "tipo", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        name: 'grados_alcohol',
    }),
    __metadata("design:type", Number)
], TragosEntity.prototype, "gradosAlcohol", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date',
        name: 'fecha_caducidad',
    }),
    __metadata("design:type", Date)
], TragosEntity.prototype, "fechaCaducidad", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'precio',
    }),
    __metadata("design:type", Number)
], TragosEntity.prototype, "precio", void 0);
TragosEntity = __decorate([
    typeorm_1.Entity('bd_trago')
], TragosEntity);
exports.TragosEntity = TragosEntity;
//# sourceMappingURL=tragos.entity.js.map