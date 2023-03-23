import { Prova } from '../../../../../../models/conteudos.model';
import { QuestoesProva } from '../../../../../../models/conteudos.model';
import { BqService } from '../../../../../../services/service_bq/bq.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-modalDownloadProva',
  templateUrl: './modalDownloadProva.component.html',
  styleUrls: ['./modalDownloadProva.component.scss'],
})
export class NewModalDownloadProvaComponent {
  prova: any[] = [];
  constructor(private service: BqService, private router: Router) {
  }
  ngOnInit() {
  }
  downloadProvaPDF(gabarito: boolean){

    window.open('');
  }
}
