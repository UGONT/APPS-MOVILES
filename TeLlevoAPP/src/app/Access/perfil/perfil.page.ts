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
  nombreCompleto = 'Luis Rodríguez';
  correo = '';
  telefono = '+56912345678';
  tieneVehiculo = false;
  marcaVehiculo = '';
  matricula = '';
  editandoDatos = false;

  constructor(
    private router: Router,
    private auth: AuthentificatorService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.nombreUsuario = this.usuarioService.getNombreUsuario();
    this.correo = this.usuarioService.getCorreoUsuario();
  }

  toggleEdicion() {
    this.editandoDatos = !this.editandoDatos;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
