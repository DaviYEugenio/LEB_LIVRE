import { Component } from '@angular/core';
import { Data } from 'popper.js';

export interface Conteudo {
  id?: any;
  name?: any;
  email?: any;
  tipoConteudo?: any;
  urlConteudo?: any;
  current?: any;

}
export class ConteudosParam{
  IdSegmento: any;
  IdMateria: any;
  IdSerie: any;
  IdTipoConteudo: any;
}

export interface Componente {
  id?: number;
  name?: string;

}
export interface Segmento {
  id?: number;
  name?: string;

}
export interface Ano {
  id?: number;
  name?: string;
}

export interface tipoQuestao {
  id?: number;
  name?: string;
}
export interface Questao {
  id?: number;
  componente?: string;
  serie?: string;
  enunciado?: string;
  conteudo?: any;
  resposta?: any;
  usada?: number;
}

export interface QuestoesProva {
  questao?: any[];
}

export interface Prova {
  id?: number;
  questao?: any[];
  logoProva?: string;
  cabecalho?: boolean;
  nome?: string;
  turma?: string;
  dataCriacao?: Date;
}
