import { CadastroService } from '../../services/service_cadastro/cadastro.service';
import { Cadastro } from '../../models/cadastro.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal_cadastro',
  templateUrl: './modal_cadastro.component.html',
  styleUrls: ['./modal_cadastro.component.scss'],
})
export class NewModal_CadastroComponent {
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

  constructor(private service: CadastroService, private router: Router) {
  }
  ngOnInit() {
    $(".aviso").hide();
    $(".aviso1").hide();
    $(".aviso2").hide();
    $(".aviso3").hide();
    $(".aviso4").hide();
    $(".aviso5").hide();
    $(".aviso6").hide();
    $("#Alerta").hide();
    $("#AlertEmailCadastrado").hide();
    $("#AlertApiTimeout").hide();
  }
  ngDoCheck(){

  }

  validacaoName(){
    if($("#Name").hasClass("ng-invalid")){
      this.tamanhoModal();
      $(".aviso").show();
      $("#Name").addClass("ngInvalid")
    }
    else {
      $(".aviso").hide();
      $("#Name").removeClass("ngInvalid")
     }
    }
    validacaoCep(){
      if($("#cbx_Sim_correio").is(':checked')){
        this.tamanhoModal();
       if(this.CEP == undefined || this.CEP == ""){
        $("#Cep").addClass('ngInvalid');
        $(".aviso3").show();
       }
       else{
        $("#Cep").removeClass('ngInvalid');
        $(".aviso3").hide();
       }
      }
      else{
        $("#Cep").removeClass('ngInvalid');
        $(".aviso3").hide();
      }
    }
    validacaoBairro(){
      if($("#cbx_Sim_correio").is(':checked')){
        this.tamanhoModal();
        if(this.Bairro == undefined || this.Bairro == ""){
         $("#Bairro").addClass('ngInvalid');
         $(".aviso5").show();
        }
        else{
         $("#Bairro").removeClass('ngInvalid');
         $(".aviso5").hide();
        }
       }
       else{
         $("#Bairro").removeClass('ngInvalid');
         $(".aviso5").hide();
       }
    }
    validacaoEndereco(){
      if($("#cbx_Sim_correio").is(':checked')){
        this.tamanhoModal();
        if(this.Logradouro == undefined || this.Logradouro == ""){
         $("#Endereco").addClass('ngInvalid');
         $(".aviso4").show();
        }
        else{
         $("#Endereco").removeClass('ngInvalid');
         $(".aviso4").hide();
        }
       }
       else{
         $("#Endereco").removeClass('ngInvalid');
         $(".aviso4").hide();
       }
    }
    validacaoNumero(){
      if($("#cbx_Sim_correio").is(':checked')){
        this.tamanhoModal();
        if(this.Numero_Residencia == undefined || this.Numero_Residencia == ""){
         $("#Numero").addClass('ngInvalid');
         $(".aviso6").show();
        }
        else{
         $("#Numero").removeClass('ngInvalid');
         $(".aviso6").hide();
        }
       }
       else{
         $("#Numero").removeClass('ngInvalid');
         $(".aviso6").hide();
       }
    }
    validacaoEmail(){
      if($("#Email").hasClass("ng-invalid")){
        $(".aviso1").show();
        $("#Email").addClass("ngInvalid")
        this.tamanhoModal();
      }
      else {
        $(".aviso1").hide();
        $("#Email").removeClass("ngInvalid")
      }
    }
    validacaoSenha(){
    if($("#Senha").hasClass("ng-invalid")){
      $(".aviso2").show();
      $("#Senha").addClass("ngInvalid")
    }
    else {
      $(".aviso2").hide();
      $("#Senha").removeClass("ngInvalid")
    }
  }
  VerificarTodos(){
    this.validacaoName();
    this.validacaoEmail();
    this.validacaoSenha();
    this.validacaoCep();
    this.validacaoEndereco();
    this.validacaoBairro();
    this.validacaoNumero();
    this.tamanhoModal();
    if($("#cbx_Sim_correio").is(':checked')){
      if($("#Name").hasClass("ng-invalid") || $("#Email").hasClass("ng-invalid") || $("#Senha").hasClass("ng-invalid") || this.Numero_Residencia == undefined || this.Numero_Residencia == "" || this.Logradouro == undefined || this.Logradouro == "" || this.Bairro == undefined || this.Bairro == "" || this.CEP == undefined || this.CEP == ""){
        $("#Alerta").show();
        return false
      }
      else{
          $("#Alerta").hide();
          return true
      }
    }
    else{
      if($("#Name").hasClass("ng-invalid") || $("#Email").hasClass("ng-invalid") || $("#Senha").hasClass("ng-invalid")){
        $("#Alerta").show();
        return false
      }
      else{
        $("#Alerta").hide();
        return true
      }
    }

  }
  removeCheck(){
    $("#cbx_Nao").prop('checked', false);
  }
  removeCheckSim(){
    $("#cbx_Sim").prop('checked', false);
  }
  removeCheckEmail(){
    $("#cbx_Nao_email").prop('checked', false);
  }
  removeCheckSimEmail(){
    $("#cbx_Sim_email").prop('checked', false);
  }
  removeCheckCorreio(){
    $("#cbx_Nao_correio").prop('checked', false);
    if($("#cbx_Sim_correio").is(':checked')){
    $("#Cep").addClass('ngInvalid');
    $("#Endereco").addClass('ngInvalid');
    $("#Bairro").addClass('ngInvalid');
    $("#Numero").addClass('ngInvalid');
    $(".aviso3").show();
    $(".aviso4").show();
    $(".aviso5").show();
    $(".aviso6").show();
    }
    else{
    $("#Cep").removeClass('ngInvalid');
    $("#Endereco").removeClass('ngInvalid');
    $("#Bairro").removeClass('ngInvalid');
    $("#Numero").removeClass('ngInvalid');
    $(".aviso3").hide();
    $(".aviso4").hide();
    $(".aviso5").hide();
    $(".aviso6").hide();
    }
  }
  removeCheckSimCorreio(){
    $("#cbx_Sim_correio").prop('checked', false);
    $("#Cep").removeClass('ngInvalid');
    $("#Endereco").removeClass('ngInvalid');
    $("#Bairro").removeClass('ngInvalid');
    $("#Numero").removeClass('ngInvalid');
    $(".aviso3").hide();
    $(".aviso4").hide();
    $(".aviso5").hide();
    $(".aviso6").hide();
  }
  Cadastrar(){
    const dadosCadastro: Cadastro = ({
      Nome: this.Nome,
      Email: this.Email,
      Celular: this.Celular,
      CEP: this.CEP,
      Escola: this.Escola,
      Rede: this.Rede,
      Estado: this.Estado,
      Cidade: this.Cidade,
      Bairro: this.Bairro,
      Logradouro: this.Logradouro,
      Numero_Residencia: this.Numero_Residencia,
      Complemento: this.Complemento,
      Senha: this.Senha,
      Cargo: this.Cargo,
      Segmento: this.Segmento,
      Comunicacao_Whatsapp: this.Comunicacao_Whatsapp,
      Comunicacao_Email_Marketing: this.Comunicacao_Email_Marketing,
      Receber_Materiais_Correios: this.Receber_Materiais_Correios,
      Termo_Aceito: true
    })
    console.log(dadosCadastro);
    this.service.post(dadosCadastro).subscribe({
      next: res => {
        console.log(res);
        $('.modal').modal("hide");
        $('#modal_cadastro_sucesso').modal("show");
      },
      error: error => {
        console.error('Ocorreu um erro!', error);
        if(error.status == 400) {
          $("#AlertApiTimeout").hide();
          $("#AlertEmailCadastrado").show();
        }
        if(error.status == 0) {
          $("#AlertEmailCadastrado").hide();
          $("#AlertApiTimeout").show();
        }
      }
    })
  }
  tamanhoModal(){
    $(".modal-body").css({"height":"2730px"});
  }
}
