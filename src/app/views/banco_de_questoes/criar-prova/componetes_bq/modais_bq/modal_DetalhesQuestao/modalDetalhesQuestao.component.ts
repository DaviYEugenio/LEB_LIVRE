import { QuestoesProva } from '../../../../../../models/conteudos.model';
import { BqService } from '../../../../../../services/service_bq/bq.service';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modalDetalhesQuestao',
  templateUrl: './modalDetalhesQuestao.component.html',
  styleUrls: ['./modalDetalhesQuestao.component.scss']
})
export class modalDetalhesQuestao{
  @Input() questao: any;
  prova: any[] = [];
  id?: number;
  filter: any;
  enunciado?: any;
  conteudo?: any;
  resposta?: any;

  btnRemoverQuestao?: any;

  constructor(private service: BqService) {

  }
  ngOnInit(){

    $("html, body").css({"overflow":"auto"});
  }

  ngOnChanges(){
    setTimeout(() => {
     //this.load();
    }, 150)

  }
  load(questao: any){
    console.log(questao);
    $(" img").css({"max-width":"100%"});
    this.enunciado = questao.enunciado;
    this.conteudo = questao.conteudo;
    this.resposta = questao.resposta;
    this.prova = this.service.getProva;
    if($("#liQuestao" + questao.id + "").hasClass("selecionado")){
      this.btnRemoverQuestao = true;
    }else{
      this.btnRemoverQuestao = false;
    }
  }
  closeModal(){
    $('#modalQuestao').modal("hide");
  }
  addQuestao(questaoSelected: any[]){

    // const t:  QuestoesProva = ({questao: questaoSelected});
    // this.service.adicionarQuestaoProva(t);
    // $('#modalQuestao').modal("hide");
    // $("#liQuestao" + this.currentIdConteudo.id + "").addClass("selecionado");
    // $("#liQuestao" + this.currentIdConteudo.id + "").removeClass("visualizado");


  }
  removerQuestaoProva(){
    // this.service.removeQuestao(this.currentIdConteudo.id, this.questao)
    //   this.prova = this.service.getQuestaoProva;

    //   $('#modalQuestao').modal("hide");
    //   $("#liQuestao" + this.currentIdConteudo.id + "").removeClass("selecionado");
  }

}
