import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteEntity} from "./paciente.entity";
import {PacienteService} from "./paciente.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                PacienteEntity
            ],
            'default'
        )
    ], //Modulos
    controllers: [], //Controladores
    providers: [PacienteService], //Servicios
    exports: [PacienteService] //Exportar servicios0
})

export class PacienteModule {

}
