import { Prova } from '../../../models/conteudos.model';
import { QuestoesProva } from '../../../models/conteudos.model';
import { BqService } from '../../../services/service_bq/bq.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const URL: any = {
  pathLogo: environment.urlLogo
}

@Component({
  selector: 'app-minhas-provas',
  templateUrl: './minhas-provas.component.html',
  styleUrls: ['../criar-prova/banco_de_questoes.component.scss'],
})
export class NewMinhasProvasComponent {
  islogged?: any;
  token?: any;
  myToken?: any;
  public prova?: any;
  cabecalho?: boolean;
  provas: any[] = [];
  provasFiltro: any[] = [];
  currentNavItem? : string;
  userEmail?: any;
  idUsuario?: any;
  searchProva?: any;
  turma?: any;
  logo?: any;
  nomeProva?: any;
  idProva?: any;
  provaFinalizada?: any;
  questoesSelecionadas: any[] = [];
  responseFile?: any;
  paginas: any[] = [];
  numeroPagina = 0;
  classPageSelecionado = 0;

  constructor(private service: BqService, private router: Router) {}

  ngOnInit() {
    this.currentNavItem = "minhas-provas";
    this.islogged = this.isLogged();    
    this.userEmail = localStorage.getItem('User_Email');
    this.idUsuario = localStorage.getItem('User_Id');
    this.token = localStorage.getItem('token');
    this.myToken = {'Authorization': 'Bearer '+ this.token};

    if(this.islogged == false){
      localStorage.removeItem('token');
      localStorage.removeItem('User_Name');
      localStorage.removeItem('User_Email');
      localStorage.removeItem('User_Id');
      alert("Sua sessão expirou. Faça o login novamente, por favor.");
      window.location.reload();
    } else {
      this.getProvas();
    }
    
  }

  ngDoCheck() {
    $(".dataTables_length").remove();
    $(".dataTables_filter").remove();

    var result = $(".active .page-link").text();
    var aux = $(".page-link").text();
    var numeroDepaginasparcial = aux.length;
    var a = aux.substr(0, (numeroDepaginasparcial - 1))
    var newNumberPage = a.length;
    var numeroDePaginas = a.substr(newNumberPage - 1)
    let filtro = "Página " + result + " de " + numeroDePaginas;
    $("#DataTables_Table_0_info").text(filtro);

    $("#paginationDatatable1").append($("#DataTables_Table_0_info"));
    $("#paginationDatatable1").append($("#DataTables_Table_0_paginate"));

    $("th").removeClass("sorting");
    $("th").removeClass("sorting_desc");
    $("th").removeClass("sorting_asc");
    $("#DataTables_Table_0_previous .page-link").text("«");
    $("#DataTables_Table_0_next .page-link").text("»");
  }

  isLogged(){
    var result = localStorage.getItem('token');
    if(result != null){
      return true;
    }else{
    return false;
    }
  }

