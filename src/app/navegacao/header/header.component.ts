import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { SocketioService } from 'src/app/services/socketio.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  token!: string;
  
  constructor(
    private routes: Router,
    private usuarioService: UsuarioService,
    private socketIoService: SocketioService
  ) { }
  
  //No inicio da pagina e atualizado o token para saber quais menus estarao disponiveis para o usuario
  ngOnInit(): void {
    this.usuarioService.token.subscribe(valor => this.token = valor);
  }

  //Metodo chamado quando o usuario clica em sair do sistema
  sair() {
    //Chama o metodo para apagar o token do back
    this.usuarioService.saida(this.token);
    //Apagando o token do servico
    this.usuarioService.armazenarDadosLogin('');
    //Removendo os dados do usuario e o token do localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('usuario');
    //Redirecionado o usuario para a tela de login
    this.routes.navigate(['/Login'])
  }


}
