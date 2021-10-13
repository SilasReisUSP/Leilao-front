export type SendMessage = {
  message: string;
  room: string;
  username: string;
}

export type MessageResponse = {
  room: string;
  username: string;
  text: string;
  time: string;
}