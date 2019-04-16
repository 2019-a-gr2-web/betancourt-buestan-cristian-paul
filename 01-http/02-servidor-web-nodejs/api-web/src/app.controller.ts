import {Controller, Delete, Get, HttpCode, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';

// http://192.168.1.10:3000/segmentoInicial
// http://192.168.1.10:3000/segmentoInicial
// http://192.168.1.10:3000/segmentoInicial

@Controller('/api')
// Segemento inicial 'api'
/* @[nombre] nombre del decorador y pueden utilizarse antes de instanciar clases, atributos,
 métodos y/o constructores.
 Un decorador es una función que se ejecuta antes de crearse la clase.
 Pueden ser utilizados en clases, atributos, parámetros y/o métodos*/
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/hello-world')      //Método http
    helloWorld() {
        return 'Hello world';
    }

    @Post('/hola-mundo')     //Método http
    @HttpCode(201)
    holaMundo(){
        return 'Hola mundo';
    }

    @Put('/salut-monde')     //Método http
    @HttpCode(202)
    salutMonde(){
        return 'Salut monde';
    }

    @Delete('/ciao-mondo')     //Método http
    @HttpCode(203)
    ciaoMondo(){
        return 'Ciao mondo';
    }

    /*
    Segmento inicial: api
    1) Segmento Acción: GET ->'hello-world' -> 'Hello world'
    2) Segmento Acción: POST ->'hello-world' -> 'Hola mundo'
    3) Segmento Acción: PUT ->'...' -> '...'
    4) Segmento Acción: DELETE ->'...' -> '...'
    ¨
     */
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