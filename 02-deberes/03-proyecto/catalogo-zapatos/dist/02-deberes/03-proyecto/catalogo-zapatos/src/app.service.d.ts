import { TragosEntity } from "../../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/tragos.entity";
import { Repository } from "typeorm";
export declare class AppService {
    private readonly _tragosRepository;
    constructor(_tragosRepository: Repository<TragosEntity>);
    getHello(): string;
}
