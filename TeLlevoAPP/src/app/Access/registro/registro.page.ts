import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthentificatorService } from 'src/app/Servicios/authentificator.service';
import { StorageService } from 'src/app/Servicios/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  username="";
  mensaje = "";
  barra = false;
  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth:AuthentificatorService,
    private storage:StorageService
  ) {
    this.formularioRegistro = this.fb.group({

      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      correo: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
      ]),
      confirmacionPassword: new FormControl('', Validators.required)

    }, );
  }

  passwordIguales(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmarPassword = group.get('confirmacionPassword')?.value;
    return password == confirmarPassword ? null : { notMatching: true };
  }

  
  cambiarBarra() {
    this.barra = !this.barra;
  }

  enviarFormulario(){

    if(this.formularioRegistro.valid){
      /* BIEN */
      this.mensaje = 'Registro exitoso!';
      const formDatos = this.formularioRegistro.value;
      

      this.username = this.formularioRegistro.value.usuario;
      this.storage.set(this.username,formDatos)
      this.username = this.formularioRegistro.value.usuario;
      
      const test = this.storage.get("hugo")
      console.log("EL usuario es: ", test)

      this.cambiarBarra();
      setTimeout(() => {
        this.router.navigate(['/home'],);
        this.mensaje = "";
        this.cambiarBarra();
      }, 2000);
    }else{
      /* MAL */
      console.log("MAL")
    }

  }

  ngOnInit() {
  }

}
