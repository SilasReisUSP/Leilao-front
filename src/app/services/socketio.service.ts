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

  async joinRoom(username: string, room: string): Promise<MessageResponse[]> {
    return new Promise((resolve) => {
      this.socket.emit('joinRoom', { username, room }, (messages: MessageResponse[]) => {
        resolve(messages);
      })
    });
    // let roomMessages: MessageResponse[] = [];
    
    //   console.log('messages', messages);
    //   roomMessages = messages;
    //   return messages; 
    // });
  }

  sendMessage(data: SendMessage) {
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
