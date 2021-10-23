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
    
    //criando as regrada das datas, elas nao foram criadas dentro do FormGroup
    //porque a dataFinal depende da dataInicio
    let dataInicio = new FormControl(new Date().toISOString().slice(0,16), 
        [Validators.required,
        CustomValidators.minDate(new Date()),
        CustomValidators.maxDate(new Date().setMonth(new Date().getMonth() + 10))]);

    let dataFinal = new FormControl(new Date().toISOString().slice(0,16), 
        [Validators.required, 
        CustomValidators.minDate(new Date()),
        CustomValidators.maxDate(new Date().setMonth(new Date().getMonth() + 10))]);

    this.cadastroPForm= new FormGroup({

      nome: new FormControl('', [Validators.required, Validators.minLength(2), 
                                    Validators.maxLength(50)]),

      localizacao: new FormControl('', [Validators.required]),

      valorInicial: new FormControl('',[Validators.required, Validators.min(1), 
                                    Validators.max(1000000)]),
      dataInicio: dataInicio,

      dataFinal: dataFinal,

      fotoLeilao: new FormControl('', [Validators.required])
    });
  }
  cadastrarProduto() : void {
    this.cadastroProdutoService.addProduto(this.cadastroPForm.value, this.token)
    .subscribe(rst => {
      console.log('rst', rst)
      // Swal.fire({
      //     icon: 'success',
      //      title: 'Sucesso',
      //      text: rst.message
      //  });
      // this.routes.navigate(['/Home'])
      // }, 
      // rst =>{
      //  Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: rst.error
      // })
    })
  }

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

 formatarValorFinal() {
  let teste = this.cadastroPForm.get('valorInicial').value;
  if(!this.cadastroPForm.get('valorInicial').value.includes(',') && this.cadastroPForm.get('valorInicial').value != '') {
    this.cadastroPForm.get('valorInicial').setValue(this.cadastroPForm.get('valorInicial').value + ',00')
  }
    
 }
  get nome() { return this.cadastroPForm.get('nome') }

  get localizacao() { return this.cadastroPForm.get('localizacao')}

  get valorInicial() { return this.cadastroPForm.get('valorInicial')}

  get dataInicio() { return this.cadastroPForm.get('dataInicio') }

  get dataFinal() { return this.cadastroPForm.get('dataFinal') }
    
}
