import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario/cadastro-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './navegacao/header/header.component';
import { CadastroProdutoComponent } from './cadastro/cadastro-produto/cadastro-produto.component';
import { HomeComponent } from './home/home.component';
import { SocketioService } from './services/socketio.service';
import { ChatComponent } from './chat/chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    LoginUsuarioComponent,
    HeaderComponent,
    CadastroProdutoComponent,
    HomeComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    [RouterModule.forRoot(rootRouterConfig, {useHash: false}),
    FontAwesomeModule
  ]
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
