import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private bdd:Storage = new Storage()
  private BDDStatus:Promise<void>;
  constructor(private storage:Storage) {
    this.BDDStatus = this.onInit();
   }

   async onInit():Promise<void>{
    const storage = await this.storage.create();
    this.bdd = storage;
   }
   /* CHECK */
   async BDDCheck():Promise<void>{
    await this.BDDStatus
   }
   /* GET */
   async get(key:string):Promise<any>{
    await this.BDDCheck();
    return this.bdd.get(key);
   }

   /* SET */
   async set(key:string, valor:any){
    await this.BDDCheck();
    return this.bdd.set(key,valor);
   }
  /* REMOVE */
  async remove(key:string){
    await this.BDDCheck();
    return this.bdd.remove(key);
  }

  /* CLEAR */
  async clear(){
    await this.BDDCheck();
    return this.bdd.clear();
  }
}

