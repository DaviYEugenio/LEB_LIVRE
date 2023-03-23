import { Questao, QuestoesProva, Prova } from '../../../../../../models/conteudos.model';
import { Conteudo } from '../../../../../../models/conteudos.model';
import { BqService } from '../../../../../../services/service_bq/bq.service';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';




@Component({
  selector: 'app-modalVisualizarProva',
  templateUrl: './modalVisualizarProva.component.html',
  styleUrls: ['./modalVisualizarProva.component.scss'],
})

export class NewModalVisualizarProvaComponent implements OnInit {
  questoes: any[] = [];
  cabecalho?: boolean;
  Nome?: string;
  Turma?: string;
  date?: Date;
  index?: any;
  constructor(private service: BqService, private router: Router) {

  }
  ngOnInit() {
    $('#inserirCabecalho').hide();

  }
  ngOnChanges(){
    setTimeout(() => {
     this.load();
    }, 150)
  }
  ngDoCheck(){
    setTimeout(() => {
     this.load();
    }, 150)
  }
  load(){
    this.questoes = this.service.getQuestaoProva;
   this.cabecalho = true;
   this.index = 0;
   $("html, body").css({"overflow":"auto"});
   $(" img").css({"max-width":"100%"});

  }
fecharModal(){
}
salvarProva(){
   this.date = new Date();
  const u:  Prova = ({questao: this.questoes, cabecalho: this.cabecalho, nome: this.Nome, turma: this.Turma, dataCriacao: this.date});
  this.service.adicionarProva(u);
}
toggleCabecalho(x: any){
  this.cabecalho = x;
  if(this.cabecalho == true){
    $('#cabecalho').show();
    $('#inserirCabecalho').hide();
  }else{
    $('#cabecalho').hide();
    $('#inserirCabecalho').show();
  }
}
}


