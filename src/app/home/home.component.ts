import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto';
import { faArrowAltCircleLeft, faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { getUser } from '../helpers';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

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
        usuario: data.usuario,
        status: data.status
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
