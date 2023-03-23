import { Component } from '@angular/core';
import { Data } from 'popper.js';
export interface Login {
  Login_Usuario?: string;
  Senha?: string;
}

export interface Error {
  error?: boolean;
  token: string;
  user:any;
}

