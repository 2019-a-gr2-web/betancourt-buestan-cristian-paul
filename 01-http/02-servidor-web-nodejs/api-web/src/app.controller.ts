import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Put,
    Headers,
    Query,
    Param,
    Body,
    Response,
    Request, Session, UseInterceptors, Render, UploadedFile, UploadedFiles, Res
} from '@nestjs/common';
import {AppService} from './app.service';
import * as Joi from '@hapi/joi';
import {isNullOrUndefined} from "util";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";


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
    arregloUsuarios = [];

    constructor(private readonly appService: AppService) {
    }

    @Get('subirArchivo/:idTrago')
    @Render('archivo')
    subirArchivo(
        @Param('idTrago') idTrago,
    ) {
        return {idTrago: idTrago}
    }

    @Post('subirArchivo/:idTrago')
    @UseInterceptors(FileInterceptor(
        'imagen',
        {
            dest: __dirname + '/../archivos'
        }
        )
    )
    subirArchivoPost(
        @Param('idTrago') idTrago,
        @UploadedFile() archivo
    ) {
        // console.log(archivo)
        return {mensaje: 'ok'}
    }

    @Get('descargarArchivo/:idTrago')
    descargarArchivo(
        @Response() res,
        @Param('idTrago') idTrago
    ) {
        const originalName = 'Penguins.jpg'
        const path = 'C:\\Users\\USRKAP\\Documents\\GitHub\\betancourt-buestan-cristian-paul\\01-http\\' +
            '02-servidor-web-nodejs\\api-web\\archivos\\a8e5c5de52bb16f7257b47f7f6dc9ac4'
        res.download(path, originalName)
    }

    ////////////////////////////SUBIR MULTIPLES ARCHIVOS A LA VEZ
    // }   @Post('subirArchivo/:idTrago')
    // @UseInterceptors(FilesInterceptor(
    //     'imagen',
    //     4,
    //     {
    //         dest: __dirname + '/../archivos'
    //     }
    //     )
    // )
    // subirArchivoPost(
    //     @Param('idTrago') idTrago,
    //     @UploadedFiles() archivo
    // ) {
    //     console.log(archivo)
    //     return {mensaje: 'ok'}
    // }

    @Get('/hello-world')      //Método http
    helloWorld() {
        return 'Hello world';
    }

    @Post('/hola-mundo')     //Método http
    @HttpCode(201)
    holaMundo() {
        return 'Hola mundo';
    }

    @Put('/salut-monde')     //Método http
    @HttpCode(202)
    salutMonde() {
        return 'Salut monde';
    }

    @Delete('/ciao-mondo')     //Método http
    @HttpCode(203)
    ciaoMondo() {
        return 'Ciao mondo';
    }

    @Get('/adivina')      //Método http
    adivina(@Headers() headers): string {
        console.log('Headers: ', headers);
        const numeroRandomico = Math.round(Math.random() * 10);
        const numeroCabecera = Number(headers.numero);
        if (numeroCabecera == numeroRandomico) {
            return 'ok';
        } else {
            return ':(';
        }
    }

    @Get('/consultar')
    consultar(@Query() queryParams) {
        console.log(queryParams);
        if (queryParams.nombre) {
            return `Hola ${queryParams.nombre}`;
        } else {
            return 'Hola extraño';
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta) {
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
    registroComida(@Body() parametrosCuerpo, @Response() respuesta) {
        //Al utilizar @Response no se utilizan los returns
        //console.log(parametrosCuerpo);
        //console.log(request.body); @Request
        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                respuesta.set('premio', 'Guatita');
            }
            return respuesta.send({mensaje: 'Registro creado'});
            //return 'Registro creado';
        } else {
            return respuesta.status(400).send({mensaje: 'ERROR. no envía nombre y cantidad', error: 400});
            //return 'ERROR. no envía nombre y cantidad';
        }
    }

    @Get('semilla')
    semilla(@Request() peticion, @Response() respuesta) {
        console.log(peticion.cookies);
        const cookies = peticion.cookies;
        const esquemaValidacionNumero = Joi.object().keys({
            numero: Joi.number().integer().required()
        });

        const objetoValidacion = {numero: cookies.numero};
        const resultado = Joi.validate(objetoValidacion, esquemaValidacionNumero);

        if (resultado.error) {
            console.log('Resultado: ', resultado)
        } else {
            console.log('Numero valido');
        }

        const cookieSegura = peticion.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura');
        } else {
            console.log('Cookie insegura, no es valida')
        }

        if (cookies.micookie) {
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
        } else {
            respuesta.send(':(');
        }
    }

    @Get('usuario')
    obtenerUsuario(@Request() peticion, @Response() respuesta) {
        const nombreUsuario = peticion.cookies.usuario;
        const resultado = Math.round(Math.random() % 100);
        console.log(nombreUsuario);
        if (nombreUsuario) {
            respuesta.send(
                {
                    nombreUsuario: `${nombreUsuario}`,
                    resultado: `${resultado}`
                });
        } else {
            respuesta.send(
                {
                    error: 'Usuario no definido'
                });
        }
    }

    @Get('inicio')
    inicio(@Response() respuesta) {
        return respuesta.render('inicio', {
            estaVivo: true
        });
    }

    @Get('peliculas')
    peliculas(@Response() respuesta) {
        return respuesta.render('peliculas/inicio',
            {});
    }

    @Get('estilos')
    prueba(@Response() respuesta) {
        return respuesta.render('peliculas/estilos',
            {});
    }

    @Get('cinecalidad')
    cinecalidad(@Response() respuesta) {
        return respuesta.render('copia/cinecalidad',
            {});
    }

    @Get('login')
    loginVista(@Response() res) {
        res.render('login', {});
    }

    @Post('login')
    login(@Response() res, @Body() usuario, @Session() session) {
        if (usuario.username == 'Cristian' && usuario.password == '12345678') {
            session.username = usuario.username;
            session.password = usuario.password;
            res.redirect('/api/protegida');
        } else {
            res.status(400);
            res.send({mensaje: 'Error login', error: 400});
        }
    }

    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ) {
        console.log(session);
        return 'ok';
    }

    @Get('protegida')
    protegida(
        @Session() session,
        @Response() res
    ) {
        if (session.username) { //si es que existe la sesion significa que estamos logeados
            res.render('protegida', {nombre: session.username});
        } else {
            res.redirect('login');
        }
    }

    @Get('logout')
    logout(
        @Response() res,
        @Session() session,
    ) {
        session.username = undefined;
        session.destroy();
        res.redirect('/api/login');
    }
}

