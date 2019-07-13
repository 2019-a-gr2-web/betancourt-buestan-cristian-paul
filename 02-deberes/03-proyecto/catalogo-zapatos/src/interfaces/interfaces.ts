export interface Cliente {
    codigoCli: number;
    cedula: string;
    nombre: string;
    apellido: string;
}

export interface Compras {
    codigoCom: number
    comZapId: Zapato
    comCliId: Cliente
    fecha: Date
    cantidad: number
    total: number
    validez: boolean
}

export interface Zapato {
    codigoZap: number
    marca: string
    color: string
    talla: number
    tipo: string
    cantidad: number
    precio: number
}