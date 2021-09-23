import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario/cadastro-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { FooterComponent } from './navegacao/footer/footer.component';
import { HeaderComponent } from './navegacao/header/header.component';
import { CadastroProdutoComponent } from './cadastro/cadastro-produto/cadastro-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    LoginUsuarioComponent,
    FooterComponent,
    HeaderComponent,
    CadastroProdutoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    [RouterModule.forRoot(rootRouterConfig, {useHash: false})]
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
