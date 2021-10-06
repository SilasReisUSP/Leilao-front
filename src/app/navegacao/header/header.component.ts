import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  token!: string | null;
  
  constructor(private routes: Router) { }
  
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
  }

  sair() {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    this.routes.navigate(['/Login'])
    
  }

}
