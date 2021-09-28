export class Student {
    name: string;
    codigo: number;
    img: string;
    cedula: number;
    edad: number;
    direccion: string;
    tel: number;

    constructor(name: string, codigo:number,  img: string, cedula: number, edad: number, direccion: string, tel: number){
        this.name = name;
        this.codigo = codigo;
        this.img = img;
        this.cedula = cedula;
        this.edad = edad;
        this.direccion = direccion;
        this.tel = tel;
    }
}