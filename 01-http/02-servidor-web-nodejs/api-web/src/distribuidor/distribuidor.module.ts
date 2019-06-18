import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DistribuidorEntity} from "./distribuidor.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                DistribuidorEntity
            ],
            'default'
        )
    ], //Modulos
    controllers: [], //Controladores
    providers: [], //Servicios
    exports: [] //Exportar servicios0
})

export class DistribuidorModule {
    
}