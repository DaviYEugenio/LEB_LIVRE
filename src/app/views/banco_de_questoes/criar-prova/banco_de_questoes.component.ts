import { BqService } from '../../../services/service_bq/bq.service';
import { Componente } from '../../../models/conteudos.model';
import { Ano } from '../../../models/conteudos.model';
import { Questao } from '../../../models/conteudos.model';
import { tipoQuestao } from '../../../models/conteudos.model';
import { Segmento } from '../../../models/conteudos.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Login } from 'src/app/models/login.model';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-banco_de_questoes',
  templateUrl: './banco_de_questoes.component.html',
  styleUrls: ['./banco_de_questoes.component.scss']
})
export class NewBanco_de_questoesComponent {
  tiposOptions: OwlOptions = {
    loop: false,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: false
  }

  dadosTipo: any[] = [];
  result: any;
  questaoSelected: any;
  id?: number;
  name?: string;
  idComponente?: number;
  nameComponente?: string;
  idAno?: number;
  nameAno?: string;
  idTipo?: number;
  nameTipo?: string;
  segmentoSelected?: any;
  componenteSelected?: any;
  serieSelected?: any;
  tipoQuestaoSelected?: number;
  numeroPagina = 0;
  classPageSelecionado = 0;
  idQuestao?: number;
  componente?: string;
  serie?: string;
  enunciado?: string;
  conteudo?: string;
  resposta?: string;
  current?: number;
  usada?: number;
  currentNavItem?: string;

  islogged?: boolean;
  token?: any;
  myToken?: any;
  totalQuestoes?: any;
  segmentos?: any;
  componentes?: any;
  series?: any;
  questao?: any;
  questoes?: any;
  questoesProva: any[] = [];
  paginas: any[] = [];
  tipoQuestao: any[] = [];
  tipos?: any;
  questoesFiltro: any[] = [];
  questoesTipoFiltro: any[] = [];
  questoesSelecionadas: any[] = [];
  totalFiltro?: any;
  palavraChave?: any;
  btnRemoverQuestao?: any;
  nomeProva?: any;
  turma?: any;
  prova?: any;
  userEmail?: any;
  idUsuario?: any;
  cabecalho?: boolean;
  logo?: any;
  provaFinalizada?: boolean;
  responseFile?: any;

  constructor(private service: BqService, private router: Router) {
    this.questao = {
      "id": "",
      "enunciado": "",
      "conteudo": "",
      "resposta": "",
      "tags": ""
    }
    this.prova = {
      "provas": {
        "Cabecalho":true,
        "Logo":"//www.editoradobrasil.com.br/admPortais/upload/escolas/logo/logo-ebsa.gif",
        "QuestoesHtml": "",
        "NomeTitulo": null,
        "Turma":"",
        "Nome":"",
        "Id": 0,
        "Questoes":[]
      },
      "usuarios": {
        "Login_Usuario":""
      }
    }
    this.logo = {
      "fileName": "logo-ebsa.gif",
      "fullPath": "//www.editoradobrasil.com.br/admPortais/upload/escolas/logo/logo-ebsa.gif"
    }
    this.cabecalho = true;
    this.provaFinalizada = false;
  }

