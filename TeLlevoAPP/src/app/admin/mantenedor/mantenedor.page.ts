import { Component, OnInit } from '@angular/core';
import { ApiControllerService } from 'src/app/Servicios/api-controller.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit {
  user: any[] = [];
  users: any[] = [];
  constructor(
    private api: ApiControllerService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.cargarUsuarios()
  }

  async abrirModal(id: any) {

    this.api.obtenerUnUsuario(id).subscribe(
      async (usuario) => {

        console.log("El usuario es: ", usuario.user)
        
        const modal = await this.modalController.create({
          component: ModalPage,
          componentProps: {
             
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

  }


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
        this.cargarUsuarios()
      },
      (error) => {
        console.log("ERROR en la llamada: ", error)
      }
    )
  }
}
