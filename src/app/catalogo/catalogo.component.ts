import { Component, inject } from '@angular/core';
import { CartaoItensComponent } from "../cartao-itens/cartao-itens.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PrincipalSerivice } from '../service/principal.service';
import { Produto } from '../interfaces/produto';
import { Subscription } from 'rxjs';
import { CarrinhoService } from '../service/carrinho.service';
import { UiService } from '../service/ui.service';

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
    private carrinhoService: CarrinhoService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    // A abordagem com o paramMap.subscribe é excelente para garantir que 
    // a troca de categoria na mesma página atualize os produtos sem precisar de reload na tela.
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.categoriaId = params.get('id');
      this.buscarProdutosPorCategoria();
    });
  }

  buscarProdutosPorCategoria() {
    this.uiService.mostrarLoading();
    this.service.buscarProdutosCategoria(this.categoriaId).subscribe(res => {
      this.produtos = res.data;
      this.uiService.esconderLoading();
    })
  }

  // 👉 Função ajustada para receber a quantidade e passar para o service
  adicionarAoCarrinho(produto: Produto, quantidade: number) {
    this.uiService.mostrarLoading();

    // Simula uma requisição de 500ms
    setTimeout(() => {
      this.carrinhoService.adicionarItem(produto, quantidade);
      this.uiService.esconderLoading();
      
      // Deixei o toast um pouco mais dinâmico para mostrar a quantidade real adicionada
      this.uiService.mostrarToast(`${quantidade}x ${produto.nome} adicionado(s)!`);
    }, 500);
  }
}