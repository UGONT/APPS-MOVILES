import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
  
  private nombreUsuario: string = '';

  private correoUsuario: string='';

  setNombreUsuario(nombre: string) {
    this.nombreUsuario = nombre;
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  setCorreoUsuario(correo: string) {
    this.correoUsuario = correo;
  }
  getCorreoUsuario(): string {
    return this.correoUsuario;
  }
}
