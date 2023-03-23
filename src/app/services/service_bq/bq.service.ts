import { Componente } from '../../models/conteudos.model';
import { Ano } from '../../models/conteudos.model';
import { Segmento } from '../../models/conteudos.model';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const URL: any = {
  API: environment.urlApi
}
@Injectable({
  providedIn: 'root'
})
export class BqService {
  private segmento: any[];
  private ano: any[];
  private componete: any[];
  private tipoQuestao: any[];
  private Questao: any[];
  private questaoProva: any[];
  private prova: any[];
  public currentNavItem?: string;

constructor(private httpClient: HttpClient) {
  this.segmento= [];
  this.ano= [];
  this.componete= [];
  this.tipoQuestao=[];
  this.Questao=[];
  this.questaoProva=[];
  this.prova=[];
}
getQntdQuestoes(){
  return this.httpClient.post(URL.API + "BancoQuestoes/QuantidadeQuestoes",{});
}

getSegmento(auth_token: any): Observable<Error> {
  const headers = auth_token; 
  return this.httpClient.post<Error>(URL.API + "BancoQuestoes/ListarSegmento", Error, {headers});
}

getComponente(auth_token: any, segmentoValue: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ListarComponente", segmentoValue, {headers});
}

getSeries(auth_token: any, componenteValue: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ListarSerie", componenteValue, {headers});
}

getQuestoes(auth_token: any, serieValue: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ListarQuestoes", serieValue, {headers});
}

getProvas(auth_token: any, data: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ListarMinhasProvas", data, {headers});
}

getQuestoesPalavraChave(auth_token: any, palavraChave: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ListarQuestoes", palavraChave, {headers});
}

consultarQuestao(auth_token: any, data: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ConsultarQuestao", data, {headers});
}

salvarProva(auth_token: any, data: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/SalvarProva", data, {headers});
}

listarQuestoesProva(auth_token: any, data: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ListarQuestoesProva", data, {headers});
}

excluirProva(auth_token: any, data: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/ExcluirProva", data, {headers});
}

downloadPdf(auth_token: any, data: any) {
  const headers = auth_token; 
  return this.httpClient.post(URL.API + "BancoQuestoes/DownloadPdf", data, { responseType: 'blob'});
}

downloadDoc(auth_token: any, data: any): Observable<any> {
  const headers = auth_token; 
  return this.httpClient.post<any>(URL.API + "BancoQuestoes/DownloadDoc", data, {headers});
}

uploadFile(auth_token: any, formData: any) {
  const headers = auth_token; 
  return this.httpClient.post(URL.API + "BancoQuestoes/Upload", formData, {reportProgress: true, observe: 'events'})
}

get getAno() {
  return this.ano;
}
get getComponete() {
  return this.componete;
}
get getTipoQuestão() {
  return this.tipoQuestao;
}
get getQuestão() {
  return this.Questao;
}
get getQuestaoProva() {
  return this.questaoProva;
}
get getProva() {
  return this.prova;
}
adicionar(dados: any){
  this.segmento.push(dados);
}
adicionarAno(dadosAno: any){
  this.ano.push(dadosAno);
}
adicionarComponente(dadosComponente: any){
  this.componete.push(dadosComponente);
}

adicionarTipoQuestao(dadosTipo: any){
  this.tipoQuestao.push(dadosTipo);
}
adicionarQuestao(questão: any){
  this.Questao.push(questão);
}
adicionarQuestaoProva(questaodaProva: any){
  this.questaoProva.push(questaodaProva);
}
adicionarProva(componentesProva: any){
  this.prova.push(componentesProva);
}
removeQuestao(id: number, questao: any){
  this.questaoProva  = this.questaoProva.filter((item) => item.questao !== questao );
}
currentNavItemSet(itemNav: any){
  return itemNav;
}

}
