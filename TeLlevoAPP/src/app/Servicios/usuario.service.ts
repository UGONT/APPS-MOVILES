import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
  
  private nombreUsuario: string = '';

  setNombreUsuario(nombre: string) {
    this.nombreUsuario = nombre;
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }
}
