import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from './auth.service';
import { Usuario } from 'src/app/interface/Usuario';



@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html'
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: any


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
       email: new FormControl('', [Validators.required, Validators.email]),
       senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });
  }

  fazerLogin(): void {
    this.authService.fazerLogin(this.loginForm.value);
  }

  get email() { return this.loginForm.get('email') }

  get senha() { return this.loginForm.get('senha') }
}