  getProvas() {
    $('#loading').show();
    this.provas = [];
    this.paginas = [];
    var userId = localStorage.getItem('User_Id');
    var data = {
      "usuarios": {
        "Id_Usuario": userId
      },
      "provas": {
        "Palavra": this.searchProva
      }
    }
    this.service.getProvas(this.myToken, data).subscribe({
      next: res => {
        console.log(res);
        this.provas = res;
        this.provasFiltro = this.provas;

        this.provas.forEach( (item: any) => {
          this.filterPaginas(item);
        });
        this.setPagina(0);
        
        $('#loading').hide();
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          $('#loading').hide();
        }
      }
    })
  }

  btnDownload(prova: any) {
    this.prova = prova;
    var data = {
      "Id": prova.id
    }
    this.service.listarQuestoesProva(this.myToken, data).subscribe({
      next: res => {
        this.prova.questoes = res;
        this.logo = "http://www.editoradobrasil.com.br/admPortais/upload/escolas/logo/" + prova.logo;
        $("#modalDownloadProva").modal("show");
        $('#loading').hide();
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          $('#loading').hide();
        }
      }
    })
  }

  btnVisualizarProva(prova: any) {
    $('#loading').show();
    this.questoesSelecionadas = [];
    this.nomeProva = prova.nome;
    this.turma = prova.turma;
    this.cabecalho = prova.cabecalho;
    this.idProva = prova.id;
    this.logo = {
      "fileName": prova.logo,
      "fullPath": URL.pathLogo+prova.logo
    }
    console.log(prova);

    var data = {
      "Id": prova.id
    }
    this.service.listarQuestoesProva(this.myToken, data).subscribe({
      next: res => {
        this.questoesSelecionadas = res;
        //this.logo = "http://www.editoradobrasil.com.br/admPortais/upload/escolas/logo/" + prova.logo;
        $("#modalProva").modal("show");
        $('#loading').hide();
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          $('#loading').hide();
        }
      }
    })
  }

  btnExcluirProva(prova: any) {
    $('#loading').show();
    var data = {
      "Id": prova.id
    }
    this.service.excluirProva(this.myToken, data).subscribe({
      next: res => {
        console.log(res);
        alert("Prova excluída com sucesso!");
        this.provas.splice(this.provas.indexOf(prova), 1);
        this.provas.forEach( (item: any) => {
          this.filterPaginas(item);
        });
        this.setPagina(0);
        this.getProvas();
        $('#loading').hide();
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          $('#loading').hide();
        }
      }
    })
  }

  removerQuestaoProva(questao: any) {
    this.questoesSelecionadas.splice(this.questoesSelecionadas.indexOf(questao), 1);
    $("#chkQuestao" + questao.id + "").prop('checked', false);
    $("#liQuestao" + questao.id + "").removeClass("selecionado");
  }
  toggleCabecalho(param: boolean) {
    this.cabecalho = param;
  }
  salvarProva() {
    $('#loading').show();
    this.userEmail = localStorage.getItem('User_Email');
    this.idUsuario = localStorage.getItem('User_Id');
    this.prova = { 
      "provas": {
        "Cabecalho": this.cabecalho,
        "Logo": this.logo.fileName,
        "QuestoesHtml": "",
        "NomeTitulo": null,
        "Turma": this.turma,
        "Nome": this.nomeProva,
        "Id": this.idProva,
        "Questoes": this.questoesSelecionadas
      },
      "usuarios": {
        "Id_Usuario": this.idUsuario,
        "Login_Usuario": this.userEmail
      }
    }
    this.service.salvarProva(this.myToken, this.prova).subscribe({
      next: res => {
        console.log(res);
        this.provaFinalizada = true;
        this.getProvas();
        $('#loading').hide();
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          $('#loading').hide();
        }
      }
    })
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.service.uploadFile(this.myToken, formData).subscribe({
      next: (event) => {
        console.log(event);

        if (event.type === HttpEventType.Response) {
          this.onUploadFinished(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  onUploadFinished(event: any){ 
    this.responseFile = event;
    this.logo = event;
    console.log(this.responseFile);
  }

  setPagina(index: any){
    if (index > (this.paginas.length - 1) || index < 0) { return };
    this.classPageSelecionado = index;
    this.numeroPagina = index;
    this.provas = this.provasFiltro.filter(obj => this.paginas[index].provas.includes(obj.id));
    this.setChecked();
  }

  setChecked() {
    setTimeout( () => {
        this.questoesSelecionadas.forEach(function (item: any) {
            $("#liQuestao" + item.id + "").addClass("selecionado");
        })
    }, 100);
  }

  filterPaginas(item: any) {
    if (this.paginas.length == 0) {
      this.paginas.push({ 'provas': [item.id] });
      return
    }
    if (this.paginas[this.paginas.length - 1].provas.length < 10) {
        this.paginas[this.paginas.length - 1].provas.push(item.id);
    }
    else {
        this.paginas.push({ 'provas': [item.id] });
    }
  }

  changeNavItem(navItem: string) {
    this.currentNavItem = this.service.currentNavItemSet(navItem);
  }
}
