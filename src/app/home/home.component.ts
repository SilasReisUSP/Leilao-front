import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { SocketioService } from '../services/socketio.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  //Variavel utilizada para paginacao
  paginaAtual = 1
  //Variavel que armazena token do usuario para enviar ao servico
  token: string
  //Armazenamento da lista de leiloes
  leilaoList: Produto[] = []
  
  constructor(private routes: Router, private usuarioService: UsuarioService
    ,private produtoService: ProdutoService, private sanitizer: DomSanitizer
    ,private socketService:SocketioService) { }

  ngOnInit(): void {
    this.socketService.disconnect()
    //Recebe o valor do token mais atual
    this.usuarioService.token.subscribe(valor => this.token = valor)

    //Se nao tiver token, o usuario e redirecionado para a rota de Login
    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }

    //Buscando produtos que o usuario podera participar do leilao, passando o token como parametro
    this.produtoService.getProdutos(this.token)
    .subscribe(rst => {
      //Se houver uma resposta do servidor entao e mapeado todos os dados recebido na constante data
      const data = rst.data.map((data: any) => ({ 
        id: data._id,
        dataFinal: data.dataFinal, 
        dataInicio: data.dataInicio, 
        localizacao: data.localizacao, 
        nome: data.nome, 
        valorInicial: data.valorInicial,
        fotoLeilao: environment.FILES+data.urlImagem,
        usuario: data.usuario,
        status: data.status
      }))   
      //todos os produtos que estao em data sao passados para leilaoList, que renderiza no html
      this.leilaoList = data
    })
  }
}
