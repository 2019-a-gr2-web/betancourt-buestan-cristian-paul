export interface Trago {
    id?: number;
    nombre: string;
    tipo: 'Ron' | 'Vodka' | 'Whiskey' | 'Tequila' | 'Puntas' | 'Cerveza';
    gradosAlcohol: number;
    fechaCaducidad: Date;
    precio: number;

}