import { Injectable } from '@angular/core';
import { Usuario } from '../interface/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioVerificado: boolean = false
  constructor() { }

  fazerLogin(usuario: Usuario){
    this.usuarioVerificado = true;
  }
}
