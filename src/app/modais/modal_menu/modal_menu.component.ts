
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-modal_menu',
  templateUrl: './modal_menu.component.html',
  styleUrls: ['./modal_menu.component.scss'],
})
export class NewModal_MenuComponent {
  matDig?: any;
  islogged?: boolean;
  constructor( private router: Router) {
  }
  ngOnInit() {
    this.isLogged();
  }
  LinkFacebook(){
    window.open("https://www.facebook.com/editoradobrasil", "_blank");
  }
  LinkYoutube(){
    window.open("https://www.youtube.com/user/EditoradoBrasil", "_blank");
  }
  LinkInstagram(){
    window.open("https://www.instagram.com/EditoradoBrasil", "_blank");
  }
  ModalEntrar(){
    $('#modal_menu').modal("hide");
    $('#modal_login').modal("show");
  }
  ModalCadastro(){
    $('#modal_menu').modal("hide");
    $('#modal_cadastro').modal("show");
  }
  materiais(){
    $('#modal_menu').modal("hide");
    setTimeout(() => {
    this.matDig = document.getElementById("matDigitais");
    this.matDig.scrollIntoView();
  }, 300)
  }
  contato(){
    $('#modal_menu').modal("hide");
    setTimeout(() => {
    this.matDig = document.getElementById("Footer");
    this.matDig.scrollIntoView();
  }, 150)
  }
  bq(){
    $('#modal_menu').modal("hide");
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
