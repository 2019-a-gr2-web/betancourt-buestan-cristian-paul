import { AppService } from './app.service';
export declare class JuegoGateway {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
