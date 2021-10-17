import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  token!: string | null;
  
  constructor(private routes: Router, private usuarioService: UsuarioService ) { }
  
  ngOnInit(): void {
    this.usuarioService.token.subscribe(valor => this.token = valor);
  }

  sair() {
    this.usuarioService.armazenarDadosLogin('');
    localStorage.removeItem('token')
    this.routes.navigate(['/Login'])
  }


}
