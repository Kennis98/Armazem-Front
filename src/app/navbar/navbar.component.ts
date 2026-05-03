import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrincipalSerivice } from '../service/principal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  categorias: any;

  constructor(private service: PrincipalSerivice) {}
  ngOnInit() {
    this.buscarCategoria();
  }
  buscarCategoria() {
    this.service.buscarCategorias().subscribe(res => {
      this.categorias = res?.data
    })
  }
}
