import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClienteEntity} from "./cliente.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ZapatoEntity} from "./zapato.entity";
import {ComprasEntity} from "./compras.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'default', // nombre de conx por defecto del typeorm
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'CRISTIAN',
            password: 'password',
            database: 'catalogo_zapatos',
            entities: [ClienteEntity, ZapatoEntity, ComprasEntity],
            synchronize: true,
            insecureAuth: true,
            dropSchema: true
        }),

        TypeOrmModule.forFeature(
            [
                ClienteEntity, ZapatoEntity, ComprasEntity
            ], 'default'
        )
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
