import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PacienteModule} from "./paciente/paciente.module";
import {PacienteEntity} from "./paciente/paciente.entity";
import {MedicamentoModule} from "./medicamento/medicamento.module";
import {MedicamentoEntity} from "./medicamento/medicamento.entity";
import {PacienteController} from "./paciente/paciente.controller";
import {MedicamentoController} from "./medicamento/medicamento.controller";
import {PedidoEntity} from "./cabecera/pedido.entity";
import {PedidoModule} from "./cabecera/pedido.module";
import {PedidoController} from "./cabecera/pedido.controller";
import {DespachoModule} from "./despacho/despacho.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'default', // nombre de conx por defecto del typeorm
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'CRISTIAN',
            password: 'password',
            database: 'pedidos',
            entities: [PacienteEntity, MedicamentoEntity, PedidoEntity],
            synchronize: true,
            insecureAuth: true
        }),
        PacienteModule,
        MedicamentoModule,
        PedidoModule,
        DespachoModule
    ],
    controllers: [AppController, PacienteController,
        MedicamentoController, PedidoController
    ],
    providers: [AppService],
})
export class AppModule {
}
