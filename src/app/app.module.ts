import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NewHomeComponent } from './views/home/home.component';
import { NewAccess_bqComponent } from './views/home/componentes_home/access_bq/access_bq.component';
import { NewMenuComponent } from './componentes_compartilhados/shared/menu.component';
import { NewModal_LoginComponent } from './modais/modal_login/modal_login.component';
import { NewModal_EsqueciSenhaComponent } from './modais/modal_esqueci_senha/modal_esqueci_senha.component';
import { NewModal_MenuComponent } from './modais/modal_menu/modal_menu.component';
import { NewCarroselComponent } from './views/home/componentes_home/carrosel/carrosel.component';
// import { NewConteudosComponent } from './views/home/componentes_home/materiais_digitais/componentes_materiais_digitais/conteudos/conteudos.component';
import { NewFooterComponent } from './componentes_compartilhados/footer_page/footer_page.component';
import { NewBanco_de_questoesComponent } from './views/banco_de_questoes/criar-prova/banco_de_questoes.component';
import { NewModal_CadastroComponent } from './modais/modal_cadastro/modal_cadastro.component';
import { NewMateriais_digitaisComponent } from './views/home/componentes_home/materiais_digitais/materiais_digitais.component';
import { NewModal_open_conteudoComponent } from './modais/modal_open_conteudo/modal_open_conteudo.component';
import { modalDetalhesQuestao } from './views/banco_de_questoes/criar-prova/componetes_bq/modais_bq/modal_DetalhesQuestao/modalDetalhesQuestao.component';
import { NewModalVisualizarProvaComponent } from './views/banco_de_questoes/criar-prova/componetes_bq/modais_bq/modalVisualizarProva/modalVisualizarProva.component';
import { NewModalDownloadProvaComponent} from './views/banco_de_questoes/criar-prova/componetes_bq/modais_bq/modalDownloadProva/modalDownloadProva.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewMinhasProvasComponent } from "./views/banco_de_questoes/minhas-provas/minhas-provas.component"
import { NewModalDownloadProva_VisualizarProvaComponent } from "./views/banco_de_questoes/minhas-provas/componentes_MinhasProvas/modalDownloadQuestao_VisualizarProva/modalDownloadProva_VisualizarProva.component"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DataTablesModule } from "angular-datatables";
import { NewPdfComponent } from "./views/banco_de_questoes/criar-prova/componetes_bq/pdf/pdf.component";
import { ModalCadastroSucessoComponent } from './modais/modal-cadastro-sucesso/modal-cadastro-sucesso.component'
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NewHomeComponent,
    NewMenuComponent,
    NewModal_LoginComponent,
    NewModal_EsqueciSenhaComponent,
    NewModal_MenuComponent,
    NewModal_CadastroComponent,
    NewAccess_bqComponent,
    NewCarroselComponent,
    NewMateriais_digitaisComponent,
    NewFooterComponent,
    NewBanco_de_questoesComponent,
    NewModal_open_conteudoComponent,
    modalDetalhesQuestao,
    NewModalVisualizarProvaComponent,
    NewModalDownloadProvaComponent,
    NewPdfComponent,
    NewMinhasProvasComponent,
    NewModalDownloadProva_VisualizarProvaComponent,
    ModalCadastroSucessoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    CarouselModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    NgbModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue:'BRL',
    },
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





