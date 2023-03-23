import { Login } from '../../models/login.model';
import { Error } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



export const URL: any = {
  API: environment.urlApi
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private httpClient: HttpClient) {


}

 post(login: Login): Observable<Error> {
   return this.httpClient.post<Error>(URL.API + "Login/login", login);
 }
 recuperarSenha(email: Login): Observable<Error> {
  return this.httpClient.post<Error>(URL.API + "Login/recuperarsenha", email);
}
//  isLogged(){
//   var token = localStorage.getItem('token');
//   if(token != null){
//     return true;
//   }else{
//   return false;
//   }
//  }

}
