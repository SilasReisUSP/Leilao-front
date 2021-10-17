import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Produto } from '../models/Produto';

@Injectable()
export class ProdutoService {

  produtoUrl = 'http://localhost:2828/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
    

  addProduto(produto: Produto, token: string) : Observable<any> {
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    return this.http.post(this.produtoUrl+"products", produto, this.httpOptions)
  }
}
