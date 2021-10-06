import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
export interface Produto{
  produto: string;
  localizacao: string;
  lanceInicial: number;
}

@Injectable()
export class CadastroProdutoService {

  produtoUrl = 'http://localhost:2828/cadastro-produto'

  constructor(private http: HttpClient) { }

  addProduto(produto: Produto) : Promise<Produto> {
    return this.http.post<Produto>(this.produtoUrl, produto, httpOptions).toPromise()
  }
}
