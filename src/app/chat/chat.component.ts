import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SocketioService } from '../services/socketio.service';
import { MessageResponse, SendMessage } from './types';
import { ActivatedRoute, Router} from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto';
import { ProdutoResponse } from '../models/ProdutoResponse';
import { getUser } from '../helpers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string;
  room: string | null;
  roomName: string;
  message: string;
  messages: MessageResponse[] = [];
  users: any[];
  idLeilao: string | null;
  token: string;
  produto: ProdutoResponse;

  constructor(private socketIoService: SocketioService, 
    private routeId: ActivatedRoute, private usuarioService: UsuarioService,
    private routes: Router, private produtoService: ProdutoService) {}

  async ngOnInit(): Promise<void> {

    this.usuarioService.token.subscribe(valor => this.token = valor)

    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }

    this.idLeilao = this.routeId.snapshot.paramMap.get('id');
    this.room = this.idLeilao;

    this.produtoService.getProdutoId(this.idLeilao, this.token)
    .subscribe((rst: ProdutoResponse) => {
      this.produto = rst;
      this.username = getUser().nome || '';
      this.socketIoService.joinRoom(this.username, this.room, rst.nome);
    }, err => console.log(err))

    this.usuarioService.getUsuario(this.token)
    .subscribe(rst => {
      this.username = rst.nome;
    }, 
    err => console.log(err))

    this.socketIoService.connect();
        // this.messages = [...this.messages, ...(await this.socketIoService.joinRoom(this.username, this.room))];
    this.socketIoService.getRoomAndUsers().subscribe(data => {
      const { messages, users } = data;
      this.messages.push(...messages);
      this.users.push(users);
    })
    this.socketIoService.receiveMessages().subscribe(message => this.messages.push(message))
  }

  sendMessage() {
    this.socketIoService.sendMessage(this.message);
    this.message = ''
  }
}
