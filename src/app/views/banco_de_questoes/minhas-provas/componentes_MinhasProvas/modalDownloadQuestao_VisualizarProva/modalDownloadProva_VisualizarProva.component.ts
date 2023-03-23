import {
  Prova
} from '../../../../../models/conteudos.model';
import {
  QuestoesProva
} from '../../../../../models/conteudos.model';
import {
  BqService
} from '../../../../../services/service_bq/bq.service';
import {
  Placeholder
} from '@angular/compiler/src/i18n/i18n_ast';
import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  Router
} from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-modalDownloadProva_VisualizarProva',
  templateUrl: './modalDownloadProva_VisualizarProva.component.html',
  styleUrls: ['./modalDownloadProva_VisualizarProva.component.scss'],
})
export class NewModalDownloadProva_VisualizarProvaComponent {
  @Input() public provaRecebida: any;
  prova ? : any;
  islogged ? : any;
  token ? : any;
  myToken ? : any;
  userEmail ? : any;
  idUsuario ? : any;
  questoesSelecionadas ? : any;
  cabecalho ? : any;
  logo ? : any;
  turma ? : any;
  nomeProva ? : any;

  constructor(private service: BqService, private router: Router) {}
  ngOnInit() {
    this.islogged = this.isLogged();
    this.userEmail = localStorage.getItem('User_Email');
    this.idUsuario = localStorage.getItem('User_Id');
    this.token = localStorage.getItem('token');
    this.myToken = {
      'Authorization': 'Bearer ' + this.token
    };

    if (this.islogged == false) {
      alert("Sua sessão expirou. Faça o login novamente, por favor.");
    } else {}
  }

  isLogged() {
    var result = localStorage.getItem('token');
    if (result != null) {
      return true;
    } else {
      return false;
    }
  }

  downloadProvaPDF(gabarito: boolean) {
    console.log(this.provaRecebida);
    this.provaRecebida.gabarito = gabarito;
    this.prova = {
      "provas": {
        "Cabecalho": this.provaRecebida.cabecalho,
        "Logo": this.provaRecebida.logo,
        "QuestoesHtml": "",
        "NomeTitulo": null,
        "Gabarito": this.provaRecebida.gabarito,
        "Turma": this.provaRecebida.turma,
        "Nome": this.provaRecebida.nomeProva,
        "Id": this.provaRecebida.id,
        "Questoes": this.provaRecebida.questoes
      },
      "usuarios": {
        "Id_Usuario": this.idUsuario,
        "Login_Usuario": this.userEmail
      }
    }

    this.service.downloadPdf(this.myToken, this.prova).subscribe(res =>{
      let blob = new Blob([res], { type: 'application/pdf' });
      let pdfUrl = window.URL.createObjectURL(blob);

      var PDF_link = document.createElement('a');
      PDF_link.href = pdfUrl;
      //   TO OPEN PDF ON BROWSER IN NEW TAB
      window.open(pdfUrl, '_blank');
      //   TO DOWNLOAD PDF TO YOUR COMPUTER
      // PDF_link.download = "TestFile.pdf";
      // PDF_link.click();
    })
  }

  downloadProvaDOC(gabarito: boolean) {
    console.log(this.provaRecebida);
    this.provaRecebida.gabarito = gabarito;
    this.prova = {
      "provas": {
        "Cabecalho": this.provaRecebida.cabecalho,
        "Logo": this.provaRecebida.logo,
        "QuestoesHtml": "",
        "NomeTitulo": null,
        "Gabarito": this.provaRecebida.gabarito,
        "Turma": this.provaRecebida.turma,
        "Nome": this.provaRecebida.nomeProva,
        "Id": this.provaRecebida.id,
        "Questoes": this.provaRecebida.questoes
      },
      "usuarios": {
        "Id_Usuario": this.idUsuario,
        "Login_Usuario": this.userEmail
      }
    }

    this.service.downloadDoc(this.myToken, this.prova).subscribe({
      next: res => {
        console.log(res);
        var file = res.nomeArquivo;
        var newTab = true;
        var url = file;
        console.log(url);
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
}
