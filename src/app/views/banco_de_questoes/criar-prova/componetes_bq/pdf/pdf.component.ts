import { Questao, QuestoesProva, Prova } from '../../../../../models/conteudos.model';
import { BqService } from '../../../../../services/service_bq/bq.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class NewPdfComponent {
  prova: any;
  cabecalho?: boolean;
  constructor(private service: BqService, private router: Router) {

  }
  ngOnInit() {
    this.prova = this.service.getProva;

  }

}
