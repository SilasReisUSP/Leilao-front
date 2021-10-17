import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  token: string
  leilaoList: Produto[] = []
  
  constructor(private routes: Router, private usuarioService: UsuarioService
    ,private produtoService: ProdutoService) { }

  ngOnInit(): void {

    this.usuarioService.token.subscribe(valor => this.token = valor)

    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }

    this.produtoService.getProdutos(this.token)
    .subscribe(rst => this.leilaoList = rst,
     err => console.log(err))
  }
}
