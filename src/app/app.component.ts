import { Component, OnInit } from '@angular/core';
import { SocketioService } from './services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'leilao-front';

  constructor(private socketService: SocketioService) {}

  ngOnInit() {
    this.socketService.setupSocketConnection()
  }
}
