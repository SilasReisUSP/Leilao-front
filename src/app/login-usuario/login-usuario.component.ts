import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html'
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: any
  errorMessage!: string

  constructor(private usuarioService: UsuarioService,
              private routes: Router) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
       email: new FormControl(''),
       senha: new FormControl('')
    });
  }

  fazerLogin(): void {
    const email = this.loginForm.get('email').value;
    const senha = this.loginForm.get('senha').value;
    this.usuarioService.fazerLogin(email,senha)
      .subscribe(resultado => {
        this.usuarioService.armazenarDadosLogin(resultado.token, resultado.usuarioCadastrado)
        localStorage.setItem('token', resultado.token)
        this.routes.navigate(['/Home'])
      },
      error =>  {
        if(error.error)
          this.errorMessage = error.error.error
        else
          this.errorMessage = "Erro ao contatar o servidor"
      }
    );
  }
}
