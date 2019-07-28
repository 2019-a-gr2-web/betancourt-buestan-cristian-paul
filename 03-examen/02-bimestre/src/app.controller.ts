import {Body, Controller, Get, Post, Response, Request, Res} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('login')
    login(@Response() res) {
        res.render('login')
    }

    @Get('cerrar')
    cerrarSesion(@Request()
                     req, @Response()
                     res
    ) {
        res.clearCookie('usuario');
        res.redirect('/api/login');
    }

    @Post('usuario')
    usuario(@Body('tipoUsuario')
                tipoUsuario: string, @Response()
                res, @Body('nombreUsuario')
                nombreUsuario: string
    ) {
        res.clearCookie('usuario')
        console.log(`${tipoUsuario}`)
        res.cookie(
            'tipoUsuario',      //nombre
            tipoUsuario,               //valor
            {                                   //opciones
                signed: true
            })

        if (tipoUsuario == 'administrador') {
            res.redirect('/paciente/lista')
        } else if (tipoUsuario == 'usuario') {
            res.redirect('/pedido/validarUsuario?nombre=' + `${nombreUsuario}`)
        } else if (tipoUsuario == 'despachador') {
            res.redirect('/websockets/despachadorPedidos.html')
        } else {

        }
    }
}
