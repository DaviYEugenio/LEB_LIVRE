import { NgModule } from '@angular/core';
import { NewHomeComponent } from './views/home/home.component';
import { NewModal_CadastroComponent } from './modais/modal_cadastro/modal_cadastro.component';
import { NewMenuComponent } from './componentes_compartilhados/shared/menu.component';
import { NewAccess_bqComponent } from './views/home/componentes_home/access_bq/access_bq.component';
import { modalDetalhesQuestao } from './views/banco_de_questoes/criar-prova/componetes_bq/modais_bq/modal_DetalhesQuestao/modalDetalhesQuestao.component';
import { NewModal_LoginComponent } from './modais/modal_login/modal_login.component';
import { NewModal_EsqueciSenhaComponent } from './modais/modal_esqueci_senha/modal_esqueci_senha.component';
import { NewCarroselComponent } from './views/home/componentes_home/carrosel/carrosel.component';
import { NewBanco_de_questoesComponent } from './views/banco_de_questoes/criar-prova/banco_de_questoes.component';
import { NewFooterComponent } from './componentes_compartilhados/footer_page/footer_page.component';
import { NewModal_MenuComponent } from './modais/modal_menu/modal_menu.component';
import { NewModal_open_conteudoComponent } from './modais/modal_open_conteudo/modal_open_conteudo.component';
import { NewMateriais_digitaisComponent } from './views/home/componentes_home/materiais_digitais/materiais_digitais.component';
import { NewModalVisualizarProvaComponent } from './views/banco_de_questoes/criar-prova/componetes_bq/modais_bq/modalVisualizarProva/modalVisualizarProva.component';
import { NewModalDownloadProvaComponent} from './views/banco_de_questoes/criar-prova/componetes_bq/modais_bq/modalDownloadProva/modalDownloadProva.component'
import { NewPdfComponent } from "./views/banco_de_questoes/criar-prova/componetes_bq/pdf/pdf.component"
import { NewModalDownloadProva_VisualizarProvaComponent } from "./views/banco_de_questoes/minhas-provas/componentes_MinhasProvas/modalDownloadQuestao_VisualizarProva/modalDownloadProva_VisualizarProva.component"
import { NewMinhasProvasComponent } from "./views/banco_de_questoes/minhas-provas/minhas-provas.component"
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: NewHomeComponent},
  {path: 'menu', component: NewMenuComponent},
  {path: 'modal_login', component: NewModal_LoginComponent},
  {path: 'modal_esqueci', component: NewModal_EsqueciSenhaComponent},
  {path: 'modal_Menu', component: NewModal_MenuComponent},
  {path: 'modal_cadastro', component: NewModal_CadastroComponent},
  {path: 'access_bq', component: NewAccess_bqComponent},
  {path: 'modal_detalhes_questao', component: modalDetalhesQuestao},
  {path: 'footer', component: NewFooterComponent},
  {path: 'materiais_digitais', component: NewMateriais_digitaisComponent},
  {path: 'carrosel', component: NewCarroselComponent},
  {path: 'banco_de_questoes', component: NewBanco_de_questoesComponent},
  {path: 'modal_open_conteudo', component: NewModal_open_conteudoComponent},
  {path: 'modalVisualizarProva', component: NewModalVisualizarProvaComponent},
  {path: 'modalDownloadProva', component: NewModalDownloadProvaComponent},
  {path: 'pdf', component: NewPdfComponent},
  {path: 'minhas-provas', component: NewMinhasProvasComponent},
  {path: 'modalDownloadProva_VisualizarProva', component: NewModalDownloadProva_VisualizarProvaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
