import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { SocketioService } from '../services/socketio.service';



@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html'
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: any
  errorMessage!: string
  token: string

  constructor(private usuarioService: UsuarioService,
              private routes: Router,
              private socketioService: SocketioService,
              private socketService:SocketioService
  ) { }

  ngOnInit(): void {
    this.socketService.disconnect()
    //Atualizando o token do component local por meio do servico
    this.usuarioService.token.subscribe(valor => this.token = valor);

    //se o token estiver preenchido, ele sera redirecionado para a pagina do home
    if(this.token != '')
      this.routes.navigate(['/Home'])

    //Setando os campos do form do login, que serao o email e a senha, evitando conflitos
    this.loginForm= new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
   });
  }

  //Ao submeter o forms e chamado este metodo que envia e valida o login do usuario
  fazerLogin(): void {
    //armazenando os dados em variaveis locais
    const email = this.loginForm.get('email').value;
    const senha = this.loginForm.get('senha').value;
    //enviando os dados para o servico. O servico envia as informacoes para o back e retorna se os dados sao validos ou nao
    this.usuarioService.fazerLogin(email,senha)
    
      .subscribe(rst => {
        //Caso os dados sejam validos entao e armazenado o token recebido pelo back no servico e no localStorage
        // e redireciona o usuario para a tela do home
        this.usuarioService.armazenarDadosLogin('Bearer '+rst.token);
        localStorage.setItem('token', 'Bearer '+rst.token);
        localStorage.setItem('usuario', JSON.stringify(rst.usuarioCadastrado));
        this.routes.navigate(['/Home'])
      },
      rst =>  {
        //Se for informado algum erro pelo back, a mensagem e armazenada na variavel errorMessage que sera visualizado pelo usuario
        if(rst.error)
          this.errorMessage = rst.error
        //Se deu erro e nao houve mensagem de retorno entao e armazenado a mensagem 'erro ao contatar o servidor'  
        else
          this.errorMessage = "Erro ao contatar o servidor"
      }
    );
  }
}