function holaMundo() {
    console.log('Hola mundo');
}

const respuestaHolaMundo = holaMundo(); //undeffined

function suma(a: number, b: number): number {
    return a + b;
}

const respuestaSuma = suma(1, 2);
console.log('Respuesta suma:', respuestaSuma);

//Condicionales: truty falsy
if ({}) {
    console.log('Verdadero');
} else {
    console.log('Falso');
}

//Operadores de arreglos en JS
//const arregloNumeros = [1,'A', true,null,{},[]];
const arregloNumeros = [1, 2, 3, 4, 5, 6];
//!)Imprimir en cosnola todos los elementos
const rForEach = arregloNumeros.forEach(
    valorActual =>
        console.log(`Valor: ${valorActual}`)
);
console.log("Respuesta forEach: ", rForEach);
//2) Sumar 2 a los pares y 1 a los impares
const arregloNumerosMap = [1, 2, 3, 4, 5, 6];
const rMap = arregloNumerosMap.map(
    valorActual => {
        const esPar = valorActual % 2;
        if (esPar) {
            return valorActual + 2;
        } else {
            return valorActual + 1;
        }
    });
console.log("Respuesta map: ", rMap);

//3) Encuanten si hay el numero 4
const rFind = arregloNumeros.find(
    valorActual => valorActual == 10
);
console.log("Respuesta find: ", rFind);
//4) Filtrar los numeros menores a 5
const arregloNumerosFilter = [1, 2, 3, 4, 5, 6];
const rFilter = arregloNumerosFilter.filter(
    valorActual => valorActual < 5
);
console.log("Respuesta filter: ", rFilter);

//5) Verificar si todos los elementos cumplen
const arregloNumerosEvery = [1, 2, 3, 4, 5, 6];
const respuestaEvery = arregloNumerosEvery.every(
    //si todos cumplen TRUE
    //si alguno no cumple FALSE
    //AND
    valorActual => valorActual > 0
);
console.log("Respuesta every: ", respuestaEvery);

//6) Verificar si algún elemento cumple
const arregloNumerosSome = [1, 2, 3, 4, 5, 6];
const respuestaSome = arregloNumerosSome.some(
    //si alguno cumplen TRUE
    //si todos no cumplem FALSE
    //OR
    valorActual => valorActual > 6
);
console.log("Respuesta some: ", respuestaSome);

//7) Reduce
const arregloNumerosReduce = [1, 2, 3, 4, 5, 6];
const valorInicioCalculo = 0;
const respuestaReduce = arregloNumerosReduce.reduce(
    (valorAcumulado, valorActual) => {
        return valorAcumulado + valorActual;
    }, valorInicioCalculo
);
console.log("Respuesta reduce: ", respuestaReduce);

// Si el numero es menor a 4
// 10%+5
// 15%+3
const valorInicioCalculo2 = 0;
const respuestaReduce2 = arregloNumerosReduce
    .map(
        valorActual => {
            if (valorActual < 4) {
                return (valorActual * 1.1) + 5
            } else {
                return (valorActual * 1.15) + 3
            }
        })
    .reduce(
        (valorAcumulado, valorActual) => {
            return valorAcumulado + valorActual;
        }, valorInicioCalculo2
    );
console.log("Respuesta reduce2: ", respuestaReduce2);

//

//5) Todos los valores positivos
//6) Sumar todos los valores
//7) Sumar todos los

//8) Restar todos los valores de 100
const arregloNumerosReduce3 = [1, 2, 3, 4, 5, 6];
const valorInicioCalculo3 = 100;
const respuestaReduce3 = arregloNumerosReduce3.reduce(
    (valorAcumulado, valorActual) => {
        return valorAcumulado - valorActual;
    }, valorInicioCalculo3
);
console.log("Respuesta reduce3: ", respuestaReduce3);

//1.1) Sumen 10 a todos
//1.2) Filtren los mayores a 15
//1.3)) Si hay algun numero mayor a 30
const arregloEjercicio = [1, 2, 3, 4, 5, 6];
const respuestaEjercicio = arregloEjercicio
    .map(valorActual => valorActual + 10)
    .filter(valorActual => valorActual > 15)
    .some(valorActual => valorActual > 30);
console.log("Respuesta ejercicio: ", respuestaEjercicio);


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
