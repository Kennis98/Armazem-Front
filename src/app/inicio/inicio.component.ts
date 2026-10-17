import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Categoria } from '../interfaces/categoria';
import { PrincipalService } from '../service/principal.service';

/** Ícone (Material Icons) por palavra-chave do nome da categoria; `category` é o padrão. */
const ICONES_CATEGORIA: Array<[string, string]> = [
  ['embutid', 'lunch_dining'],
  ['latic', 'icecream'],
  ['queij', 'icecream'],
  ['ovo', 'egg_alt'],
  ['mercearia', 'shopping_basket'],
  ['bebida', 'local_drink'],
  ['padaria', 'bakery_dining'],
  ['carne', 'set_meal'],
];

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  private service = inject(PrincipalService);

  categorias = signal<Categoria[]>([]);
  estado = signal<'carregando' | 'ok' | 'erro'>('carregando');

  readonly passos = [
    { icone: 'storefront', titulo: 'Escolha os produtos', texto: 'Navegue pelas categorias e adicione ao carrinho.' },
    { icone: 'local_shipping', titulo: 'Calcule o frete', texto: 'Informe seu CEP e veja o valor da entrega.' },
    { icone: 'chat', titulo: 'Confirme no WhatsApp', texto: 'Enviamos o pedido pronto na conversa com a loja.' },
  ];

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.estado.set('carregando');
    this.service.categorias().subscribe({
      next: categorias => {
        this.categorias.set(categorias);
        this.estado.set('ok');
      },
      error: () => this.estado.set('erro')
    });
  }

  icone(categoria: Categoria): string {
    const nome = categoria.descricao.toLowerCase();
    return ICONES_CATEGORIA.find(([chave]) => nome.includes(chave))?.[1] ?? 'category';
  }
}
