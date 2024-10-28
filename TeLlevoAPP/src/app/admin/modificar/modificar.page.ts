import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthentificatorService } from 'src/app/Servicios/authentificator.service';
import { StorageService } from 'src/app/Servicios/storage.service';
import { ApiControllerService } from 'src/app/Servicios/api-controller.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  /* usuario a modificar */
  user = {
    "user": "",
    "email": "",
    "password": ""
  }
  /* datos usuario desde mantenedor */
  id = ""
  username = ""
  email = ""
  password = ""

  mensaje = "";
  barra = false;
  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiControllerService,
    private alertController: AlertController
  ) {

    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      id:'';
      username: '';
      email: '';
      password: '';
    };

    this.id = state.id
    this.username = state.username
    this.email = state.email
    this.password = state.password


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
        
        this.api.modificarUsuario(this.id,this.user).subscribe(
          (respuesta) => {
            this.mensaje = 'Usuario modificado con exito!';
            /* test */
            console.log("Usuario modificado ", this.user.user);

            this.cambiarBarra();
            this.mostrarAlerta()
            setTimeout(() => {
              this.router.navigate(['/mantenedor'],);
              this.mensaje = "";
              this.cambiarBarra();
            }, 2000);

          },
          (error) => {
            console.log("ERROR en la llamada", error);
            return
          }
        )

      } catch (error) {
        console.log('ERROR al guardar')
      }

    } else {
      /* MAL */
      console.log("Formulario incompleto")
    }

  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: '¡BIEN!',
      message: 'Usuario modificado con exito!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
