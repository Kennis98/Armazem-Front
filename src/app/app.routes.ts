import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { FreteComponent } from './frete/frete.component';

const NOME = 'Armazém Geovanne';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent, title: `Início | ${NOME}` },
    { path: 'carrinho', component: CarrinhoComponent, title: `Carrinho | ${NOME}` },
    { path: 'catalogo/:id', component: CatalogoComponent, title: `Catálogo | ${NOME}` },
    { path: 'frete', component: FreteComponent, title: `Fretes | ${NOME}` },
    { path: '**', redirectTo: '/inicio' },
];
