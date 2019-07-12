import {WebSocketGateway, WebSocketServer, SubscribeMessage} from '@nestjs/websockets'
import {Client} from "socket.io";

// ws://localhost:3001/websockets
@WebSocketGateway(
    3001,   //puerto
    {
        namespace: '/websockets' //url
    }
)
export class JuegoGateway {
    elementos = ["piedra", "papel", "tijera"];
    secuencia = [0, 2, 1, 1, 2, 1, 1, 0, 0, 1, 2, 1, 0, 2, 0, 1, 2]
    seleccionado = 0
    primeraRespuesta = true

    @WebSocketServer() server;

    constructor() {
        console.log(this.server)
    }

    @SubscribeMessage('preparado')
    preparacion(client: Client | any, data: any) {
        client.emit('preparacion', {})
        console.log(client.id)
        client.broadcast.emit('preparacion', {})
    }

    @SubscribeMessage('comenzar')
    comenzar(client: Client | any, data: any) {
        const elemento = this.elementos[this.secuencia[this.seleccionado]]
        console.log(elemento)
        client.emit('elemento',
            {
                url: "http://192.168.0.102:3000/websockets/images/" + elemento + ".png",
                elemento: elemento
            }
        )
    }

    @SubscribeMessage('respuesta')
    validarRespuesta(client: Client | any, data: any) {
        var respuesta = "Perdiste"
        switch (this.secuencia[this.seleccionado]) {
            case 0:
                if (data.respuesta == 1) {
                    respuesta = "Ganaste"
                }
                break
            case 1:
                if (data.respuesta == 2) {
                    respuesta = "Ganaste"
                }
                break
            case 2:
                if (data.respuesta == 0) {
                    respuesta = "Ganaste"
                }
                break
        }
        if (this.primeraRespuesta) {
            this.primeraRespuesta = false
            this.enviarResultado(client, respuesta)

        } else {
            this.primeraRespuesta = true
            this.seleccionado++
        }
    }

    enviarResultado(client: Client | any, resultado: string) {
        client.emit('resultado',
            {
                resultado: resultado
            }
        )
        client.broadcast.emit('resultado', {
                resultado: "Perdiste"
            }
        )
        this.seleccionado++
    }

    @SubscribeMessage('prueba')
    prueba(client
               :
               Client | any, data
               :
               any
    ) {
        client.emit('prueba', {hola: 'hola'})
        client.broadcast.emit('prueba', {hola: 'hola todos'})
    }
}