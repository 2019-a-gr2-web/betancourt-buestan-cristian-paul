import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    helloWorld(): string;
    holaMundo(): string;
    salutMonde(): string;
    ciaoMondo(): string;
}
