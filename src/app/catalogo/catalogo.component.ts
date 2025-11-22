import { Component } from '@angular/core';
import { CartaoItensComponent } from "../cartao-itens/cartao-itens.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CartaoItensComponent, CartaoItensComponent, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {
  produtos = [
  {
    "urlImagem": "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
    "nome": "Apple AirPods Pro",
    "descricao": "Fones de ouvido sem fio com cancelamento de ruído ativo.",
    "quantidade": 15,
    "estoque": 2
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/81mL3u2wAaL._AC_SL1500_.jpg",
    "nome": "Kindle Paperwhite",
    "descricao": "E-reader com tela antirreflexo de 6,8” e luz ajustável.",
    "quantidade": 8,
    "estoque": 4
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/71geVdy6-OS._AC_SL1500_.jpg",
    "nome": "Nintendo Switch",
    "descricao": "Console híbrido da Nintendo com controles Joy-Con destacáveis.",
    "quantidade": 3,
    "estoque": 2
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/71P0Sdj2XLL._AC_SL1500_.jpg",
    "nome": "PlayStation 5",
    "descricao": "Console de última geração da Sony com SSD ultrarrápido.",
    "quantidade": 0,
    "estoque": 1
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/81wZ6g+xWYL._AC_SL1500_.jpg",
    "nome": "Cafeteira Nespresso Essenza Mini",
    "descricao": "Cafeteira compacta com sistema de cápsulas.",
    "quantidade": 12,
    "estoque": 1
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/81p6BmsHLhL._AC_SL1500_.jpg",
    "nome": "Monitor LG Ultrawide 29”",
    "descricao": "Monitor ultrawide Full HD para produtividade e jogos.",
    "quantidade": 6,
    "estoque": 2
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/71K9CbNZPsL._AC_SL1500_.jpg",
    "nome": "GoPro HERO 11",
    "descricao": "Câmera de ação resistente à água com estabilização avançada.",
    "quantidade": 2,
    "estoque": 1
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/71lVwl3q-kL._AC_SL1500_.jpg",
    "nome": "Samsung Galaxy S23",
    "descricao": "Smartphone Android com câmera tripla de alta resolução.",
    "quantidade": 9,
    "estoque": 2
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/81wZ8AqV+JL._AC_SL1500_.jpg",
    "nome": "Echo Dot 5ª Geração",
    "descricao": "Caixa de som inteligente com Alexa integrada.",
    "quantidade": 20,
    "estoque": 2
  },
  {
    "urlImagem": "https://m.media-amazon.com/images/I/71Q6o3Y1QLL._AC_SL1500_.jpg",
    "nome": "Logitech MX Master 3S",
    "descricao": "Mouse sem fio ergonômico com rolagem ultrarrápida.",
    "quantidade": 7,
    "estoque": 1
  }
]

}
