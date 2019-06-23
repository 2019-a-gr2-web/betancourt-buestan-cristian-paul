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
const zapato_entity_1 = require("./zapato.entity");
const cliente_entity_1 = require("./cliente.entity");
let ComprasEntity = class ComprasEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ComprasEntity.prototype, "codigoCom", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date',
        name: 'fecha',
    }),
    __metadata("design:type", Date)
], ComprasEntity.prototype, "fecha", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        name: 'cantidad',
    }),
    __metadata("design:type", Number)
], ComprasEntity.prototype, "cantidad", void 0);
__decorate([
    typeorm_1.Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'total',
    }),
    __metadata("design:type", Number)
], ComprasEntity.prototype, "total", void 0);
__decorate([
    typeorm_1.Column({
        type: 'boolean',
        name: 'validez',
        default: true
    }),
    __metadata("design:type", Boolean)
], ComprasEntity.prototype, "validez", void 0);
__decorate([
    typeorm_1.ManyToOne(type => zapato_entity_1.ZapatoEntity, zapato => zapato.compras),
    __metadata("design:type", zapato_entity_1.ZapatoEntity)
], ComprasEntity.prototype, "comZapId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => cliente_entity_1.ClienteEntity, cliente => cliente.compras),
    __metadata("design:type", cliente_entity_1.ClienteEntity)
], ComprasEntity.prototype, "comCliId", void 0);
ComprasEntity = __decorate([
    typeorm_1.Entity('Compras')
], ComprasEntity);
exports.ComprasEntity = ComprasEntity;
//# sourceMappingURL=compras.entity.js.map