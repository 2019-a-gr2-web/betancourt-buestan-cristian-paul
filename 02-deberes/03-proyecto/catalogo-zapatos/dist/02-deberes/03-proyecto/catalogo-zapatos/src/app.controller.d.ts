import { AppService } from './app.service';
import { Cliente, Compras, Zapato } from "./interfaces/interfaces";
export declare class AppController {
    private readonly __appService;
    constructor(__appService: AppService);
    listaClientes(res: any): Promise<void>;
    crearCliente(res: any): void;
    insertarCliente(cliente: Cliente, res: any): Promise<void>;
    actualizarCliente(res: any, par: any): Promise<void>;
    ejecutarCambioCliente(metodo: any, res: any, codigoCli: string, nombre?: string, apellido?: string, cedula?: string): Promise<void>;
    listaCompras(res: any): Promise<void>;
    crearCompra(res: any): Promise<void>;
    insertarCompra(res: any, compra: Compras): Promise<void>;
    listaZapatos(res: any): Promise<void>;
    crearZapato(res: any): void;
    insertarZapato(zapato: Zapato, res: any): Promise<void>;
    actualizarZapato(par: any, res: any): Promise<void>;
    ejecutarCambioZapato(metodo: any, res: any, codigoZap: string, talla?: string, tipo?: string, color?: string, precio?: string, cantidad?: string, marca?: string): Promise<void>;
    inicio(res: any): void;
    cookieValida(res: any, usuario: string): void;
}
