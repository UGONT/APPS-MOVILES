import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}

  user={
    "username":"",
    "pass":""
  }

  Validar(){
    if(this.user.username.length!=0){
      if(this.user.pass.length!=0){
        //funciona
        console.log('Usuario', this.user.username);
      }
    }
  }
  
}
