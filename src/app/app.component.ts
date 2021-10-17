import { Component, OnInit } from '@angular/core';
import { SocketioService } from './services/socketio.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'leilao-front';

  constructor(private socketService: SocketioService, private usuarioService: UsuarioService) {}

  ngOnInit() {
    let token = localStorage.getItem('token')
    this.usuarioService.armazenarDadosLogin(token != null ? token : '')
  }
}
