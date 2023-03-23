
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-access_bq',
  templateUrl: './access_bq.component.html',
  styleUrls: ['./access_bq.component.scss'],
})
export class NewAccess_bqComponent {
  islogged?: boolean;
  constructor( private router: Router) { }
  ngOnInit(){
    this.islogged = this.isLogged();
  }
  ngDoCheck(){
     this.islogged = this.isLogged();
  }
  isLogged(){
    var result = localStorage.getItem('token');
    if(result != null){
      return true;
    }else{
    return false;
    }
   }
  openCadastro(){
    $('#modal_cadastro').modal("show");
  }


}
