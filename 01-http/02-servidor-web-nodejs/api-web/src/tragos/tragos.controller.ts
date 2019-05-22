import {Controller, Get, Response, Post, Request, Body, Res} from "@nestjs/common";
import {TragosService} from "./tragos.services";
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {
    }

    @Get('lista')
    listarTragos(@Response() res) {
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos', {arregloTragos: arregloTragos})
    }

    @Get('crear')
    crearTrago(@Response() res) {
        res.render('tragos/crear-editar');
    }

    @Post('crear')
    crearTragoPost(
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
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista');
        console.log(trago);
    }

    @Post('eliminar')
    eliminarTrago(@Res() res,
        @Body('id') id: number) {
        this._tragosService.eliminar(id);
        res.redirect('/api/traguito/lista');
    }
}