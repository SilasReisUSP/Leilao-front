import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/Produto';
import { ProdutoService } from '../services/produto.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-meus-leiloes',
  templateUrl: './meus-leiloes.component.html'
})
export class MeusLeiloesComponent implements OnInit {

  //Variavel utilizada para paginacao
  paginaAtual = 1
  //Variavel que armazena token do usuario para enviar ao servico
  token: string
  //Armazenamento da lista de leiloes
  leilaoList: Produto[] = []
  
  constructor(private routes: Router, private usuarioService: UsuarioService
    ,private produtoService: ProdutoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    //Recebe o valor do token mais atual
    this.usuarioService.token.subscribe(valor => this.token = valor)

    //Se nao tiver token, o usuario e redirecionado para a rota de Login
    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }

    //Buscando os produtos do usuario, passando o token como parametro
    this.produtoService.getMeusProdutos(this.token)
    //Se houver uma resposta do servidor entao e mapeado todos os dados recebido na constante data
    .subscribe(rst => {
      const data = rst.data.map((data: any) => ({ 
        id: data._id,
        dataFinal: data.dataFinal, 
        dataInicio: data.dataInicio, 
        localizacao: data.localizacao, 
        nome: data.nome, 
        valorInicial: data.valorInicial,
        fotoLeilao: environment.FILES+data.urlImagem,
        usuario: data.usuario
      }))
      //todos os produtos que estao em data sao passados para leilaoList, que renderiza no html
      this.leilaoList = data
    })
  }
}

