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
    const email = this.loginForm.get('email').value;
    const senha = this.loginForm.get('senha').value;
    console.log('senha', this.loginForm.get('senha'));
    this.usuarioService.fazerLogin(email,senha)
      .subscribe(resultado => {
        localStorage.setItem('token', resultado.token)
        localStorage.setItem('usuario', resultado.Usuario)
        this.routes.navigate(['/Home'])
      },
      error =>  {
        console.log('sds', error);
        if(error.message.error)
          this.errorMessage = error.message.error
        else
          this.errorMessage = "Erro ao contatar o servidor"
      }
    );
  }
}
