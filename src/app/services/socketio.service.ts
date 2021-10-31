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

  //Metodo que armazena o socket utilizado para estruturar o chat
  connect() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  //Metodo que envia o usuario, o id da sala e o nome da sala para o endpoint joinRoom 
  //Recebe os dados atualizado por meio do socket
  joinRoom(username: string, room: any, roomName?: string): Observable<JoinRoomResponse> {
    return new Observable<JoinRoomResponse>((observer) => {
      this.socket.emit("joinRoom", { username, room, roomName }, (
        data: JoinRoomResponse) => {
          //Este observer permite a leitura de dados constante a cada envio do back para o front
          observer.next(data);
       });
    });
  }

  //Buscando os usuario que estao inseridos na sala por meio da rota roomUsers
  getRoomAndUsers() {
    return new Observable<RoomUsers>((observer) => {
      this.socket.on(
        "roomUsers",
        (data: RoomUsers) => {
          //Este observer permite a leitura de dados constante a cada envio do back para o front
          observer.next(data);
        }
      );
    });
  }

  //Envia a mensagem do usuario para o back por meio do socket na rota /message
  sendMessage(data: string | number) {
    this.socket.emit("message", data);
  }

  //Metodo que recebe a sala que o usuario entrou
  receiveJoinRoom() {
    return new Observable<string>((observer) => {
      this.socket.on("joinRoom", (message) => {
        //Este observer permite a leitura de dados constante a cada envio do back para o front
        observer.next(message);
      });
    });
  }

  //Metodo que recebe as mensagens enviadas por outros usuario, para atualizacao da tela do usuario
  receiveMessages() {
    return new Observable<MessageSocketResponse>((observer) => {
      this.socket.on("message", (message) => {
        //Este observer permite a leitura de dados constante a cada envio do back para o front
        observer.next(message);
      });
    });
  }

  //Busca o valor atual do produto no back e retorna para a tela do usuario
  getCurrentValue() {
    return new Observable<{ currentValue: number, currentTime?: number }>((observer) => {
      this.socket.on("currentValue", (data) => {
        //Este observer permite a leitura de dados constante a cada envio do back para o front
        observer.next(data);
      });
    });
  }
}
