import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificatorService {

  estado:boolean = false;
  constructor() { }

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
