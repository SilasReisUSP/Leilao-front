import { Component, OnInit, Output, EventEmitter, ViewChild, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { SocketioService } from '../services/socketio.service';
import { MessageSocketResponse, SendMessage, UserSocketResponse } from './types';
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
export class ChatComponent implements OnInit, AfterViewInit {
  username: string;
  room: string | null;
  roomName: string;
  message: string;
  messages: MessageSocketResponse[] = [];
  users: UserSocketResponse[] = [];
  idLeilao: string | null;
  token: string;
  produto: ProdutoResponse;
  
  timeLeft: number = 6000;
  interval: any;

  @ViewChild('chatMessages') chatMessagesElem: ElementRef;
  @ViewChildren('messages') messagesElem: QueryList<any>;

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

    this.socketIoService.connect();
    this.socketIoService.getRoomAndUsers().subscribe(data => {
      const { messages, users } = data;
      console.log('dat', data);
      if (messages) this.setMessages(messages);
      if (users) this.setUsers(users);
    })
    this.socketIoService.receiveMessages().subscribe(message => {
      this.setMessages([message]);
    })

    this.produtoService.getProdutoId(this.idLeilao, this.token)
    .subscribe((produto: ProdutoResponse) => {
      this.produto = produto;
      this.username = getUser().nome || '';
      this.socketIoService.joinRoom(this.username, this.room, produto.nome);
    }, err => console.log(err))

    this.usuarioService.getUsuario(this.token)
    .subscribe(rst => {
      this.username = rst.nome;
    }, 
    err => console.log(err))

    this.startTimer();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messagesElem.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.chatMessagesElem.nativeElement.scrollTop = this.chatMessagesElem.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    this.socketIoService.sendMessage(this.message);
    this.message = ''
  }

  setMessages(messages: MessageSocketResponse[]) {
    this.messages = [...this.messages, ...messages];
  }

  setUsers(users: UserSocketResponse[]) {
    this.users = users;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }
}
