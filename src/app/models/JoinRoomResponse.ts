import { MessageSocketResponse, UserSocketResponse } from "../chat/types";

export class JoinRoomResponse { 
  room: string;
  users?: UserSocketResponse[];
  messages?: MessageSocketResponse[];
  currentValue?: number;
  leftTime?: number;
}