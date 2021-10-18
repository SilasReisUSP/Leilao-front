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
  room = 'JavaScript';
  message: string;
  messages: MessageResponse[] = [];
  users: any[];

  constructor(private socketIoService: SocketioService) {}

  async ngOnInit(): Promise<void> {
    this.socketIoService.connect();
    this.socketIoService.joinRoom(this.username, this.room);
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

  // joinRoom() {
  //   this.socketIoService.receiveJoinRoom().subscribe((message: string) => {
  //     console.log('mesa', message);
  //   })
  // }
}
