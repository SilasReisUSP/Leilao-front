import {
  Component,
  OnInit,
  ViewChild,
  QueryList,
  ViewChildren,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { SocketioService } from "../services/socketio.service";
import {
  MessageSocketResponse,
  UserSocketResponse,
} from "./types";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";
import { ProdutoService } from "../services/produto.service";
import { ProdutoResponse } from "../models/ProdutoResponse";
import { getUser } from "../helpers";
import { utilsBr } from "js-brasil";
import { CountdownComponent, CountdownConfig } from "ngx-countdown";
import Swal from 'sweetalert2'

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, AfterViewInit {
  //Variaveis para manipulacao dos dados
  username: string;
  userId: string;
  room: string | null;
  roomName: string;
  message: string;
  messages: MessageSocketResponse[] = [];
  users: UserSocketResponse[] = [];
  token: string;
  produto: ProdutoResponse;
  currentValue: number;
  public isVisible: boolean = false;
  myDate: any;
  interval: any;
  config: CountdownConfig

  @ViewChild("chatMessages") chatMessagesElem: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChildren("messages") messagesElem: QueryList<any>;



  constructor(
    private socketIoService: SocketioService,
    private routeId: ActivatedRoute,
    private usuarioService: UsuarioService,
    private routes: Router,
    private produtoService: ProdutoService
  ) {}

  async ngOnInit(): Promise<void> {

    //Recebe o valor do token mais atual
    this.usuarioService.token.subscribe(valor => this.token = valor)

    //Se nao tiver token, o usuario e redirecionado para a rota de Login
    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }

    //recebendo id do leilao e armazenando na variavel room
    this.room = this.routeId.snapshot.paramMap.get("id");

    //Conectando ao socket
    this.socketIoService.connect();
    //Recebendo os usuario das sala do back
    this.socketIoService.getRoomAndUsers().subscribe((data) => {
      const { users } = data;
      //se houver usuario, eles sao armazenados, sendo passados no metodo setUsers
      if (users) this.setUsers(users);
    });

    //Recebendo mensagens pelo socket
    this.socketIoService.receiveMessages().subscribe((message) => {
      //Armazenando as mensagens pelo metodo setMessages
      this.setMessages([message]);
    });

    //Recebendo o valor atual do produto pelo socket e armazenando na variavel currentValue
    this.socketIoService.getCurrentValue().subscribe((data) => {
      if (data.currentValue) {
        this.currentValue = data.currentValue;
      }
    });

    //Buscando dados do produto, caso seja respondido com sucesso, e armazenado nas variaveis para inicializacao do chat
    //Este metodo fica escutando todas as resposas do back, entao algumas variaveis ja preenchidas anteriormente sao novamente
    //preenchidas para sempre estarem atualizadas
    this.produtoService.getProdutoId(this.room, this.token).subscribe(
      (produto: ProdutoResponse) => {
        this.produto = produto;
        this.userId = getUser()._id || "";
        this.username = getUser().nome || ""
        this.currentValue = produto.valorInicial ? utilsBr.currencyToNumber(produto.valorInicial) : 0;
        this.socketIoService.joinRoom(this.userId, this.room, this.username, produto.nome).subscribe(
          (data) => {
            //Caso seja recebido do back novas informacoes (mensagem, usuarios, valor atual, tempo restante) 
            //e elas nao forem indefinidas, serao atualizadas
            const { messages, users, currentValue, leftTime } = data;
            if (messages) this.setMessages(messages);
            if (users) this.setUsers(users);
            if (currentValue) this.currentValue = currentValue;
            //configurando o tempo restante (leftTime)
            //(notify) Quando faltar 1 segundo, sera chamada a funcao handleEvent que informara o 
            //usuario que o chat foi finalizado
            if(leftTime)this.config = {
              leftTime: leftTime,
              notify: [1]
            };
            else{
              this.config = {
                leftTime: 10,
                notify: [1]
              }
            }
          }
        );
      }
    );

    //iniciando o contador 
    if (this.countdown) this.countdown.begin();
  }

  //Apos iniciar a tela do usuario, o metodo scrollToBottom envia o chat para a mensagem mais recente (que estara embaixo)
  ngAfterViewInit() {
    this.scrollToBottom();
    //Sempre que chegar mensagens novas, a div de mensagens irá para baixo (para aparecer a mensagem mais recente)
    this.messagesElem.changes.subscribe(this.scrollToBottom);
  }

  //rolando a tela do chat para baixo
  scrollToBottom = () => {
    try {
      this.chatMessagesElem.nativeElement.scrollTop =
        this.chatMessagesElem.nativeElement.scrollHeight;
    } catch (err) {}
  };

  sendMessage() {
    //recebendo o valor digitado pelo usuario
    let userValue = utilsBr.currencyToNumber(this.message);

    //se o valor for maior que o valor atual da sala entao a mensagem e enviada ao socket
    if (userValue > this.currentValue) {
      this.socketIoService.sendMessage(userValue);
    } else {
      //informando usuario de valor invalido
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,4000);
    }
    this.message = "";
  }

  //Armazenando mensagens da sala
  setMessages(messages: MessageSocketResponse[]) {
    this.messages = [...this.messages, ...messages];
  }

  //Armazenando usuarios da sala
  setUsers(users: UserSocketResponse[]) {
    this.users = users;
  }

  //Formatando mensagem do usuario para visualização
  formatarValorFinal() {
    let teste = this.message;
    if (!this.message.includes(",") && this.message != "") {
      this.message = this.message + ",00";
    }
  }

  //Evento chamado quando o tempo chega a 1, quando isso corre aparece um popup informando o usuario que o leilao foi finalizado
  //ao clicar no botao ele e redirecionado para a tela de Home
  handleEvent(e: any) {
    if(e.action === 'notify') {
      Swal.fire({
        icon: 'info',
         title: 'Tempo finalizado',
         text: 'O tempo do leilão foi finalizado, clique para ir à página inicial',
         confirmButtonText: 'Concordo!'
     }).then((result) => {
      this.routes.navigate(["/Home"]);
     });
     
    }
      
  }

  //Metodo utilizado no .html para verificar se a mensagem e um numero ou uma string
  checkTextItem(text: string){
    if(isNaN(Number(text)))
      return true
    else
      return false
  }
}
