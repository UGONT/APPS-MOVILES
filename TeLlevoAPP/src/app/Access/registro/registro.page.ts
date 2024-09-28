import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  barra = false;
  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
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

  mensaje = "";
  cambiarBarra() {
    this.barra = !this.barra;
  }

  enviarFormulario(){

    if(this.formularioRegistro.valid){
      /* BIEN */
      console.log("BIEN")
    }else{
      /* MAL */
      console.log("MAL")
    }

  }

  ngOnInit() {
  }

}
