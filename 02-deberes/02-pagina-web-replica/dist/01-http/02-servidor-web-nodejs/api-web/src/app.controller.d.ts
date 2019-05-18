import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    helloWorld(): string;
    holaMundo(): string;
    salutMonde(): string;
    ciaoMondo(): string;
    adivina(headers: any): string;
    consultar(queryParams: any): string;
    ciudad(parametrosRuta: any): "Que fueff" | "Que mashhh ñañoshh" | "Buenas tardes";
    registroComida(parametrosCuerpo: any, respuesta: any): any;
    semilla(peticion: any, respuesta: any): void;
    obtenerUsuario(peticion: any, respuesta: any): void;
    inicio(respuesta: any): any;
    peliculas(respuesta: any): any;
    prueba(respuesta: any): any;
}
