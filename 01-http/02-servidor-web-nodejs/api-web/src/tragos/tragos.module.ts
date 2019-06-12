import {Module} from "@nestjs/common";
import {TragosService} from "./tragos.services";
import {TragosController} from "./tragos.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                TragosEntity
            ],
            'default'
        )
    ], //Modulos
    controllers: [TragosController], //Controladores
    providers: [TragosService], //Servicios
    exports: [TragosService] //Exportar servicios0
})

export class TragosModule {
    
}