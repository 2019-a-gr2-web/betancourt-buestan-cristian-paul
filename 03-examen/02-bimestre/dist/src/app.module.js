"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const paciente_module_1 = require("./paciente/paciente.module");
const paciente_entity_1 = require("./paciente/paciente.entity");
const medicamento_module_1 = require("./medicamento/medicamento.module");
const medicamento_entity_1 = require("./medicamento/medicamento.entity");
const paciente_controller_1 = require("./paciente/paciente.controller");
const medicamento_controller_1 = require("./medicamento/medicamento.controller");
const pedido_entity_1 = require("./cabecera/pedido.entity");
const pedido_module_1 = require("./cabecera/pedido.module");
const pedido_controller_1 = require("./cabecera/pedido.controller");
const despacho_module_1 = require("./despacho/despacho.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                name: 'default',
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'CRISTIAN',
                password: 'password',
                database: 'pedidos',
                entities: [paciente_entity_1.PacienteEntity, medicamento_entity_1.MedicamentoEntity, pedido_entity_1.PedidoEntity],
                synchronize: true,
                insecureAuth: true
            }),
            paciente_module_1.PacienteModule,
            medicamento_module_1.MedicamentoModule,
            pedido_module_1.PedidoModule,
            despacho_module_1.DespachoModule
        ],
        controllers: [app_controller_1.AppController, paciente_controller_1.PacienteController,
            medicamento_controller_1.MedicamentoController, pedido_controller_1.PedidoController
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map