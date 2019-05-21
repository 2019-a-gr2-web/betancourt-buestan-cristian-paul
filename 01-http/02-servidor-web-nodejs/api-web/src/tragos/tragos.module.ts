import {Module} from "@nestjs/common";
import {TragosService} from "./tragos.services";
import {TragosController} from "./tragos.controller";

@Module({
    imports: [], //Modulos
    controllers: [TragosController], //Controladores
    providers: [TragosService], //Servicios
    exports: [TragosService] //Exportar servicios0
})

export class TragosModule {
    
}