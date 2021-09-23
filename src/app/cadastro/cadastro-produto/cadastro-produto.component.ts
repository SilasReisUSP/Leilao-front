import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html'
})
export class CadastroProdutoComponent implements OnInit {
  cadastroPForm: any
  
  constructor() { }

  cadastrarProduto(): void {

  }

  ngOnInit(): void {
    this.cadastroPForm= new FormGroup({
      produto: new FormControl('', [Validators.required]),
      localizacao: new FormControl('', [Validators.required]),
      lanceInicial: new FormControl('', [Validators.required])
    });
  }

  get produto() { return this.cadastroPForm.get('produto') }
  get localizacao() { return this.cadastroPForm.get('localizacao')}
  get lanceInicial() { return this.cadastroPForm.get('lanceInicial')}

}
