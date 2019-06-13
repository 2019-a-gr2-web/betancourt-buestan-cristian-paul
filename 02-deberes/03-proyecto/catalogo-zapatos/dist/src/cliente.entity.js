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
let ClienteEntity = class ClienteEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ClienteEntity.prototype, "codigoCli", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 10,
        name: 'nombre',
    }),
    __metadata("design:type", String)
], ClienteEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 15,
        name: 'apellido',
    }),
    __metadata("design:type", String)
], ClienteEntity.prototype, "apellido", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 15,
        name: 'cedula',
    }),
    __metadata("design:type", String)
], ClienteEntity.prototype, "cedula", void 0);
ClienteEntity = __decorate([
    typeorm_1.Entity('Cliente')
], ClienteEntity);
exports.ClienteEntity = ClienteEntity;
//# sourceMappingURL=cliente.entity.js.map