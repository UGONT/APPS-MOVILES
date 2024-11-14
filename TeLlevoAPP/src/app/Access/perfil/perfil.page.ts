import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificatorService } from 'src/app/Servicios/authentificator.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombreUsuario = '';
  constructor(
    private router: Router,
    private auth : AuthentificatorService,
    private usuarioService: UsuarioService

  ) { 
    
  }

  ngOnInit() {
    this.nombreUsuario = this.usuarioService.getNombreUsuario();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
