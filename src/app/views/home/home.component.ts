import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class NewHomeComponent {
  islogged?: boolean;
  User_Name?: any;
  tipo: any;
  constructor( private router: Router) { }
  ngOnInit(){
    this.islogged = this.isLogged();
    this.User_Name = localStorage.getItem("User_Name");
  }
  ngDoCheck(){
    this.islogged = this.isLogged();
    this.User_Name = localStorage.getItem("User_Name")
  }
  isLogged(){
    var result = localStorage.getItem('token');
    if(result != null){
      return true;
    }else{
    return false;
    }
   }
   ModalEntrar(){
    $('#modal_login').modal("show");
  }
  ModalCadastro(){
    $('#modal_cadastro').modal("show");
  }
  alinharTipos(){
    this.tipo = document.getElementsByClassName("owl-item");
    $("#conte .owl-item").removeAttr("style");
    // this.tipo.setAttribute("style", "width:155px;");
  }
}
