"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paciente_entity_1 = require("./paciente.entity");
const paciente_service_1 = require("./paciente.service");
let PacienteModule = class PacienteModule {
};
PacienteModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                paciente_entity_1.MedicamentoEntity
            ], 'default')
        ],
        controllers: [],
        providers: [paciente_service_1.PacienteService],
        exports: [paciente_service_1.PacienteService]
    })
], PacienteModule);
exports.PacienteModule = PacienteModule;
//# sourceMappingURL=paciente.module.js.map