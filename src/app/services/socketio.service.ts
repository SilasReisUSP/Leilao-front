import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: Socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  joinRoom(username: string, room: string) {
    this.socket.emit('joinRoom', { username, room }, (messages: any[]) => {
      return messages;
    });
  }

  setupSocketConnection() {
    this.socket.emit('my message', 'Hello there from Angular.');



    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
}