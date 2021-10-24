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

  token!: string | null;
  
  constructor(
    private routes: Router,
    private usuarioService: UsuarioService,
    private socketIoService: SocketioService
  ) { }
  
  ngOnInit(): void {
    this.usuarioService.token.subscribe(valor => this.token = valor);
  }

  sair() {
    this.usuarioService.armazenarDadosLogin('');
    // TODO: DESCONECTAR SOCKET
    this.socketIoService.disconnect();
    localStorage.removeItem('token')
    localStorage.removeItem('usuario');
    this.routes.navigate(['/Login'])
  }


}
