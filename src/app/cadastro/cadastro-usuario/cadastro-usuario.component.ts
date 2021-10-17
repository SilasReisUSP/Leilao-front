import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html'
})
export class CadastroUsuarioComponent implements OnInit {

  cadastroForm: any
  MASKS = utilsBr.MASKS;
 
  constructor(private cadastroUsuarioService: UsuarioService,
              private routes: Router) { 
  }
  ngOnInit(): void {

    this.cadastroForm= new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      apelido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, NgBrazilValidators.cpf]),
      endereco: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });

    
  }

  cadastrarUsuario() : void {
    var resposta = this.cadastroUsuarioService.addUsuario(this.cadastroForm.value);
    resposta.subscribe(rst => {
                        Swal.fire({
                           icon: 'success',
                             title: 'Sucesso',
                             text: rst.message
                         });
                        this.routes.navigate(['/Login'])
                        }, 
                        rst => Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: rst.error
                      }))
  }

  get nome() { return this.cadastroForm.get('nome') }

  get apelido() { return this.cadastroForm.get('apelido')}
  
  get email() { return this.cadastroForm.get('email') }
  
  get cpf() { return this.cadastroForm.get('cpf') }

  get endereco() { return this.cadastroForm.get('endereco') }

  get senha() { return this.cadastroForm.get('senha') }


}
