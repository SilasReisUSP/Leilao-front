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
    formData.append('nome', produto?.nome);
    formData.append('dataInicio', produto?.dataInicio);
    formData.append('dataFinal', produto?.dataFinal);
    formData.append('valorInicial', produto?.valorInicial);
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    return this.http.post(this.produtoUrl+"products", formData, this.httpOptions)
  }

  getProdutos(token: string) : Observable<any> {
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    return this.http.get(this.produtoUrl+"products", this.httpOptions)
  }

  getImage(): Observable<any> {
    const resp = this.http.get('http://localhost:2828/files/test.png', { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) })
    console.log('rs', resp);
    return resp;
  }

  getProdutoId(idLeilao: string | null, token: string): Observable<any> {
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
      const url = `${this.produtoUrl}products/${idLeilao}`
    return this.http.get(url, this.httpOptions)
  }
}
