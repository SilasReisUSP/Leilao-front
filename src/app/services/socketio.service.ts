import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { environment } from "src/environments/environment";
import {
  MessageSocketResponse,
} from "../chat/types";
import { JoinRoomResponse } from "../models/JoinRoomResponse";
import { RoomUsers } from "../models/RoomUsers";

@Injectable({
  providedIn: "root",
})
export class SocketioService {
  private socket: Socket;

  constructor() {}

  connect() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  joinRoom(userId: string, room: any, username: string, roomName?: string): Observable<JoinRoomResponse> {
    return new Observable<JoinRoomResponse>((observer) => {
      this.socket.emit("joinRoom", { userId, room, roomName, username }, (
        data: JoinRoomResponse) => {
          observer.next(data);
       });
    });
  }

  getRoomAndUsers() {
    return new Observable<RoomUsers>((observer) => {
      this.socket.on(
        "roomUsers",
        (data: RoomUsers) => {
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
      this.socket.on("joinRoom", (data) => {
        observer.next(data);
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
