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
export class CadastroUsuarioService {

  usuarioUrl = 'http://localhost:2828/cadastro'

  constructor(private http: HttpClient) { }

  addUsuario(usuario: Usuario) : Promise<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl, usuario, httpOptions).toPromise()
  }
}
