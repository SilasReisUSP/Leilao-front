import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Produto } from '../models/Produto';
import { utilsBr } from "js-brasil";

@Injectable()
export class ProdutoService {

  //Rota do backend padrao
  produtoUrl = 'http://localhost:2828/'

  //Opcoes de configuracao da requisicao HTTP
  httpOptions = {
    headers: new HttpHeaders({
    })
  }

  constructor(private http: HttpClient) { }
    
  //Metodo que envia o produto a ser cadastrado para o back
  addProduto(produto: Produto, token: string) : Observable<any> {
    //Recebendo todos os dados do usuario
    const formData = new FormData();
    formData.append('fotoLeilao', produto?.fotoLeilao, produto.fotoLeilao.name)
    formData.append('nome', produto?.nome);
    formData.append('dataInicio', produto?.dataInicio);
    formData.append('dataFinal', produto?.dataFinal);
    formData.append('valorInicial', String(utilsBr.currencyToNumber(produto?.valorInicial)));
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    //Fazendo a requisicao com o metodo POST para o metodo /products do back, enviando todos os dados no formData
    //Sera retornado uma resposta para saber se foi cadastrado com sucesso
    return this.http.post(this.produtoUrl+"products", formData, this.httpOptions)
  }

  //Metodo que recebe todos os produtos cadastrados que estao disponiveis para o usuario participar
  getProdutos(token: string) : Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    //Requisicao GET para o caminho /products, retorna todos os produtos cadastrados
    return this.http.get(this.produtoUrl+"products", this.httpOptions)
  }

  //Metodo que recebe todos os produtos cadastrados pelo usuario
  getMeusProdutos(token: string) : Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    //Requisicao GET para o caminho /myproducts que retorna todos os produtos do usuario
    return this.http.get(this.produtoUrl+"myproducts", this.httpOptions)
  }

  //Metodo que envia o id do Leilao e recebe os dados do produto
  getProdutoId(idLeilao: string | null, token: string): Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)
    
    //Montando url para ser enviado ao back com o id do leilao
    const url = `${this.produtoUrl}products/${idLeilao}`

    //Requisao GET que retorna dados do produto a partir da informacao do id do leilao
    return this.http.get(url, this.httpOptions)
  }
}
