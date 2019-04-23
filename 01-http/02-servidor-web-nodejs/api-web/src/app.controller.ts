import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body,Response, Request} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';


// http://192.168.1.10:3000/segmentoInicial
// http://192.168.1.10:3000/segmentoInicial
// http://192.168.1.10:3000/segmentoInicial

@Controller('/api')
// Segemento inicial 'api'
/* @[nombre] nombre del decorador y pueden utilizarse antes de instanciar clases, atributos,
 métodos y/o constructores.
 Un decorador es una función que se ejecuta antes de crearse la clase.
 Pueden ser utilizados en clases, atributos, parámetros y/o métodos*/

/*
Segmento inicial: api
1) Segmento Acción: GET ->'hello-world' -> 'Hello world'
2) Segmento Acción: POST ->'hello-world' -> 'Hola mundo'
3) Segmento Acción: PUT ->'...' -> '...'
4) Segmento Acción: DELETE ->'...' -> '...'
*/

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
    }

    @Get('/consultar')
    consultar(@Query() queryParams){
        console.log(queryParams);
        if(queryParams.nombre){
            return `Hola ${queryParams.nombre}`;
        }else{
            return 'Hola extraño';
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta){
      switch (parametrosRuta.idCiudad.toLowerCase()) {
          case 'quito':
              return 'Que fueff';
          case 'guayaquil':
              return 'Que mashhh ñañoshh';
          default:
              return 'Buenas tardes';
      }
    }

    @Post('registroComida')
    registroComida(@Body() parametrosCuerpo, @Response() respuesta){
        //Al utilizar @Response no se utilizan los returns
        //console.log(parametrosCuerpo);
        //console.log(request.body); @Request
        if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
            const cantidad = Number(parametrosCuerpo.cantidad);
            if(cantidad>1) {
                respuesta.set('premio', 'Guatita');
            }
                return respuesta.send({mensaje:'Registro creado'});
                //return 'Registro creado';
        }else{
            return respuesta.status(400).send({mensaje:'ERROR. no envía nombre y cantidad', error: 400});
            //return 'ERROR. no envía nombre y cantidad';
        }
    }

    @Get('semilla')
    semilla(@Request() peticion, @Response() respuesta){
        console.log(peticion.cookies);
        const cookies = peticion.cookies;
        const esquemaValidacionNumero = Joi.object().keys({
          numero: Joi.number().integer().required()
        });

        const objetoValidacion = {numero: cookies.numero};
        const resultado = Joi.validate(objetoValidacion,esquemaValidacionNumero);

        if(resultado.error){
            console.log('Resultado: ', resultado)
        }else{
            console.log('Numero valido');
        }

        const cookieSegura= peticion.signedCookies.fechaServidor;
        if (cookieSegura){
            console.log('Cookie segura');
        }else{
            console.log('Cookie insegura, no es valida')
        }

        if(cookies.micookie) {
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            respuesta.cookie('fechaServidor',       //nombre
                new Date().getTime(),               //valor
                {                                   //opciones
                    //expires: horaFechaServidor.setMinutes(minutos+1)
                    signed: true
                }
                );
            respuesta.send('ok');
        }else{
            respuesta.send(':(');
        }

    }
}

/*const json = [
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
*/

        /*nombre: string = 'Cristian';
        let edad = 21; //number
        let sueldo = 1.20; //number
        let casado = false; //boolean
        let hijos = null; //null
        let alas = undefined; //undefined*/

/*class usuario{


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
}*/
