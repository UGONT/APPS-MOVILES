import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario = '';
  constructor(private router: Router) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      usuario: '';
      correo: '';
      pass: '';
    };
    this.usuario = state.usuario;
  }
  //accion al cargar la pagina 
  ngOnInit() {
    
  }
  //Accion una vez cargo la pagina
  ngAfterContentInit(){

  }
  
}
