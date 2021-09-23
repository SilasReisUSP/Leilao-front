import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html'
})
export class CadastroProdutoComponent implements OnInit {
  cadastroPForm: any
  
  constructor() { }

  ngOnInit(): void {
    this.cadastroPForm= new FormGroup({
      produto: new FormControl('', [Validators.required]),
      localizacao: new FormControl('', [Validators.required])
    });
  }

}
