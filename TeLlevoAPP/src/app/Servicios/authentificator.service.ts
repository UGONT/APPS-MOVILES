import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificatorService {

  estado:boolean = false;
  constructor(private storage:StorageService) {
    this.storage.set("test", "FOKINUGO");
    const prueba = storage.get("test")
    console.log(prueba)
    
   }

  login(username:String,password:String):boolean{
    if(username=="ugo" && password =="1234"){
      this.estado = true
      return true
    }else{
      return false
    }
  }

  logout(){
    this.estado = false
  }

  isConnected():boolean{
    return this.estado;
  }
}
