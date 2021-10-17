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
  token: string

  constructor(private usuarioService: UsuarioService,
              private routes: Router) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
       email: new FormControl(''),
       senha: new FormControl('')
    });
    this.usuarioService.token.subscribe(valor => this.token = valor);
    if(this.token != '')
      this.routes.navigate(['/Home'])
  }

  fazerLogin(): void {
    const email = this.loginForm.get('email').value;
    const senha = this.loginForm.get('senha').value;
    this.usuarioService.fazerLogin(email,senha)
      .subscribe(rst => {
        this.usuarioService.armazenarDadosLogin('Bearer '+rst.token)
        localStorage.setItem('token', 'Bearer '+rst.token)
        this.routes.navigate(['/Home'])
      },
      rst =>  {
        if(rst.error)
          this.errorMessage = rst.error
        else
          this.errorMessage = "Erro ao contatar o servidor"
      }
    );
  }
}
