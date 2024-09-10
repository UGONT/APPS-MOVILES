import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  barra = false;
  constructor(private router:Router) {}

  user={
    "correo":"",
    "usuario":"",
    "pass":"",
    "pass2":""
  }
  mensaje = "";
  cambiarBarra(){
    this.barra = !this.barra;
  }
  validar(){

    if(this.user.usuario.length!=0){
      if(this.user.correo.length!=0){
        if(this.user.pass.length!=0){
          if(this.user.pass2 == this.user.pass){
            this.mensaje = 'Registro exitoso';
            let navigationExtras: NavigationExtras = {
              state: {
                usuario: this.user.usuario,
                correo: this.user.correo,
                pass: this.user.pass,
              },
            };
            this.cambiarBarra();
            setTimeout(() => {
              this.router.navigate(['/principal'], navigationExtras);
              this.mensaje = "";
              this.cambiarBarra();
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
