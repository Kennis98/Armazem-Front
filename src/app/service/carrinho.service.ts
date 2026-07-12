// src/app/service/carrinho.service.ts
import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto';

export interface ItemCarrinho extends Produto {
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly STORAGE_KEY = 'carrinho';

  private obterCarrinhoStorage(): ItemCarrinho[] {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  }

  private salvarCarrinhoStorage(itens: ItemCarrinho[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(itens));
  }

  listarItens(): ItemCarrinho[] {
    return this.obterCarrinhoStorage();
  }

  adicionarItem(produto: Produto, quantidadeDesejada: number = 1): void {
    const itens = this.obterCarrinhoStorage();
    const itemExistente = itens.find(i => i.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += quantidadeDesejada;
    } else {
      itens.push({ ...produto, quantidade: quantidadeDesejada });
    }

    this.salvarCarrinhoStorage(itens);
  }

  // 👉 NOVO MÉTODO: Atualiza o número exato digitado ou clicado no carrinho
  atualizarQuantidade(produtoId: string, novaQuantidade: number): void {
    if (novaQuantidade <= 0) {
      this.removerItem(produtoId);
      return;
    }

    const itens = this.obterCarrinhoStorage();
    const item = itens.find(i => i.id === produtoId);
    
    if (item) {
      item.quantidade = novaQuantidade;
      this.salvarCarrinhoStorage(itens);
    }
  }

  removerItem(produtoId: string): void {
    const itens = this.obterCarrinhoStorage().filter(i => i.id !== produtoId);
    this.salvarCarrinhoStorage(itens);
  }

  limparCarrinho(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}