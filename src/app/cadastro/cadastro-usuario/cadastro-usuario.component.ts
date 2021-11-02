import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SocketioService } from '../../services/socketio.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html'
})
export class CadastroUsuarioComponent implements OnInit {

  cadastroForm: any
  MASKS = utilsBr.MASKS;
 
  constructor(private cadastroUsuarioService: UsuarioService,
              private routes: Router, private socketService:SocketioService) { 
  }
  ngOnInit(): void {
    this.socketService.disconnect()

    //Setando inputs do form com suas respectivas validacoes
    this.cadastroForm= new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      apelido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, NgBrazilValidators.cpf]),
      endereco: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });

    
  }

  //Ao chamar este metod, sao enviados os valores informados para o servico, que enviara os dados para o back
  cadastrarUsuario() : void {
    var resposta = this.cadastroUsuarioService.addUsuario(this.cadastroForm.value);
    //Se a resposta do back for positiva (status 200) aparece um popup informando que o cadastro foi realizado com sucesso
    resposta.subscribe(rst => {
                        Swal.fire({
                           icon: 'success',
                             title: 'Sucesso',
                             text: 'Cadastro realizado com sucesso'
                         });
                         //Enviando o usuario para a tela de Login
                        this.routes.navigate(['/Login'])
                        }, 
    //Se a resposta do back for negativa (status 400, 404, etc) aparece um popup informando o erro da mensagem
                        rst => Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: rst.error
                      }))
  }

  //Metodos facilitadores que sao chamados para verificar o valor no arquivo .html
  get nome() { return this.cadastroForm.get('nome') }

  get apelido() { return this.cadastroForm.get('apelido')}
  
  get email() { return this.cadastroForm.get('email') }
  
  get cpf() { return this.cadastroForm.get('cpf') }

  get endereco() { return this.cadastroForm.get('endereco') }

  get senha() { return this.cadastroForm.get('senha') }


}
