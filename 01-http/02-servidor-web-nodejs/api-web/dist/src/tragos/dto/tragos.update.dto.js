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
const class_validator_1 = require("class-validator");
class TragosUpdateDto {
}
__decorate([
    class_validator_1.IsEmpty(),
    __metadata("design:type", Number)
], TragosUpdateDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TragosUpdateDto.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TragosUpdateDto.prototype, "tipo", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], TragosUpdateDto.prototype, "gradosAlcohol", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], TragosUpdateDto.prototype, "fechaCaducidad", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], TragosUpdateDto.prototype, "precio", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], TragosUpdateDto.prototype, "distribuidorID", void 0);
exports.TragosUpdateDto = TragosUpdateDto;
//# sourceMappingURL=tragos.update.dto.js.map