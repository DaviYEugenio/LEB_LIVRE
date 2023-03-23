import {
  ConteudosService
} from '../../../../services/service_conteudos/conteudos.service';
import {
  Conteudo
} from '../../../../models/conteudos.model';
import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  Router
} from '@angular/router';
import * as bootstrap from 'bootstrap';
import {
  OwlOptions
} from 'ngx-owl-carousel-o';
import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

@Component({
  selector: 'app-materiais_digitais',
  templateUrl: './materiais_digitais.component.html',
  styleUrls: ['./materiais_digitais.component.scss'],
})
export class NewMateriais_digitaisComponent {
  customOptions: OwlOptions = {
    loop: false,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [''],
    responsive: {
      0: {
        items: 1
      },
      300: {
        items: 3.2
      },

      400: {
        items: 3.2
      },
      500: {
        items: 3.2
      },
      600: {
        items: 3.2
      },
      650: {
        items: 3
      },
      740: {
        items: 2.7
      },
      800: {
        items: 3
      },
      840: {
        items: 5
      },
      940: {
        items: 5
      },
      1040: {
        items: 5
      },
      1100: {
        items: 8
      }
    },
    nav: false
  }
  segmentoSelected ? : any;
  componenteSelected ? : any;
  serieSelected ? : any;
  token ? : any;
  myToken ? : any;
  conteudosParam: any;
  conteudosGeral: any;
  componenteParam: any;
  serieParam: any;
  tipoConteudoParam: any;
  listaMateriais: any;
  listaSegmentos: any;
  listaSerie: any;
  listaTipoConteudo: any[];
  listaTipoConteudoSemDuplicado: any;
  listaSemIdDuplicado: any[];
  conteudos: any;
  conteudoAberto ? : any;
  id ? : number;
  name ? : string;
  email ? : string;
  tipoConteudo ? : number;
  urlConteudo ? : string;
  current ? : number;
  islogged ? : boolean;
  cont ? : any;
  idConteudo: any;
  linkConteudo: any;
  idTipoConteudo: any;
  frame: any;
  tipo: any;
  i: any = 8;
  public safeSrc ? : any;
  constructor(private service: ConteudosService, private router: Router, private sanitizer: DomSanitizer) {
    this.listaTipoConteudo = [];
    this.listaSemIdDuplicado = [];
  }
  ngOnInit() {
    this.islogged = this.isLogged();
    $("#vermenos").hide();

    setTimeout(() => {
      this.alinharTipos();
    }, 500)

    this.segmentoSelected = 99;
    this.componenteSelected = 99;
    this.serieSelected = 99;

    this.token = localStorage.getItem('token');
    this.myToken = {
      Authorization: 'Bearer ' + this.token
    };
    if (this.islogged == false) {
      this.service.getConteudosSemLogin().subscribe(res => {
        this.cont = res;
        this.conteudoAberto = "null";
        this.limiteConteudo(res);
      });
      console.log()
    } else {
      this.conteudosGeral = {
        IdTipoConteudo: 99,
        IdMateria: 99,
        IdSegmento: 1,
        IdSerie: 99
      }
      this.service.getListaTipoConteudo(this.myToken, this.conteudosGeral).subscribe(res => {
        this.cont = res;
        this.limiteConteudo(res);
      });
      this.PreencheTipoConteudo();
      this.islogged = this.isLogged();
      this.idConteudo = {
        Id: 0
      }
      this.service.getConteudoById(this.myToken, this.idConteudo).subscribe(res => {
        this.conteudoAberto = res;
      });
      this.service.getSegmentos().subscribe(res => {
        this.listaSegmentos = res;
        console.log(res);
      });
    }

  }
  ngDoCheck() {
    this.islogged = this.isLogged();
    if (this.i >= this.cont.length) {
      $("#vermais").hide();
      $("#vermenos").show();
    } else {
      $("#vermenos").hide();
      $("#vermais").show();
    }
    setTimeout(() => {
      this.alinharTipos();
    }, 500)
  }
  isLogged() {
    var result = localStorage.getItem('token');
    if (result != null) {
      return true;
    } else {
      return false;
    }
  }
  changeSegmento() {
    if (this.segmentoSelected == 99) {
      this.componenteSelected = 99;
      this.serieSelected = 99;
    }
    this.componenteParam = {
      IdSegmento: parseInt(this.segmentoSelected),
    }
    this.service.getListaMateriais(this.myToken, this.componenteParam).subscribe(res => {
      this.listaMateriais = res;
    });
    this.PreencheTipoConteudo();
  }
  changeComponente() {
    if (this.componenteSelected == 99) {
      this.serieSelected = 99;
    }
    this.conteudosParam = {
      IdTipoConteudo: 99,
      IdMateria: parseInt(this.componenteSelected),
      IdSegmento: parseInt(this.segmentoSelected),
      IdSerie: 99
    }
    this.service.getListaTipoConteudo(this.myToken, this.conteudosParam).subscribe(res => {
      this.cont = res;
      this.limiteConteudo(res);
    });
    this.serieParam = {
      IdSegmento: parseInt(this.segmentoSelected),
      IdMateria: parseInt(this.componenteSelected),
    }
    this.service.getListaSerie(this.myToken, this.serieParam).subscribe(res => {

      this.listaSerie = res.reverse();
    });
    this.PreencheTipoConteudo();
  }
  changeSerie() {
    this.conteudosParam = {
      IdTipoConteudo: 99,
      IdMateria: parseInt(this.componenteSelected),
      IdSegmento: parseInt(this.segmentoSelected),
      IdSerie: parseInt(this.serieSelected),
    }
    this.service.getListaTipoConteudo(this.myToken, this.conteudosParam).subscribe(res => {
      this.cont = res;
      this.limiteConteudo(res);
    });
    this.PreencheTipoConteudo();
  }
  PreencheTipoConteudo() {
    this.tipoConteudoParam = {
      IdSegmento: 1,
      IdMateria: parseInt(this.componenteSelected),
      IdSerie: parseInt(this.serieSelected),
      IdTipoConteudo: 99
    }
    this.service.getListaTipoConteudo(this.myToken, this.tipoConteudoParam).subscribe(res => {
      const setPerson = new Set();
      this.listaTipoConteudo = res;
      this.cont = res;
      const filterPerson = this.listaTipoConteudo.filter(x => {
        const duplicatedPerson = setPerson.has(x.idMaterial);
        setPerson.add(x.idMaterial);
        return !duplicatedPerson;
      });
      this.listaTipoConteudoSemDuplicado = filterPerson;
    });
  }
  ChangeTipoConteudo(currentId: any) {
    this.i = 8;
    console.log(currentId);
    if ($("#" + this.idTipoConteudo + "").hasClass("highlight")) {
      $("#" + this.idTipoConteudo + "").removeClass("highlight");
      $("#" + currentId + "").toggleClass("highlight");

      if ($("#" + currentId + "").hasClass("highlight")) {
        this.conteudosParam = {
          IdTipoConteudo: parseInt(currentId),
          IdMateria: parseInt(this.componenteSelected),
          IdSegmento: parseInt(this.segmentoSelected),
          IdSerie: parseInt(this.serieSelected),
        }
        this.service.getListaTipoConteudo(this.myToken, this.conteudosParam).subscribe(res => {
          console.log(res);
          this.limiteConteudo(res);
        });
      }
    } else {
      $("#" + currentId + "").toggleClass("highlight");
      if ($("#" + currentId + "").hasClass("highlight")) {
        this.conteudosParam = {
          IdTipoConteudo: parseInt(currentId),
          IdMateria: parseInt(this.componenteSelected),
          IdSegmento: parseInt(this.segmentoSelected),
          IdSerie: parseInt(this.serieSelected),
        }
        this.service.getListaTipoConteudo(this.myToken, this.conteudosParam).subscribe(res => {
          this.limiteConteudo(res);
        });
      }
    }
    this.idTipoConteudo = currentId;
  }
  VerMais() {
    this.i = this.i + 8;
    this.conteudos = this.cont.slice(0, this.i);
    if (this.i >= this.cont.length) {
      $("#vermais").hide();
      $("#vermenos").show();
    }
  }
  VerMenos() {
    this.conteudos = this.cont.slice(0, 8);
    $("#vermenos").hide();
    $("#vermais").show();
    this.i = 8;
  }

  openModalConteudo(currentId: any) {
    this.idConteudo = {
      Id: currentId
    }
    this.service.getConteudoById(this.myToken, this.idConteudo).subscribe(res => {
      this.conteudoAberto = res;
      this.linkConteudo = this.conteudoAberto.conteudoArquivo
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://" + this.linkConteudo.substring(6));
      this.linkConteudo = this.safeSrc;
    });
    $('#modal_conteudo').modal("show");
  }
  openModalCadastro() {
    $('#modal_cadastro').modal("show");
  }
  limiteConteudo(res: any) {
    var largura = document.body.clientWidth;
    if (largura < 500) {
      this.cont = res;
      this.conteudos = res.slice(0, 2);
    } else {
      if (res.length <= 8) {
        this.cont = res;
        this.conteudos = res;
      } else {
        this.cont = res;
        this.conteudos = res.slice(0, 8);
      }
    }
  }
  fecharModal() {
    this.conteudoAberto = "";
    this.linkConteudo = "";
    this.safeSrc = "";
  }
  alinharTipos() {
    this.tipo = document.getElementsByClassName("owl-item");
    $("#conte .owl-item").removeAttr("style");
    // this.tipo.setAttribute("style", "width:155px;");
  }
}
