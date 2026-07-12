import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // 👉 Isso resolve o erro NG8002 (ngModel)

@Component({
  selector: 'app-cartao-itens',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
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
  
  // 👉 Isso resolve os erros NG9 de "property does not exist"
  @Input() quantidade: number = 1; 

  // 👉 Isso resolve os erros NG5 de "void is not assignable to number"
  @Output() adicionarAoCarrinho = new EventEmitter<number>(); 
  @Output() removerDoCarrinho = new EventEmitter<void>();
  @Output() quantidadeAlterada = new EventEmitter<number>(); 

  // MÉTODOS
  aumentar() {
    this.quantidade++;
    this.notificarMudanca();
  }

  diminuir() {
    if (this.quantidade > 1) {
      this.quantidade--;
      this.notificarMudanca();
    }
  }

  notificarMudanca() {
    if (this.modo === 'carrinho') {
      this.quantidadeAlterada.emit(this.quantidade);
    }
  }

  adicionar() {
    this.adicionarAoCarrinho.emit(this.quantidade);
    if (this.modo === 'catalogo') {
      this.quantidade = 1; 
    }
  }

  remover() {
    this.removerDoCarrinho.emit();
  }
}