import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {MedicamentoService} from "./medicamento.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                MedicamentoEntity
            ],
            'default'
        )
    ], //Modulos
    controllers: [], //Controladores
    providers: [MedicamentoService], //Servicios
    exports: [MedicamentoService] //Exportar servicios0
})

export class MedicamentoModule {

}
