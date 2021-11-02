import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { UsuarioService } from '../../services/usuario.service';

import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { utilsBr } from 'js-brasil';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html'
})
export class CadastroProdutoComponent implements OnInit {

  cadastroPForm: any
  MASKS = utilsBr.MASKS;
  mensagemAnexoFoto!: string;
  token!: string;

  constructor(private routes: Router, private cadastroProdutoService: ProdutoService,
     private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.token.subscribe(valor => this.token = valor);

    //Validando se o usuario esta logado
    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }
    
    //criando as regras das datas, elas nao foram criadas dentro do FormGroup
    //porque a dataFinal depende da dataInicio
    let dataInicio = new FormControl(new Date().toISOString().slice(0,16), 
        [Validators.required,
        CustomValidators.minDate(new Date()),
        CustomValidators.maxDate(new Date().setMonth(new Date().getMonth() + 10))]);

    let dataFinal = new FormControl(new Date().toISOString().slice(0,16), 
        [Validators.required, 
        CustomValidators.minDate(new Date()),
        CustomValidators.maxDate(new Date().setMonth(new Date().getMonth() + 10))]);

        //Definindo inputs do form com suas respectivas validacoes
    this.cadastroPForm= new FormGroup({

      nome: new FormControl('', [Validators.required, Validators.minLength(2), 
                                    Validators.maxLength(50)]),

      valorInicial: new FormControl('',[Validators.required, Validators.min(1), 
                                    Validators.max(1000000)]),
      dataInicio: dataInicio,

      dataFinal: dataFinal,

      fotoLeilao: new FormControl('', [Validators.required])
    });
    
  }

  //Ao chamar este metodo, e enviado os valores inseridos pelo usuario para o servico, juntamente com o token e retornado uma
  //resposta do back
  cadastrarProduto() : void {
    this.cadastroProdutoService.addProduto(this.cadastroPForm.value, this.token)
    //Caso a resposta do back seja positva (status 200), e informado que o cadastro foi realizado com sucesso
    .subscribe(rst => {
      console.log('rst', rst)
      Swal.fire({
          icon: 'success',
           title: 'Sucesso',
           text: 'Cadastro de leilao realizado com sucesso'
       });
       //Redirecionando o usuario para a tela de Home
      this.routes.navigate(['/Home'])
      }, 
      //Caso a resposta do back seja negativa (status 400, 404, etc), e informado o erro pela mensagem
      rst =>{
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: rst.error
      })
    })
  }

  //Validacao da foto que foi anexada, so e permitido fotos .png e .jpg
 anexarFoto(event: any){
  if(event.target.files.length > 0) {
    const file = event.target.files[0];
    if(file.name.includes('.jpg') || file.name.includes('.png'))
    {
      this.cadastroPForm.patchValue({ fotoLeilao: file});
      this.mensagemAnexoFoto = '';
    }
      
    else
      this.mensagemAnexoFoto = "Arquivo inválido. Só é aceito arquivos .jpg e .png";
  }
  else
    this.mensagemAnexoFoto = "Nenhum arquivo escolhido";
 }

 //Formatacao do valor inciado inserido pelo usuario 
 formatarValorFinal() {
  let teste = this.cadastroPForm.get('valorInicial').value;
  if(!this.cadastroPForm.get('valorInicial').value.includes(',') && this.cadastroPForm.get('valorInicial').value != '') {
    this.cadastroPForm.get('valorInicial').setValue(this.cadastroPForm.get('valorInicial').value + ',00')
  }
    
 }

 //Metodos facilitadores para validar os dados no arquivo .html
  get nome() { return this.cadastroPForm.get('nome') }

  get valorInicial() { return this.cadastroPForm.get('valorInicial')}

  get dataInicio() { return this.cadastroPForm.get('dataInicio') }

  get dataFinal() { return this.cadastroPForm.get('dataFinal') }
}
