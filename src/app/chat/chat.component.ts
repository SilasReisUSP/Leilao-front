import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SocketioService } from '../services/socketio.service';
import { MessageResponse, SendMessage } from './types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username = 'Wallace';
  room = 'sala1';
  message: string;
  messages: MessageResponse[];

  constructor(private socketIoService: SocketioService) {}

  async ngOnInit(): Promise<void> {
    this.socketIoService.connect();
    this.messages = [...this.messages, ...(await this.socketIoService.joinRoom(this.username, this.room))];
    this.socketIoService.receiveMessages().subscribe(message => this.messages.push(message))
  }

  sendMessage() {
    const data = { message: this.message, room: this.room, username: this.username }; //TODO corrigir dados mockados
    this.socketIoService.sendMessage(data);
    this.message = ''
  }

  // joinRoom() {
  //   this.socketIoService.receiveJoinRoom().subscribe((message: string) => {
  //     console.log('mesa', message);
  //   })
  // }
}
