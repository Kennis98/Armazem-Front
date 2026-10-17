import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Categoria } from '../interfaces/categoria';
import { Produto } from '../interfaces/produto';
import { CartaoItensComponent } from '../cartao-itens/cartao-itens.component';
import { CarrinhoService } from '../service/carrinho.service';
import { PrincipalService } from '../service/principal.service';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CartaoItensComponent, MatIconModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(PrincipalService);
  private carrinhoService = inject(CarrinhoService);
  private uiService = inject(UiService);

  categoriaId = signal<string | null>(null);
  categorias = signal<Categoria[]>([]);
  produtos = signal<Produto[]>([]);
  busca = signal('');
  estado = signal<'carregando' | 'ok' | 'erro'>('carregando');

  categoriaNome = computed(() =>
    this.categorias().find(c => String(c.id) === this.categoriaId())?.descricao ?? 'Catálogo');

  produtosFiltrados = computed(() => {
    const termo = this.normalizar(this.busca());
    return termo
      ? this.produtos().filter(p => this.normalizar(`${p.nome} ${p.descricaoCurta ?? ''}`).includes(termo))
      : this.produtos();
  });

  constructor() {
    // switchMap cancela a busca anterior se o usuário trocar de categoria rapidamente.
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => {
        this.categoriaId.set(id);
        this.busca.set('');
        this.estado.set('carregando');
      }),
      switchMap(id => this.service.buscarProdutosCategoria(id).pipe(
        catchError(() => of(null))
      )),
      takeUntilDestroyed()
    ).subscribe(res => {
      if (res) {
        this.produtos.set(res.data ?? []);
        this.estado.set('ok');
      } else {
        this.produtos.set([]);
        this.estado.set('erro');
      }
    });
  }

  ngOnInit() {
    this.service.categorias().subscribe({
      next: categorias => this.categorias.set(categorias),
      error: () => { /* o nome cai para "Catálogo"; o erro principal é tratado na lista de produtos */ }
    });
  }

  recarregar() {
    // Reemite a rota atual: reaproveita todo o fluxo do switchMap.
    this.estado.set('carregando');
    this.service.buscarProdutosCategoria(this.categoriaId()).subscribe({
      next: res => { this.produtos.set(res.data ?? []); this.estado.set('ok'); },
      error: () => this.estado.set('erro')
    });
  }

  adicionarAoCarrinho(produto: Produto, quantidade: number) {
    this.carrinhoService.adicionarItem(produto, quantidade);
    this.uiService.mostrarToast(`${quantidade}x ${produto.nome} adicionado(s)!`);
  }

  private normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }
}
