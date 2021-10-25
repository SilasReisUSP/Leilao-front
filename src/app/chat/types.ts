export type SendMessage = {
  message: string;
  room: string;
  username: string;
}

export type MessageSocketResponse = {
  room: string;
  name: string;
  text: string;
  time: string;
}

export type UserSocketResponse = {
  id: string;
  name: string;
  room: string;
}