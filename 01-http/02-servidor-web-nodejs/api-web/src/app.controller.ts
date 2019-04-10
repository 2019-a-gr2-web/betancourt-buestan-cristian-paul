import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
/* @[nombre] nombre del decorador y pueden utilizarse antes de instanciar clases, atributos,
 métodos y/o constructores.
 Un decorador es una función que se ejecuta antes de crearse la clase.
 Pueden ser utilizados en clases, atributos, parámetros y/o métodos*/
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()      //Método http
    getHello(): string {
        return this.appService.getHello();
    }

    @Post()     //Método http
    postHello(){
        return 'Hola mundo';
    }
}

/*
class usuario{


    atributoPublico;
    private atributoPrivado;
    private atributoProtegido;

    constructor(atributoPublico, atributoPrivado, atributoProtegido) {
        this.atributoPublico = atributoPublico;
        this.atributoPrivado = atributoPrivado;
        this.atributoProtegido = atributoProtegido;
    }

    public metodoPublico(){}
    private metodoPrivado(){}
    protected metodoProtegido(){}
}
*/