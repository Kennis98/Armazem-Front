import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-cartao-itens',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cartao-itens.component.html',
  styleUrl: './cartao-itens.component.scss'
})

export class CartaoItensComponent {
  @Input() classeBotaoPrincipal :string = 'btn-primary';
  @Input() classeBotaoSecundario :string = 'btn-danger';
  @Input() nome :string = '';
  @Input() descricao :string = '';
  @Input() imagem :string = '';
  @Input() estoque :number = 0;
}
