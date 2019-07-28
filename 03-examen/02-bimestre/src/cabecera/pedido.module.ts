import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PedidoService} from "./pedido.service";
import {PedidoEntity} from "./pedido.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                PedidoEntity
            ],
            'default'
        )
    ], //Modulos
    controllers: [], //Controladores
    providers: [PedidoService], //Servicios
    exports: [PedidoService] //Exportar servicios0
})

export class PedidoModule {

}
