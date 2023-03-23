import { LoginService } from '../../services/service_login/login.service';
import { Login } from '../../models/login.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-modal_login',
  templateUrl: './modal_login.component.html',
  styleUrls: ['./modal_login.component.scss'],
})
export class NewModal_LoginComponent {
  Login_Usuario?: string;
  Senha?: string
  error?: boolean;
  constructor(private service: LoginService, private router: Router) {
  }
  ngOnInit() {
    $("#AlertLogin").hide();
  }

  Login(){
    const dadosUsuario: Login = ({Login_Usuario: this.Login_Usuario, Senha: this.Senha })
     this.service.post(dadosUsuario).subscribe({
      next: res => {
        var user = res.user;

      if(res.token != null){
      localStorage.setItem('token', res.token);
      localStorage.setItem('User_Name', user.cadastro.nome);
      localStorage.setItem('User_Email', user.login_Usuario);
      localStorage.setItem('User_Id', user.id);
      $('#modal_login').modal("hide");
      window.location.reload();
      this.router.navigate(['/']);
      }
      else{
        $("#AlertLogin").show();
      }
      },
      error: error => {
        if(error.status == 400 || error.status == 404 || error.status == 0) {
          $("#AlertLogin").show();
          $(".texto_cadastre").hide();
        }
    }
  })

  }
  validacaoEmail(){
    if($("#EmailLogin").hasClass("ng-invalid")){
      $(".aviso1").show();
      $("#EmailLogin").addClass("ngInvalid")
    }
    else {
      $(".aviso1").hide();
      $("#EmailLogin").removeClass("ngInvalid")
    }
  }

  ModalEsqueci(){
    $('#modal_esqueci').modal("show");
  }
}
