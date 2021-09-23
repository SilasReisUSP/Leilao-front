import { Routes } from "@angular/router";
import { CadastroProdutoComponent } from "./cadastro/cadastro-produto/cadastro-produto.component";
import { CadastroUsuarioComponent } from "./cadastro/cadastro-usuario/cadastro-usuario.component";
import { LoginUsuarioComponent } from "./login-usuario/login-usuario.component";


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/Cadastro', pathMatch: 'full'},
    { path: 'Login', component: LoginUsuarioComponent},
    { path: 'Cadastro', component: CadastroUsuarioComponent},
    { path: 'CadastrarLogin', component: CadastroProdutoComponent}
]