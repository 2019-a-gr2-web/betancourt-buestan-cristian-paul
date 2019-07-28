import {Controller, Get, Response, Post, Request, Body, Res, Query} from "@nestjs/common";
import {TragosService} from "./tragos.services";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";import {TragosEntity} from "./tragos.entity";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {
    }


    @Get('lista')
    async listarTragos(@Response() res) {
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {arregloTragos: arregloTragos})
    }

    @Get('crear')
    crearTrago(@Response() res, @Query('mensaje') mensaje: string) {
        res.render('tragos/crear-editar', {mensaje: mensaje});
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago: Trago,
        @Response() res
        // @Body('nombre') nombre: string,
        // @Body('tipo') tipo: string,
        // @Body('gradosAlcohol') gradosAlcohol: number,
        // @Body('fechaCaducidad') fechaCaducidad: Date,
        // @Body('precio') precio: number,
    ) {
        // console.log('Trago: ', trago, typeof trago);
        // console.log('nombre: ', nombre , typeof nombre);
        // console.log('tipo: ', tipo, typeof tipo);
        // console.log('gradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('fechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('precio: ', precio, typeof precio);
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;

        let tragoAValidar = new TragosCreateDto();
        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {
            const errores = await validate(tragoAValidar);
            if (errores.length > 0) {
                console.error(errores)
                res.status(400)
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario&campos=nombre,apellido,fecha,precio')
            } else {
                const respuestaCrear = await this._tragosService.crear(trago);
                console.log('RESPUESTA: ', respuestaCrear);
                res.redirect('/api/traguito/lista');
            }
        } catch (e) {
            console.log('Error: ', e)
            res.status(500).send({mensaje: 'Error, code 500'})
        }
    }

    @Post('eliminar')
    eliminarTrago(@Res() res,
                  @Body('id') id: number) {
        //this._tragosService.eliminar(id);
        res.redirect('/api/traguito/lista');
    }
}
