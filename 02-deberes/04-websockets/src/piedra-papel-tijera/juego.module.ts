import {Module} from "@nestjs/common";
import {JuegoGateway} from "./juego.gateway";

@Module({
  providers: [JuegoGateway]
})

export class JuegoModule {
}