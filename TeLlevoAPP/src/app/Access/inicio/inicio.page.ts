import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthentificatorService } from 'src/app/Servicios/authentificator.service';
import { StorageService } from 'src/app/Servicios/storage.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  barra = false;
  mensaje = "";
  constructor(
    private router: Router,
    private auth: AuthentificatorService,
    private storage: StorageService
  ) { }

  user = {
    "usuario": "",
    "pass": ""
  }
  cambiarBarra() {
    this.barra = !this.barra;
  }
  validar() {
    if (this.auth.loginBDD(this.user.usuario, this.user.pass)) {
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



    } else {
      this.mensaje = "Credenciales incorrectas.";
    }
  }
  
  ngOnInit() {
  }

}
