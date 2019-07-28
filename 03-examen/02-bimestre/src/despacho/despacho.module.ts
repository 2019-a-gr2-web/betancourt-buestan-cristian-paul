import {Module} from "@nestjs/common";
import {DespachoGateway} from "./despacho.gateway";
import {PedidoService} from "../cabecera/pedido.service";
import {PedidoEntity} from "../cabecera/pedido.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                PedidoEntity
            ],
            'default'
        )
    ],
       providers: [DespachoGateway, PedidoService]
})

export class DespachoModule {
}
