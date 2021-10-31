import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Usuario } from '../models/Usuario';



@Injectable()
export class UsuarioService {

  //Rota do backend padrao
  private usuarioUrl = 'http://localhost:2828/'

  //Opcoes de configuracao da requisicao HTTP
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  
  //Esta variavel permite a atualizacao e utilizacao do token em diferentes componentes
  private tokenSource = new BehaviorSubject('');
  token = this.tokenSource.asObservable();

  constructor(private http: HttpClient) { }

  //Cadastro de usuario por requisicao POST
  addUsuario(usuario: Usuario) : Observable<any> {
    return this.http.post<Usuario>(this.usuarioUrl+"cadastro", usuario, this.httpOptions).pipe();
  }

  //Requisicao POST que envia o email e a senha para validacao do login, e retornando o token gerado do usuario pelo back
  fazerLogin(email: string, senha: string) : Observable<any>{
    return this.http.post<Usuario>(this.usuarioUrl+"login", {email, senha}, this.httpOptions).pipe();
  }

  //Metodo que atualiza o token do usuario (ele precisa ser atualizado quando entra e sai do sistema)
  armazenarDadosLogin(token: string) {
    this.tokenSource.next(token);
  }

  //Metodo que busca os dados do usuario logado
  getUsuario(tokenUser: string) : Observable<Usuario>{
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', tokenUser)
    //Requisicao GET que retorna os dados do usuario
    return this.http.get<Usuario>(this.usuarioUrl+"user", this.httpOptions)
  }

  //Metodo que apaga o token do usuario no back, e chamado quando ele sai do sistema
  saida(tokenUser: string) : Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', tokenUser)
    
      //Requisicao POST solicitando ao back para apagar o token do usuario
    return this.http.post<Usuario>(this.usuarioUrl+"saida", this.httpOptions)
  }
}
