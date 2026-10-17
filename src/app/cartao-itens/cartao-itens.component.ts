import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SeletorQuantidadeComponent } from '../seletor-quantidade/seletor-quantidade.component';

/** Cartão de produto da vitrine (catálogo). */
@Component({
  selector: 'app-cartao-itens',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule, SeletorQuantidadeComponent],
  templateUrl: './cartao-itens.component.html',
  styleUrl: './cartao-itens.component.scss'
})
export class CartaoItensComponent {
  @Input() nome = '';
  @Input() descricao = '';
  @Input() imagem = '';
  @Input() preco = 0;
  @Input() estoque = 0;

  @Output() adicionarAoCarrinho = new EventEmitter<number>();

  quantidade = 1;
  imagemFalhou = false;

  /** Abaixo disso o cartão avisa que restam poucas unidades. */
  readonly limiteEstoqueBaixo = 5;

  get indisponivel(): boolean {
    return this.estoque <= 0;
  }

  adicionar(): void {
    this.adicionarAoCarrinho.emit(this.quantidade);
    this.quantidade = 1;
  }
}
