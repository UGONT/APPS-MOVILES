import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  barra = false;
  mensaje = "";
  constructor(private router:Router) {}

  user={
    "usuario":"",
    "pass":""
  }
  cambiarBarra(){
    this.barra = !this.barra;
  }
  validar(){
    if(this.user.usuario.length!=0){
      if(this.user.pass.length!=0){
        
        this.mensaje = 'Inicio exitoso';
            let navigationExtras: NavigationExtras = {
              state: {
                usuario: this.user.usuario,
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
        this.mensaje = "Contraseña vacia";
      }
    }else{
      this.mensaje = "Usuario vacio";
    }
  }
  ngOnInit() {
  }

}
