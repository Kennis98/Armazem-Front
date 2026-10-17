import { computed, Injectable, signal } from '@angular/core';
import { Produto } from '../interfaces/produto';

export interface ItemCarrinho extends Produto {
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly STORAGE_KEY = 'carrinho';

  private readonly _itens = signal<ItemCarrinho[]>(this.lerStorage());

  readonly itens = this._itens.asReadonly();
  readonly quantidadeTotal = computed(() => this._itens().reduce((total, i) => total + i.quantidade, 0));
  readonly subtotal = computed(() => this._itens().reduce((total, i) => total + i.preco * i.quantidade, 0));

  private lerStorage(): ItemCarrinho[] {
    try {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }

  private atualizar(itens: ItemCarrinho[]): void {
    this._itens.set(itens);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(itens));
    } catch { /* storage indisponível: o carrinho vale só nesta sessão */ }
  }

  listarItens(): ItemCarrinho[] {
    return this._itens();
  }

  adicionarItem(produto: Produto, quantidadeDesejada: number = 1): void {
    const itens = this._itens().map(i => ({ ...i }));
    const itemExistente = itens.find(i => i.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += quantidadeDesejada;
    } else {
      itens.push({ ...produto, quantidade: quantidadeDesejada });
    }

    this.atualizar(itens);
  }

  /** Define a quantidade exata do item (zero ou menos remove o item). */
  atualizarQuantidade(produtoId: number, novaQuantidade: number): void {
    if (novaQuantidade <= 0) {
      this.removerItem(produtoId);
      return;
    }

    this.atualizar(this._itens().map(i => i.id === produtoId ? { ...i, quantidade: novaQuantidade } : i));
  }

  removerItem(produtoId: number): void {
    this.atualizar(this._itens().filter(i => i.id !== produtoId));
  }

  limparCarrinho(): void {
    this.atualizar([]);
  }
}
