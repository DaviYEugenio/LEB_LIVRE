import { Cadastro } from '../../models/cadastro.model';
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
export class CadastroService {

  constructor(private httpClient: HttpClient) {
  }

  post(cadastro: Cadastro): Observable<Error> {
    return this.httpClient.post<Error>(URL.API + "Cadastro/cadastro", cadastro);
  }

}
