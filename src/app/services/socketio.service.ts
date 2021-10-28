import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { environment } from "src/environments/environment";
import {
  MessageSocketResponse,
  SendMessage,
  UserSocketResponse,
} from "../chat/types";
import { ProdutoResponse } from "../models/ProdutoResponse";

@Injectable({
  providedIn: "root",
})
export class SocketioService {
  private socket: Socket;

  constructor() {}

  connect() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  joinRoom(username: string, room: any, roomName?: string): void {
    this.socket.emit("joinRoom", { username, room, roomName });
  }

  getRoomAndUsers() {
    return new Observable<{
      room: string;
      users?: UserSocketResponse[];
      messages?: MessageSocketResponse[];
    }>((observer) => {
      this.socket.on(
        "roomUsers",
        (data: {
          room: string;
          users?: UserSocketResponse[];
          messages?: MessageSocketResponse[];
        }) => {
          observer.next(data);
        }
      );
    });
  }

  sendMessage(data: string | number) {
    this.socket.emit("message", data);
  }

  receiveJoinRoom() {
    return new Observable<string>((observer) => {
      this.socket.on("joinRoom", (message) => {
        observer.next(message);
      });
    });
  }

  receiveMessages() {
    return new Observable<MessageSocketResponse>((observer) => {
      this.socket.on("message", (message) => {
        observer.next(message);
      });
    });
  }

  getCurrentValue() {
    return new Observable<{ currentValue: number, currentTime?: number }>((observer) => {
      this.socket.on("currentValue", (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