  ngOnInit(){
    this.islogged = this.isLogged();
    this.currentNavItem = "banco-de-questoes";

    this.segmentoSelected = -1;
    this.componenteSelected = -1;
    this.serieSelected = -8;

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
      this.getSegmento();
      this.getQntdQuestoes();
    }

  }

  getQntdQuestoes() {
    this.service.getQntdQuestoes().subscribe({
      next: res => {
        this.totalQuestoes = res;
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          this.router.navigate(['/']);
        }
      }
    })
  }

  getSegmento() {
    this.service.getSegmento(this.myToken).subscribe({
      next: res => {
        this.segmentos = res;
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
        }
      }
    })
  }

  changeSegmento(){
    if(this.segmentoSelected == -1){
      this.componenteSelected = -1;
      this.serieSelected = -8;
      this.getQntdQuestoes();
    }

    const segmentoValue = { "Segmento": this.segmentoSelected };
    this.service.getComponente(this.myToken, segmentoValue).subscribe({
      next: res => {
        this.componentes = res;
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
        }
      }
    })
  }

  changeComponente(){
    if(this.componenteSelected == -1){
      this.serieSelected = -8;
    }

    const componenteValue = { "Segmento": this.segmentoSelected, "Materia": this.componenteSelected };
    this.service.getSeries(this.myToken, componenteValue).subscribe({
      next: res => {
        this.series = res;
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
        }
      }
    })
  }

  changeSerie(){
    $('#loading').show();
    this.questoes = [];
    this.paginas = [];

    var data = {
      "filtro": {
        "Segmento": this.segmentoSelected,
        "Materia": this.componenteSelected,
        "Serie": this.serieSelected,
        "Palavra": this.palavraChave
      },
      "usuario": {
        "Id_Usuario": this.idUsuario
      }
    };

    this.service.getQuestoes(this.myToken, data).subscribe({
      next: res => {
        this.questoes = res;
        console.log(res);
        this.questoesFiltro = res;

        if (this.questoes.length == 0) {
            this.totalQuestoes = '0'
        } else {
            this.totalQuestoes = this.questoes.length;
        }
        this.setFilter();
        this.setChecked();
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

  getQuestoesPalavraChave(){
    $('#loading').show();
    this.questoes = [];
    this.paginas = [];
    var data = {
      "filtro": {
        "Segmento": this.segmentoSelected,
        "Materia": this.componenteSelected,
        "Serie": this.serieSelected,
        "Palavra": this.palavraChave
      },
      "usuario": {
        "Id_Usuario": this.idUsuario
      }
    };
    this.service.getQuestoesPalavraChave(this.myToken, data).subscribe({
      next: res => {
        console.log(res);
        this.questoes = res;
        this.questoesFiltro = res;

        if (this.questoes.length == 0) {
            this.totalQuestoes = '0'
        } else {
            this.totalQuestoes = this.questoes.length;
        }
        this.setFilter();
        this.setChecked();
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

  filterTipo(item: any) {
    if (item.tipoQuestao.nome == null) { return; }
    if (this.tipoQuestao.filter((obj: { id: any; }) => obj.id == item.tipoQuestao.id).length == 0) {
      this.tipoQuestao.push({ 'id': item.tipoQuestao.id, 'nome': item.tipoQuestao.nome, 'ordem': item.tipoQuestao.ordem });
    }
  }

  filterPaginas(item: any) {
    if (this.paginas.length == 0) {
      this.paginas.push({ 'questoes': [item.id] });
      return
    }
    if (this.paginas[this.paginas.length - 1].questoes.length < 10) {
        this.paginas[this.paginas.length - 1].questoes.push(item.id);
    }
    else {
        this.paginas.push({ 'questoes': [item.id] });
    }
  }

  changeTipoQuestao(tipo: any){
    this.tipoQuestaoSelected = tipo;

    if (this.tipoQuestaoSelected == 0) {
        this.questoes = this.questoesTipoFiltro;
    } else {
        this.questoes = this.questoesTipoFiltro.filter(obj => obj.tipoQuestao.id == this.tipoQuestaoSelected);
    }
    this.totalFiltro = this.questoes.length;
    this.paginas = [];
    this.questoes.forEach( (item: any) => {
        this.filterPaginas(item);
    })
    this.totalQuestoes = this.questoes.length;
    this.setPagina(0);
    this.setChecked();
  }

  setPagina(index: any){
    if (index > (this.paginas.length - 1) || index < 0) { return };
    this.classPageSelecionado = index;
    this.numeroPagina = index;
    this.questoes = this.questoesFiltro.filter(obj => this.paginas[index].questoes.includes(obj.id));
    this.setChecked();
  }

  setFilter() {
    this.questoesTipoFiltro = [];
    this.tipoQuestao = [];
    this.tipoQuestaoSelected = 0;
    this.totalFiltro = this.questoes.length;
    this.questoes.forEach( (item: any) => {
        this.filterTipo(item);
        this.filterPaginas(item);
    });

    this.questoesTipoFiltro = this.questoes;
    this.setPagina(0);
  }

  setChecked() {
    setTimeout( () => {
        this.questoesSelecionadas.forEach(function (item: any) {
            $("#liQuestao" + item.id + "").addClass("selecionado");
        })
    }, 100);
  }
  openQuestao(questao: any,i: any) {
    this.btnRemoverQuestao = false;

    if (this.questoesSelecionadas.filter(function (e) { return e.id == questao.id; }).length > 0) {
        this.btnRemoverQuestao = true;
    }
    $('#loading').show();
    const data = { "Id": questao.id };
    this.service.consultarQuestao(this.myToken, data).subscribe({
      next: res => {
        this.questao = res;
        $('#loading').hide();
        $('#modalQuestao').modal("show");
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          $('#loading').hide();
        }
        $('#loading').hide();
      }
    })
  }
  addQuestao(questao: any) {
    if (this.questoesSelecionadas.filter(function (e) { return e.id == questao.id; }).length == 0) {
      this.questoesSelecionadas.push(questao);
    }
    $("#liQuestao" + questao.id + "").addClass("selecionado");
    $("#liQuestao" + questao.id + "").removeClass("visualizado");
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
    this.prova = {
      "provas": {
        "Cabecalho": this.cabecalho,
        "Logo": this.logo.fileName,
        "QuestoesHtml": "",
        "NomeTitulo": null,
        "Turma": this.turma,
        "Nome": this.nomeProva,
        "Id": 0,
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

  downloadProvaPDF(gabarito: boolean) {
    this.prova.provas.Gabarito = gabarito;
    console.log(this.prova);
    // this.prova = {
    //   "provas": {
    //     "Cabecalho": this.prova.provas.cabecalho,
    //     "Logo": this.prova.provas.logo,
    //     "QuestoesHtml": "",
    //     "NomeTitulo": null,
    //     "Gabarito": this.prova.provas.gabarito,
    //     "Turma": this.prova.provas.turma,
    //     "Nome": this.prova.provas.nomeProva,
    //     "Id": this.prova.provas.id,
    //     "Questoes": this.prova.provas.questoes
    //   },
    //   "usuarios": {
    //     "Id_Usuario": this.idUsuario,
    //     "Login_Usuario": this.userEmail
    //   }
    // }

    this.service.downloadPdf(this.myToken, this.prova).subscribe(res =>{
      let blob = new Blob([res], { type: 'application/pdf' });
      let pdfUrl = window.URL.createObjectURL(blob);

      var PDF_link = document.createElement('a');
      PDF_link.href = pdfUrl;
      window.open(pdfUrl, '_blank');
    })
  }

  downloadProvaDOC(gabarito: boolean) {
    this.prova.provas.Gabarito = gabarito;
    console.log(this.prova);
    // this.prova = {
    //   "provas": {
    //     "Cabecalho": this.provaRecebida.cabecalho,
    //     "Logo": this.provaRecebida.logo,
    //     "QuestoesHtml": "",
    //     "NomeTitulo": null,
    //     "Gabarito": this.provaRecebida.gabarito,
    //     "Turma": this.provaRecebida.turma,
    //     "Nome": this.provaRecebida.nomeProva,
    //     "Id": this.provaRecebida.id,
    //     "Questoes": this.provaRecebida.questoes
    //   },
    //   "usuarios": {
    //     "Id_Usuario": this.idUsuario,
    //     "Login_Usuario": this.userEmail
    //   }
    // }

    this.service.downloadDoc(this.myToken, this.prova).subscribe({
      next: res => {
        console.log(res);
        var file = res.nomeArquivo;
        var newTab = true;
        var url = file;

        var anchor = document.createElement('a');
        anchor.href = url;
        if (newTab) {
            anchor.target = '_blank';
            console.log(url);
        }
        anchor.click();

        $('#loading').hide();
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if (error.status == 401) {
          alert("Sua sessão expirou. Faça o login novamente, por favor.");
          $('#loading').hide();
        }
      }
    })
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

  opemModalDetalhesQuestao(currentId: any){
    this.current = currentId;
    //const response = this.questao.find( x => x.id === this.current);
    //this.result = response;
    $('#modalQuestao').modal("show");
  }
  openModalVisualizarProva(){
    $('#modalProva').modal("show");
  }
  changeNavItem(navItem: string){
    this.currentNavItem = this.service.currentNavItemSet(navItem);
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
}
