import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto';
import { faArrowAltCircleLeft, faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';


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

    // this.produtoService.getImage().subscribe((res) => console.log(res))

    this.produtoService.getProdutos(this.token)
    .subscribe(rst => {
      const data = rst.data.map((test: any) => ({ 
        id: test._id,
        dataFinal: test.dataFinal, 
        dataInicio: test.dataInicio, 
        localizacao: test.localizacao, 
        nome: test.nome, 
        valorInicial: test.valorInicial,
        fotoLeilao: environment.FILES+test.urlImagem
      }))
      
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
