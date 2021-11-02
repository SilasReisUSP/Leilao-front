import { UserSocketResponse } from "../chat/types";

//Class RoomUsers, utilizada para armazenadas qual e a sala que o usuario esta entrando e quais sao os usuarios presentes nela
export class RoomUsers {
  room: string;
  users?: UserSocketResponse[];
}