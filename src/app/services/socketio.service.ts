import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { MessageResponse, SendMessage } from '../chat/types';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: Socket;

  constructor() {}

  connect() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  joinRoom(name: string, room: string): void {
    this.socket.emit('joinRoom', { name, room })
  }

  getRoomAndUsers() {
    return new Observable<{ room: string, users: any[], messages: { room: string, username: string, text: string, time: string }[]  }>((observer) => {
      this.socket.on('roomUsers', (data: { room: string, users: any[], messages: { room: string, username: string, text: string, time: string }[] }) => {
        observer.next(data);
      });
    });
  }

  sendMessage(data: string) {
    this.socket.emit('message', data);
  }

  receiveJoinRoom() {
    return new Observable<string>((observer) => {
      this.socket.on('joinRoom', (message) => {
        console.log('dsds',message );
        observer.next(message);
      });
    });
  }

  receiveMessages() {
    return new Observable<MessageResponse>((observer) => {
      this.socket.on('message', (message) => {
        console.log('message', message);
        observer.next(message);
      });
    });
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
}
