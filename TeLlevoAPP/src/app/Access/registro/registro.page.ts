import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthentificatorService } from 'src/app/Servicios/authentificator.service';
import { StorageService } from 'src/app/Servicios/storage.service';
import { ApiControllerService } from 'src/app/Servicios/api-controller.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user = {
    "user": "",
    "email": "",
    "password": ""
  }
  

  mensaje = "";
  barra = false;
  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthentificatorService,
    private storage: StorageService,
    private api: ApiControllerService


  ) {
    this.formularioRegistro = this.fb.group({

      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/),
      ]),
      confirmacionPassword: new FormControl('', Validators.required)

    }, { validators: this.passwordIguales });
  }

  passwordIguales(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmarPassword = group.get('confirmacionPassword')?.value;
    return password == confirmarPassword ? null : { notMatching: true };
  }


  cambiarBarra() {
    this.barra = !this.barra;
  }

  async enviarFormulario() {

    if (this.formularioRegistro.valid) {
      
      /* JSON */
      this.user = {
        user: this.formularioRegistro.value.usuario,
        email: this.formularioRegistro.value.correo,
        password: this.formularioRegistro.value.password
      };

      

      try {
        this.api.insertarUsuarios(this.user).subscribe(
          (respuesta) => {
            this.mensaje = 'Registro exitoso!';
            /* test */
            console.log("Registro exitoso JSON del usuario: ", this.user.user);
          },
          (error) => {
            console.log("ERROR en la llamada",error);
          }
        )

        /* test */
        await this.storage.set(this.user.user, this.user)
        console.log('usuario guardado en storage')
        /* test */
        const test = await this.storage.get(this.user.user)
        console.log("EL usuario en storage es: ", test)

      } catch (error) {
        console.log('ERROR al guardar')
      }

      this.cambiarBarra();
      setTimeout(() => {
        this.router.navigate(['/home'],);
        this.mensaje = "";
        this.cambiarBarra();
      }, 2000);
    } else {
      /* MAL */
      console.log("MAL")
    }

  }

  ngOnInit() {
  }

}
