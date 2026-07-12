import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoItensComponent } from '../cartao-itens/cartao-itens.component';
import { CarrinhoService, ItemCarrinho } from '../service/carrinho.service';
import { PrincipalSerivice } from '../service/principal.service'; // 👉 Ajuste o caminho conforme seu projeto
import { UiService } from '../service/ui.service';

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
    private principalService: PrincipalSerivice,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.itens = this.carrinhoService.listarItens();
  }

  removerItem(produtoId: string) {
    this.carrinhoService.removerItem(produtoId);
    this.itens = this.carrinhoService.listarItens();
    this.uiService.mostrarToast('Item removido.');
  }

  calcularFrete(cep: string) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    // 1. Mostra o overlay antes de chamar a API
    this.uiService.mostrarLoading();

    this.principalService.buscarCep(cepLimpo).subscribe({
      next: (resultado: any) => {
        this.freteResultado = resultado;

        // 2. Esconde o overlay e mostra o toast de sucesso
        this.uiService.esconderLoading();
        this.uiService.mostrarToast('Frete calculado com sucesso!');
      },
      error: (erro) => {
        // 3. Esconde o overlay e mostra toast de erro
        this.uiService.esconderLoading();
        this.uiService.mostrarToast('Erro ao consultar o CEP', 'erro');
      }
    });
  }
  confirmarPedido() {
    // 1. Validação de segurança
    if (this.itens.length === 0) {
      this.uiService.mostrarToast('Seu carrinho está vazio!', 'erro');
      return;
    }

    if (!this.freteResultado) {
      this.uiService.mostrarToast('Por favor, calcule o frete antes de confirmar.', 'erro');
      return;
    }

    // 2. Montagem da mensagem
    let texto = "Olá, gostaria de pedir:\n\n";

    // Adiciona os itens (Assumindo 1x para cada item na lista)
    this.itens.forEach(item => {
      texto += `- ${item.quantidade}x ${item.nome}\n`;
    });

    // Adiciona a localização
    texto += `\nPara a localização:\n`;
    texto += `${this.freteResultado.logradouro}, ${this.freteResultado.bairro}\n`;
    texto += `${this.freteResultado.localidade} - ${this.freteResultado.uf}\n`;

    // Formata o valor do frete
    const valorFrete = this.freteResultado.valorFrete > 0
      ? `R$ ${this.freteResultado.valorFrete.toFixed(2).replace('.', ',')}`
      : 'Grátis / A Combinar';

    texto += `\nFrete: ${valorFrete}`;

    // 3. Codifica a mensagem e abre o WhatsApp
    // Lembre-se de colocar o DDI (55) antes do número
    const numeroWhatsApp = '5519998593010';
    const textoCodificado = encodeURIComponent(texto);
    const url = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

    // Abre em uma nova aba
    window.open(url, '_blank');
  }
  // Adicione isso no carrinho.component.ts
  atualizarQuantidadeProduto(produtoId: string, novaQuantidade: number) {
    this.carrinhoService.atualizarQuantidade(produtoId, novaQuantidade);
    this.itens = this.carrinhoService.listarItens(); // Recarrega a lista com os números certos
  }
}