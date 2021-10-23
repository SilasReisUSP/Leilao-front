import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Produto } from '../models/Produto';

@Injectable()
export class ProdutoService {

  produtoUrl = 'http://localhost:2828/'

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
    

  addProduto(produto: Produto, token: string) : Observable<any> {
    console.log('produto', produto);
    const formData = new FormData();
    formData.append('fotoLeilao', produto?.fotoLeilao, produto.fotoLeilao.name)
    formData.append('nome', 'Leilao1');
    formData.append('dataInicio', 'Leilao1');
    formData.append('dataFinal', 'Leilao1');
    formData.append('valorInicial', '200');
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    return this.http.post(this.produtoUrl+"products", formData, this.httpOptions)
  }

  getProdutos(token: string) : Observable<any> {
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    return this.http.get(this.produtoUrl+"products", this.httpOptions)
  }
}
