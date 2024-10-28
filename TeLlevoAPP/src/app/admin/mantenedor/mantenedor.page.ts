import { Component, OnInit } from '@angular/core';
import { ApiControllerService } from 'src/app/Servicios/api-controller.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit {
  user = {
    "id": "",
    "user": "",
    "email": "",
    "password": ""
  }
  users: any[] = [];
  constructor(
    private router: Router,
    private api: ApiControllerService,
    private modalController: ModalController,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.cargarUsuarios()
  }

  modificar(id:any) {
    
  }

  /* async abrirModal(id: any) {

    this.api.obtenerUnUsuario(id).subscribe(
      async (usuario) => {
        this.user = usuario
        console.log("El usuario es: ", this.user)

        const modal = await this.modalController.create({
          component: ModalPage,
          componentProps: {
            "id": this.user.id,
            "user": this.user.user,
            "email": this.user.email,
            "password": this.user.password
          }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        console.log('Datos devueltos del modal:', data);
      },
      (error) => {
        console.log("ERROR en la llamada")
      }
    )

  } */


  cargarUsuarios() {
    this.api.obtenerUsuarios().subscribe(
      (data) => {
        this.users = data
        console.log(this.users)
      },
      (error) => {
        console.log("ERROR en la llamada")
      }
    )
  }

  modificarUsuario(id: any) {

    this.api.obtenerUnUsuario(id).subscribe(
      async (usuario) => {
        this.user = usuario
        console.log("El usuario es: ", this.user)

        let navigationExtras: NavigationExtras = {
          state: {
            id: this.user.id,
            username: this.user.user,
            email: this.user.email,
            password: this.user.password
          },
        };
        
        
        this.router.navigate(['/modificar'], navigationExtras);
        

        

      },
      (error) => {
        console.log("ERROR en la llamada")
      }
    )
    /* this.api.modificarUsuario(id,data).subscribe(
      (respuesta)=>{
        console.log("Usuario con id: ",id," MODIFICADO")
      },
      (error)=>{
        console.log("ERROR en la llamada: ",error)
      }
    ) */
  }

  eliminarUsuario(id: any) {
    this.api.borrarUsuario(id).subscribe(
      (respuesta) => {
        console.log("Usuario eliminado con id: ", id, " ELIMINADO")
        this.mostrarAlerta()
        this.cargarUsuarios()
      },
      (error) => {
        console.log("ERROR en la llamada: ", error)
      }
    )
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: '¡BIEN!',
      message: 'Usuario eliminado con exito!.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
