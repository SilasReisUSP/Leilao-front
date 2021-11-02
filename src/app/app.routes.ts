import { Routes } from "@angular/router";
import { CadastroUsuarioComponent } from "./cadastro/cadastro-usuario/cadastro-usuario.component";
import { LoginUsuarioComponent } from "./login-usuario/login-usuario.component";
import { CadastroProdutoComponent } from "./cadastro/cadastro-produto/cadastro-produto.component";
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { MeusLeiloesComponent } from "./meus-leiloes/meus-leiloes.component";

//Aqui e configurado todas as rotas disponiveis no sistema
export const rootRouterConfig: Routes = [
    //Se o token estiver registrado no localStorage, o caminho padrao sera /Home, caso contrario sera /Login
    { path: '', redirectTo: (localStorage.getItem('token') != null ? '/Home' : '/Login'), pathMatch: 'full'},
    { path: 'Login', component: LoginUsuarioComponent},
    { path: 'Cadastro', component: CadastroUsuarioComponent},
    { path: 'CadastroProduto', component: CadastroProdutoComponent},
    { path: 'Home', component: HomeComponent},
    { path: 'MeusLeiloes', component: MeusLeiloesComponent},
    { path: 'chat/:id', component: ChatComponent},
]