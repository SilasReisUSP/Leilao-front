import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { getUser } from '../helpers';
import { Produto } from '../models/Produto';
import { ProdutoService } from '../services/produto.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-meus-leiloes',
  templateUrl: './meus-leiloes.component.html',
  styleUrls: ['./meus-leiloes.component.css']
})
export class MeusLeiloesComponent implements OnInit {

  paginaAtual = 1
  token: string
  leilaoList: Produto[] = []
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  
  constructor(private routes: Router, private usuarioService: UsuarioService
    ,private produtoService: ProdutoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.usuarioService.token.subscribe(valor => this.token = valor)

    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }

    const usuario = getUser();

    this.produtoService.getProdutos(this.token)
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
      // .filter((data: any) => data.usuario !== usuario._id);      
      this.leilaoList = data
    },
     err => console.log(err))
  }

  changePage(page: number) {
    this.produtoService.getProdutos(this.token)
    .subscribe(rst => this.leilaoList = rst,
     err => console.log(err))
  }
}

