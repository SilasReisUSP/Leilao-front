import { Routes } from "@angular/router";
import { CadastroUsuarioComponent } from "./cadastro/cadastro-usuario/cadastro-usuario.component";
import { LoginUsuarioComponent } from "./login-usuario/login-usuario.component";
import { CadastroProdutoComponent } from "./cadastro/cadastro-produto/cadastro-produto.component";


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/Cadastro', pathMatch: 'full'},
    { path: 'Login', component: LoginUsuarioComponent},
    { path: 'Cadastro', component: CadastroUsuarioComponent},
    { path: 'CadastroProduto', component: CadastroProdutoComponent},
]