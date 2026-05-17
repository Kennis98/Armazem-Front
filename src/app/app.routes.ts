import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { FreteComponent } from './frete/frete.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'carrinho', component: CarrinhoComponent },
    { path: 'catalogo/:id', component: CatalogoComponent },
    { path: 'frete', component: FreteComponent },
];
