import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CadastroProdutoService } from '../../services/produto.service';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html'
})
export class CadastroProdutoComponent implements OnInit {

  cadastroPForm: any
  constructor(private cadastroProdutoService: CadastroProdutoService) { }

  ngOnInit(): void {
    this.cadastroPForm= new FormGroup({
      produto: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      localizacao: new FormControl('', [Validators.required]),
      lanceInicial: new FormControl('',[Validators.required])
    });
  }
  cadastrarProduto() : void {
    this.cadastroProdutoService.addProduto(this.cadastroPForm.value);
  }
  get produto() { return this.cadastroPForm.get('produto') }

  get localizacao() { return this.cadastroPForm.get('localizacao')}

  get lanceInicial() { return this.cadastroPForm.get('lanceInicial')}

    
}
