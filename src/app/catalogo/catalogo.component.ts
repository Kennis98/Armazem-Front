import { Component, inject } from '@angular/core';
import { CartaoItensComponent } from "../cartao-itens/cartao-itens.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PrincipalSerivice } from '../service/principal.service';
import { Produto } from '../interfaces/produto';
import { Subscription } from 'rxjs';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CartaoItensComponent, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {

  private route = inject(ActivatedRoute);
  private routeSub?: Subscription;
  categoriaId: string | null = '';
  produtos: Array<Produto> = []

  constructor(
    private service: PrincipalSerivice,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.categoriaId = params.get('id');
      this.buscarProdutosPorCategoria();
    });
  }
  buscarProdutosPorCategoria() {
    this.service.buscarProdutosCategoria(this.categoriaId).subscribe(res => {
      this.produtos = res.data
    })
  }
  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarItem(produto);
  }
}
