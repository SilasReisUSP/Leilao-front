import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario/cadastro-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    LoginUsuarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
