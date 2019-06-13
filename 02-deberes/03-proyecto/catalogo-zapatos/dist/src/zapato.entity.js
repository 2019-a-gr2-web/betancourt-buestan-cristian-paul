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
let ZapatoEntity = class ZapatoEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ZapatoEntity.prototype, "codigoZap", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 15,
        name: 'marca',
    }),
    __metadata("design:type", String)
], ZapatoEntity.prototype, "marca", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 15,
        name: 'color',
    }),
    __metadata("design:type", String)
], ZapatoEntity.prototype, "color", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        name: 'talla',
    }),
    __metadata("design:type", Number)
], ZapatoEntity.prototype, "talla", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 6,
        name: 'tipo',
    }),
    __metadata("design:type", String)
], ZapatoEntity.prototype, "tipo", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        name: 'cantidad',
    }),
    __metadata("design:type", Number)
], ZapatoEntity.prototype, "cantidad", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'precio',
    }),
    __metadata("design:type", Number)
], ZapatoEntity.prototype, "precio", void 0);
ZapatoEntity = __decorate([
    typeorm_1.Entity('Zapato')
], ZapatoEntity);
exports.ZapatoEntity = ZapatoEntity;
//# sourceMappingURL=zapato.entity.js.map