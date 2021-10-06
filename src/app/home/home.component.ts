import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null) {
      this.routes.navigate(['/Login']);
    }
  }

}
