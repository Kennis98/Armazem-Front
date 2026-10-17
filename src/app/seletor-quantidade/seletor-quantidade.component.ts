import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Controle − / número / + usado no cartão de produto e nas linhas do carrinho. */
@Component({
  selector: 'app-seletor-quantidade',
  standalone: true,
  templateUrl: './seletor-quantidade.component.html',
  styleUrl: './seletor-quantidade.component.scss'
})
export class SeletorQuantidadeComponent {
  @Input() valor = 1;
  /** Limite superior (ex.: estoque). Nulo = sem limite. */
  @Input() max: number | null = null;
  @Input() descricao = 'Quantidade';

  @Output() valorChange = new EventEmitter<number>();

  diminuir(): void {
    this.alterar(this.valor - 1);
  }

  aumentar(): void {
    this.alterar(this.valor + 1);
  }

  /** Aceita só números inteiros válidos; campo vazio ou zero é corrigido ao sair do campo. */
  aoDigitar(campo: HTMLInputElement): void {
    const n = Math.floor(Number(campo.value));
    if (Number.isFinite(n) && n >= 1) {
      this.alterar(n, campo);
    }
  }

  aoSair(campo: HTMLInputElement): void {
    campo.value = String(this.valor);
  }

  private alterar(novo: number, campo?: HTMLInputElement): void {
    const limitado = Math.max(1, this.max ? Math.min(novo, this.max) : novo);
    if (campo) campo.value = String(limitado);
    if (limitado !== this.valor) {
      this.valor = limitado;
      this.valorChange.emit(limitado);
    }
  }
}
