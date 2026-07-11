import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👉 Adicionado para o *ngIf
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cartao-itens',
  standalone: true,
  imports: [CommonModule, MatIconModule], // 👉 Importar o CommonModule aqui
  templateUrl: './cartao-itens.component.html',
  styleUrl: './cartao-itens.component.scss'
})
export class CartaoItensComponent {
  @Input() classeBotaoPrincipal: string = 'btn-primary';
  @Input() classeBotaoSecundario: string = 'btn-danger';
  
  @Input() nome: string = '';
  @Input() descricao: string = '';
  @Input() imagem: string = '';
  @Input() estoque: number = 0;

  @Input() modo: 'catalogo' | 'carrinho' = 'catalogo'; 
  @Output() adicionarAoCarrinho = new EventEmitter<void>();
  @Output() removerDoCarrinho = new EventEmitter<void>(); 
  
  adicionar() {
    this.adicionarAoCarrinho.emit();
  }
  remover() {
    this.removerDoCarrinho.emit();
  }
}