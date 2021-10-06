import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  providers: [UsuarioService]
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
    this.usuarioService.fazerLogin(this.loginForm.get('email'),this.loginForm.get('senha')).subscribe(
      resultado => {
        localStorage.setItem('token', resultado.token)
        localStorage.setItem('usuario', resultado.Usuario)
        this.routes.navigate(['/Home'])
      },
      error =>  {
        if(error.message.error)
          this.errorMessage = error.message.error
        else
          this.errorMessage = "Erro ao contatar o servidor"
      }
    );
  }
}
