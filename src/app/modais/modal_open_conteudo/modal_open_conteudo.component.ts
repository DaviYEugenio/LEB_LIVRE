import { Conteudo } from '../../models/conteudos.model';
import { ConteudosService } from '../../../app/services/service_conteudos/conteudos.service';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';




@Component({
  selector: 'app-modal_open_conteudo',
  templateUrl: './modal_open_conteudo.component.html',
  styleUrls: ['./modal_open_conteudo.component.scss'],
})

export class NewModal_open_conteudoComponent implements OnInit {
  // @Input() currentId: any;
  conteudos: any;
  current: any;
  token:any;
  idConteudo: any;

  constructor(private service: ConteudosService, private router: Router) {

  }
  ngOnInit() {

  }

  fecharModal(){
  $('#modal_conteudo').modal("hide");
  }

}


