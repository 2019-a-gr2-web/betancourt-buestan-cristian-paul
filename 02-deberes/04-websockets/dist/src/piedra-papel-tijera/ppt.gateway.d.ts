import { AppService } from './app.service';
export declare class PptGateway {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
