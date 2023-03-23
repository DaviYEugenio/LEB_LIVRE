import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class NewMenuComponent {
  matDig?: any;
  islogged?: boolean;
  constructor( private router: Router) {
  }
  ngOnInit() {
    this.isLogged();
    $("#Cadastre-se").on("click", function() {
      $('#modal_login').modal("hide");
      $('#modal_esqueci').modal("hide");
      $('#modal_cadastro').modal("show");
    });
    $("#logar").on("click", function() {
      $('#modal_esqueci').modal("hide");
      $('#modal_cadastro').modal("hide");
      $('#modal_login').modal("show");
    });
    $("#btnEsqueciSenha").on("click", function() {
      $('#modal_login').modal("hide");
      $('#modal_cadastro').modal("hide");
      $('#modal_esqueci').modal("show");
    });
    // $("#btnCadastrar").on("click", function() {
    //   $('.modal').modal("hide");
    //   $('#modal_cadastro_sucesso').modal("show");
    // });
  }
  OpenMenu(){
    $('#modal_menu').modal("show");
  }
  ModalEntrar(){
    $('#modal_login').modal("show");
  }
  ModalCadastro(){
    $('#modal_cadastro').modal("show");
  }
  ModalCadastroSucesso() {
    $('.modal').modal("hide");
    $('#modal_cadastro_sucesso').modal("show");
  }
  materiais(){
    setTimeout(() => {
    this.matDig = document.getElementById("matDigitais");
    this.matDig.scrollIntoView();
  }, 300)
  }
  contato(){
    setTimeout(() => {
    this.matDig = document.getElementById("Footer");
    this.matDig.scrollIntoView();
  }, 150)
  }
  bq(){
    setTimeout(() => {
      this.matDig = document.getElementById("bq");
      this.matDig.scrollIntoView();
     }, 150)

  }
  isLogged(){
    var result = localStorage.getItem('token');
    if (result != null) {
      this.islogged = true;
      return true;
    } else {
      this.islogged = false;
      return false;
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('User_Name');
    localStorage.removeItem('User_Email');
    localStorage.removeItem('User_Id');
    var result = localStorage.getItem('token');
    if (result == null) {
      this.islogged = false;
      this.router.navigate(["/"]);
      this.isLogged();
      return true;
    } else {
      this.isLogged();
      return false;
    }
  }
}
