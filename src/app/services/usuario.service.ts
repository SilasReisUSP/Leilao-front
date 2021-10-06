import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Usuario } from '../interface/Usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class UsuarioService {

  usuarioUrl = 'http://localhost:2828/'

  constructor(private http: HttpClient) { }

  addUsuario(usuario: Usuario) : Observable<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl+"cadastro", usuario, httpOptions).pipe();
  }

  fazerLogin(email: string, senha: string) : Observable<any>{
    return this.http.post<Usuario>(this.usuarioUrl+"login", {email, senha}, httpOptions).pipe();
  }
}
