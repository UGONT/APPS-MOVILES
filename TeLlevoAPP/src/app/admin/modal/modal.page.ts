import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { ApiControllerService } from 'src/app/Servicios/api-controller.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  usu = {
    "user": "",
    "email": "",
    "password": ""
  }
  userr = {
    "id": "",
    "user": "",
    "email": "",
    "password": ""
  }
  users: any[] = [];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private api: ApiControllerService
  ) { }

  ngOnInit() {
    this.userr.id = this.navParams.get('id');
    this.userr.user = this.navParams.get('user');
    this.userr.email = this.navParams.get('email');
    this.userr.password = this.navParams.get('password');
    console.log(this.userr.user)
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
  async guardarDatos() {
    const id = this.userr.id
    
    this.api.modificarUsuario(id,this.usu).subscribe(
      (respuesta)=>{
        console.log("Usuario con id: ",id," MODIFICADO")
        
      },
      (error)=>{
        console.log("ERROR en la llamada: ",error)
      }
    )
    
    this.modalController.dismiss();
  }

}
