//Classes simples utilizadas no chat para manipulacao e atualizacao dos dados em tela

//Classe SendMessage armazena dados da mensagem que foi enviada
export type SendMessage = {
  message: string;
  room: string;
  username: string;
}

//Classe MessageSocketResponsa armazena dados da mensagem recebida do back pelo socket
export type MessageSocketResponse = {
  room: string;
  name: string;
  text: string;
  time: string;
}

//Classe UserSocketResponsade armazena dados do usuario recebido do back pelo socket
export type UserSocketResponse = {
  id: string;
  name: string;
  room: string;
}