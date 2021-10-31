import { MessageSocketResponse, UserSocketResponse } from "../chat/types";

//Classe utilziada para armazenar informacoes da sala que o usuario entrou
export class JoinRoomResponse { 
  room: string;
  users?: UserSocketResponse[];
  messages?: MessageSocketResponse[];
  currentValue?: number  
  leftTime?: number
}