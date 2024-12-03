import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthentificatorService } from 'src/app/Servicios/authentificator.service';
import { StorageService } from 'src/app/Servicios/storage.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';


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
    private storage: StorageService,
    private usuarioService: UsuarioService
  ) { }

  user = {
    "usuario": "",
    "pass": ""
  }
  cambiarBarra() {
    this.barra = !this.barra;
  }
  async validar() {
    /* hugo hugo123# */
    /* this.user.usuario  this.user.pass*/
    if (await this.auth.loginBDD(this.user.usuario, this.user.pass)) {
      this.mensaje = 'Inicio exitoso';
      this.usuarioService.setNombreUsuario(this.user.usuario);
      
      this.cambiarBarra();
      setTimeout(() => {
        this.router.navigate(['/tabs'],);
        this.mensaje = "";
        this.cambiarBarra();
      },2600, 1);

    } else {
      this.mensaje = "Credenciales incorrectas.";
    }
  }

  async eliminarTodosLosUsuarios() {
    try {
      await this.storage.clear();
      console.log('Todos los usuarios han sido eliminados');
    } catch (error) {
      console.log('Error al eliminar todos los usuarios', error);
    }
  }

  ngOnInit() {
  }

}
