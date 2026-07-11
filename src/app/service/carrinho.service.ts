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

  adicionarItem(produto: Produto): void {
    const itens = this.obterCarrinhoStorage();
    // ajuste "id" para o campo que identifica unicamente o produto na sua interface
    const itemExistente = itens.find(i => i.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      itens.push({ ...produto, quantidade: 1 });
    }

    this.salvarCarrinhoStorage(itens);
  }

  removerItem(produtoId: string): void {
    const itens = this.obterCarrinhoStorage().filter(i => i.id !== produtoId);
    this.salvarCarrinhoStorage(itens);
  }

  limparCarrinho(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}