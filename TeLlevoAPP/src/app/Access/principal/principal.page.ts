import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { AuthentificatorService } from 'src/app/Servicios/authentificator.service';

import { addIcons } from 'ionicons';
import {  } from 'ionicons/icons';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  animations: [
    trigger('pulse', [
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate('200ms ease-in', style({ transform: 'scale(1.2)' })),
        animate('200ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})

export class PrincipalPage implements OnInit {

  nombreUsuario = '';
  taAnimao = false;

  constructor(
    private router: Router,
    private auth : AuthentificatorService,
    private usuarioService: UsuarioService
  ) {

  }
  //accion al cargar la pagina 
  ngOnInit() {
    this.nombreUsuario = this.usuarioService.getNombreUsuario();
  }
  //Accion una vez cargo la pagina
  ngAfterContentInit(){

  }
  
  animacionBtn() {
    this.taAnimao = true;
    setTimeout(() => {
      this.taAnimao = false;
    }, 400); // Duracion total de la animacion (200ms + 200ms)
    this.router.navigate(['/tabs/mapa']); 
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

}
