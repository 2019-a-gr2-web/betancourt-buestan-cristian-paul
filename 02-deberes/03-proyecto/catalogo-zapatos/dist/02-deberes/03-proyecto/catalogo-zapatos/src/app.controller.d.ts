import { AppService } from './app.service';
import { Cliente, Zapato } from "./interfaces/interfaces";
export declare class AppController {
    private readonly __appService;
    constructor(__appService: AppService);
    login(res: any): void;
    usuario(usuario: String, res: any): void;
    listaClientes(res: any): void;
    crearCliente(res: any): void;
    insertarCliente(cliente: Cliente, res: any): void;
    eliminarCliente(res: any, cliente: Cliente): void;
    actualizarCliente(res: any, par: any): void;
    listaCompras(res: any): void;
    crearCompra(res: any): void;
    listaZapatos(res: any): void;
    crearZapato(res: any): void;
    insertarZapato(zapato: Zapato, res: any): void;
    inicio(res: any): void;
    cookieValida(res: any, usuario: string): void;
}
