import { UserSocketResponse } from "../chat/types";

export class RoomUsers {
  room: string;
  users?: UserSocketResponse[];
}