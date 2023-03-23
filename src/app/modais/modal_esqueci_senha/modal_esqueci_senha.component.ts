import { LoginService } from '../../services/service_login/login.service';
import { Login } from '../../models/login.model';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Output, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal_esqueci_senha',
  templateUrl: './modal_esqueci_senha.component.html',
  styleUrls: ['./modal_esqueci_senha.component.scss']
})

export class NewModal_EsqueciSenhaComponent {
  email?: any;
  constructor(private service: LoginService, private router: Router) {
    bootstrap
  }
  ngOnInit() {
  }
  recuperarSenha(){
    const dadosUsuario: Login = ({Login_Usuario: this.email })
    this.service.recuperarSenha(dadosUsuario).subscribe({
      next: res => {
          $("#alert-rec-senha-nao").hide();
          $("#alert-rec-senha").show();
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 400) {
          $("#alert-rec-senha").hide();
          $("#alert-rec-senha-nao").show();
        }
      }
    })
  }

}
