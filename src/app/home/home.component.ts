import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto';
import { faArrowAltCircleLeft, faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';


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

    this.produtoService.getProdutos(this.token)
    .subscribe(rst => {
      console.log('produtos', rst)
      const data = rst.data.map((test: any) => ({ 
        dataFinal: test.dataFinal, 
        dataInicio: test.dataInicio, 
        localizacao: test.localizacao, 
        nome: test.nome, 
        valorInicial: test.valorInicial,
        fotoLeilao: this.convert(test.fotoLeilao) || ''
        // fotoLeilao: test.fotoLeilao?.data || ''
      }))
      console.log('produtos2', data)
      console.log('image', data[0].fotoLeilao?.data);
      this.leilaoList = data
    },
     err => console.log(err))
  }

  userImage(file: any) {
    let value = null;
    const image = `data:image/jpeg;base64,${file}`;
    value = this.sanitizer.bypassSecurityTrustUrl(image);
    return value;
  }

  _arrayBufferToBase64(buffer: any) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  convert(buffer: any) {
    const newBuffer = new Uint8Array(buffer)
    const blob = new Blob([newBuffer], { type: 'image/png' })
    const url = URL.createObjectURL(blob)
    return url
  }

  changePage(page: number) {
    this.produtoService.getProdutos(this.token)
    .subscribe(rst => this.leilaoList = rst,
     err => console.log(err))
  }
}
