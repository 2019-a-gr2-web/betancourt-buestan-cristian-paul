import {Controller, Delete, Get, HttpCode, Post, Put, Headers} from '@nestjs/common';
import { AppService } from './app.service';
import any = jasmine.any;

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

    @Get('/adivina')      //Método http
    adivina(@Headers() headers): string {
        console.log('Headers: ', headers);
        const numeroRandomico = Math.round(Math.random()*10);
        const numeroCabecera = Number(headers.numero);
        if (numeroCabecera == numeroRandomico){
            return 'ok';
        }else{
            return ':(';
        }

        /* nombre: string = 'Cristian';
        let edad = 21; //number
        let sueldo = 1.20; //number
        let casado = false; //boolean
        let hijos = null; //null
        let alas = undefined; //undefined*/

        return 'Hello world';
    }
}
const json = [
    {
        llave: 'valor',
        'nombre': "Cristian",
        "edad": 21,
        sueldo: 2.2,
        casado: false,
        hijos: null,
        mascotas: ["cachetas", 1, 1.25, false, null,
            {
                "nombre": "Cristian"
            }
        ]
    }
];

let objeto : any = {
    propiedad: 'valor',
    propiedadDos: 'valorDos'
};

objeto.propiedad;
objeto.propiedadDos;

// Agregar propiedades
objeto.propiedadTres = 'valorTres';
objeto['propiedadTres'] = 'valorTres';
delete objeto.propiedadTres; // destruir
objeto.propiedadTres = undefined; // destruir
















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