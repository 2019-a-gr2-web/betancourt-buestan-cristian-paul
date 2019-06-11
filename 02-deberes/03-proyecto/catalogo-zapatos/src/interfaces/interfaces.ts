export interface Cliente {
    codigoCli: number;
    cedula: string;
    nombre: string;
    apellido: string;
}

export interface Compra {
    codigoCom?: number
    codigoZap: string
    codigoCli: number
    fecha: Date
    cantidad: number
    total: boolean
    validez: boolean
}

export interface Zapato {
    codigoZap?: number;
    marca: string
    color: string
    talla: number
    tipo: string
    cantidad: number
    precio: number
}