import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificatorService {

  
  estado: boolean;
  constructor(private storage: StorageService) {
    this.estado = false;
  }

  loginBDD(user: string, pass: string): boolean{
    this.storage.get(user).then((val) => {
      if(val.password == pass) {
        console.log('Usuario encontrado');
        this.estado = true;
      }else {
        console.log('error pass');
      }
    }).catch((error) => {
      console.log('Error credenciales')
      this.estado = false;
    });
    if (this.estado){
      return true;
    }else {
      return false;
    }
  }







  /* login(username: String, password: String): boolean {
    if (username == "ugo" && password == "1234") {
      this.estado = true
      return true
    } else {
      return false
    }
  } */

  logout() {
    this.estado = false
  }

  isConnected() {
    return this.estado;
  }
}
