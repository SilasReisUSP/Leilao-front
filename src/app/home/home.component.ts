import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  token: String
  
  constructor(private routes: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.token.subscribe(valor => this.token = valor)

    if(this.token == '') {
      this.routes.navigate(['/Login']);
    }
  }
}
