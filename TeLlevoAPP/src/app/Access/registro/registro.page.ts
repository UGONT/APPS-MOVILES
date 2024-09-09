import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  spinner = false;
  constructor(private router:Router) {}

  user={
    "correo":"",
    "pass":""
  }
  cambiarSpinner(){
    this.spinner = !this.spinner;
  }
  Validar(){
    if(this.user.correo.length!=0){
      if(this.user.pass.length!=0){
        //funciona
        console.log('Correo', this.user.correo);
        this.cambiarSpinner();
        
      }
    }
  }

  ngOnInit() {
  }

}
