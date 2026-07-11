import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoItensComponent } from '../cartao-itens/cartao-itens.component';
import { CarrinhoService, ItemCarrinho } from '../service/carrinho.service';
import { PrincipalSerivice } from '../service/principal.service'; // 👉 Ajuste o caminho conforme seu projeto

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, CartaoItensComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  
  freteResultado: any = null;
  erroFrete: string = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private principalService: PrincipalSerivice 
  ) {}

  ngOnInit(): void {
    this.itens = this.carrinhoService.listarItens();
  }

  removerItem(produtoId: string) {
    this.carrinhoService.removerItem(produtoId);
    this.itens = this.carrinhoService.listarItens();
  }

  calcularFrete(cep: string) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      this.erroFrete = 'CEP inválido. Informe 8 números.';
      this.freteResultado = null;
      return;
    }

    this.erroFrete = '';

    this.principalService.buscarCep(cepLimpo).subscribe({
      next: (resultado: any) => {
        this.freteResultado = resultado;
      },
      error: (erro) => {
        console.error('Erro na requisição de CEP:', erro);
        this.erroFrete = erro.error?.message || 'Erro ao consultar o CEP. Verifique se a API está rodando.';
        this.freteResultado = null;
      }
    });
  }
}