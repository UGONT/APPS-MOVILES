import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  apiURL = "http://127.0.0.1:8000/api/"
  /* apiURL = "http://localhost:3000/" */
  
  constructor(private http: HttpClient) {
  }

  obtenerUnUsuario(id:any):Observable<any>{
    return this.http.get(this.apiURL+"datos_usuario/"+id)
  }

  obtenerUsuarios():Observable<any>{
   return this.http.get(this.apiURL+"lista_usuarios"); 
  }

  insertarUsuarios(data:any):Observable<any>{
    return this.http.post(this.apiURL+"lista_usuarios/",data);
  }

  borrarUsuario(id:any):Observable<any>{
    return this.http.delete(this.apiURL+"datos_usuario/"+id)
  }

  modificarUsuario(id:any,data:any):Observable<any>{
    return this.http.put(this.apiURL+"datos_usuario/"+id,data)
  }

}
