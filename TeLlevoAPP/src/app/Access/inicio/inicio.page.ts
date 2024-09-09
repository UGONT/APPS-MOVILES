import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  spinner = false;
  constructor(private router:Router) {}

  user={
    "username":"",
    "pass":""
  }
  cambiarSpinner(){
    this.spinner = !this.spinner;
  }
  Validar(){
    if(this.user.username.length!=0){
      if(this.user.pass.length!=0){
        //funciona
        console.log('Usuario', this.user.username);
        this.cambiarSpinner();
        
      }
    }
  }
  ngOnInit() {
  }

}
