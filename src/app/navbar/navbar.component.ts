import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Categoria } from '../interfaces/categoria';
import { CarrinhoService } from '../service/carrinho.service';
import { PrincipalService } from '../service/principal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private service = inject(PrincipalService);
  carrinho = inject(CarrinhoService);

  categorias = signal<Categoria[]>([]);
  categoriasCarregadas = signal(false);

  ngOnInit() {
    this.service.categorias().subscribe({
      next: categorias => {
        this.categorias.set(categorias);
        this.categoriasCarregadas.set(true);
      },
      error: () => this.categoriasCarregadas.set(true)
    });
  }
}
