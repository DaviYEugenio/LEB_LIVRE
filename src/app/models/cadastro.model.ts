import { Component } from '@angular/core';
import { Data } from 'popper.js';
export interface Cadastro {
  Nome?: string;
  Email?: string;
  Celular?: string;
  CEP?: string;
  Rede?: string;
  Escola?: string;
  Estado?: string;
  Cidade?: string;
  Bairro?: string;
  Logradouro?: string;
  Numero_Residencia?: string;
  Complemento?: string;
  Senha?: string;
  Cargo?: string;
  Segmento?: string;
  Comunicacao_Whatsapp?: boolean;
  Comunicacao_Email_Marketing?: boolean;
  Receber_Materiais_Correios?: boolean;
  Termo_Aceito?: boolean;
}

export interface Error {
  error?: boolean;
}

