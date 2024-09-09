import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

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
    "usuario":"",
    "pass":"",
    "pass2":""
  }
  mensaje = "";
  cambiarSpinner(){
    this.spinner = !this.spinner;
  }
  validar(){

    if(this.user.usuario.length!=0){
      if(this.user.correo.length!=0){
        if(this.user.pass.length!=0){
          if(this.user.pass2 != this.user.pass){
            console.log('Usuario', this.user.usuario);
            this.mensaje = 'Registro exitoso';
            let navigationExtras: NavigationExtras = {
              state: {
                username: this.user.usuario,
                correo: this.user.correo,
                password: this.user.pass,
              },
            };
            setTimeout(() => {
              this.router.navigate(['/principal'], navigationExtras);
              this.mensaje = "";
            }, 2000);
          }else{
            this.mensaje="Contraseñas no coinciden"
          }
        }else{
          this.mensaje="Contraseña vacia";
        }
      }else{
        this.mensaje="Correo vacio";
      }
    }else{
      this.mensaje="Usuario vacio";
    }
  }

  ngOnInit() {
  }

}
