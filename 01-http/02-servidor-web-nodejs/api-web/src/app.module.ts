import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";
import {FiestaModule} from "./fiesta/fiesta.module";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";

@Module({
    imports: [FiestaModule, DistribuidorModule, TragosModule,
        TypeOrmModule.forRoot({
            name: 'default', // nombre de conx por defecto del typeorm
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'test',
            entities: [TragosEntity, DistribuidorEntity, FiestaEntity],
            synchronize: true,
            insecureAuth: true
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
