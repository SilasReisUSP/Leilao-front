import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CadastroProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { utilsBr } from 'js-brasil';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  providers: [CadastroProdutoService]
})
export class CadastroProdutoComponent implements OnInit {

  cadastroPForm: any
  MASKS = utilsBr.MASKS;
  mensagemAnexoFoto!: string;

  constructor(private routes: Router, private cadastroProdutoService: CadastroProdutoService) { }

  ngOnInit(): void {
    //Validando se o usuario esta logado
    if(localStorage.getItem('token') == null) {
      this.routes.navigate(['/Login']);
    }
    
    //criando as regrada das datas, elas nao foram criadas dentro do FormGroup
    //porque a dataTermino depende da dataInicio
    let dataInicio = new FormControl(new Date().toISOString().slice(0,16), 
        [Validators.required,
        CustomValidators.minDate(new Date()),
        CustomValidators.maxDate(new Date().setMonth(new Date().getMonth() + 10))]);

    let dataTermino = new FormControl(new Date().toISOString().slice(0,16), 
        [Validators.required, 
        CustomValidators.minDate(new Date(dataInicio.value+":00")),
        CustomValidators.maxDate(new Date().setMonth(new Date().getMonth() + 10))]);

    this.cadastroPForm= new FormGroup({

      produto: new FormControl('', [Validators.required, Validators.minLength(2), 
                                    Validators.maxLength(50)]),

      localizacao: new FormControl('', [Validators.required]),

      lanceInicial: new FormControl('',[Validators.required, Validators.min(1), 
                                    Validators.max(1000000)]),
      dataInicio: dataInicio,

      dataTermino: dataTermino,

      fotoLeilao: new FormControl('', [Validators.required])
    });
  }
  cadastrarProduto() : void {
    
    this.cadastroProdutoService.addProduto(this.cadastroPForm.value);
    
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
  get produto() { return this.cadastroPForm.get('produto') }

  get localizacao() { return this.cadastroPForm.get('localizacao')}

  get lanceInicial() { return this.cadastroPForm.get('lanceInicial')}

  get dataInicio() { return this.cadastroPForm.get('dataInicio') }

  get dataTermino() { return this.cadastroPForm.get('dataTermino') }
    
}
