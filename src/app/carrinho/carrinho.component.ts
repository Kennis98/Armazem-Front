import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { CepResposta } from '../interfaces/cep';
import { SeletorQuantidadeComponent } from '../seletor-quantidade/seletor-quantidade.component';
import { CarrinhoService } from '../service/carrinho.service';
import { PrincipalService } from '../service/principal.service';
import { UiService } from '../service/ui.service';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule, RouterLink, SeletorQuantidadeComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent {
  private carrinhoService = inject(CarrinhoService);
  private principalService = inject(PrincipalService);
  private uiService = inject(UiService);

  itens = this.carrinhoService.itens;
  subtotal = this.carrinhoService.subtotal;

  cep = signal('');
  calculando = signal(false);
  erroFrete = signal('');
  freteResultado = signal<CepResposta | null>(null);

  /** Frete cadastrado para o bairro; zero significa "a combinar". */
  valorFrete = computed(() => this.freteResultado()?.valorFrete ?? 0);
  total = computed(() => this.subtotal() + this.valorFrete());

  /** CEPs de teste, exibidos só no modo demonstração. */
  readonly cepsDemo = environment.useMock ? ['13400-100', '13400-200', '13400-500'] : [];

  removerItem(produtoId: number, nome: string) {
    this.carrinhoService.removerItem(produtoId);
    this.uiService.mostrarToast(`${nome} removido do carrinho.`);
  }

  atualizarQuantidade(produtoId: number, quantidade: number) {
    this.carrinhoService.atualizarQuantidade(produtoId, quantidade);
  }

  limpar() {
    this.carrinhoService.limparCarrinho();
    this.freteResultado.set(null);
    this.uiService.mostrarToast('Carrinho esvaziado.');
  }

  estoqueMaximo(saldo: number | undefined): number | null {
    return saldo && saldo > 0 ? saldo : null;
  }

  /** Formata enquanto digita: 13400100 → 13400-100 */
  mascararCep(valor: string) {
    const digitos = valor.replace(/\D/g, '').slice(0, 8);
    this.cep.set(digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos);
  }

  usarCepDemo(cep: string) {
    this.cep.set(cep);
    this.calcularFrete();
  }

  calcularFrete(evento?: Event) {
    evento?.preventDefault();
    const cepLimpo = this.cep().replace(/\D/g, '');

    this.erroFrete.set('');
    if (cepLimpo.length !== 8) {
      this.freteResultado.set(null);
      this.erroFrete.set('Informe um CEP com 8 números.');
      return;
    }

    this.calculando.set(true);
    this.principalService.buscarCep(cepLimpo).subscribe({
      next: resultado => {
        this.freteResultado.set(resultado);
        this.calculando.set(false);
        this.uiService.mostrarToast('Frete calculado com sucesso!');
      },
      error: (erro: HttpErrorResponse) => {
        this.freteResultado.set(null);
        this.calculando.set(false);
        this.erroFrete.set(erro.status === 404
          ? 'CEP não encontrado. Confira o número digitado.'
          : 'Não foi possível consultar o CEP agora. Tente novamente em instantes.');
      }
    });
  }

  confirmarPedido() {
    const frete = this.freteResultado();

    if (this.itens().length === 0) {
      this.uiService.mostrarToast('Seu carrinho está vazio!', 'erro');
      return;
    }

    if (!frete) {
      this.uiService.mostrarToast('Por favor, calcule o frete antes de confirmar.', 'erro');
      return;
    }

    let texto = 'Olá, gostaria de pedir:\n\n';
    this.itens().forEach(item => {
      texto += `- ${item.quantidade}x ${item.nome} (${moeda.format(item.preco * item.quantidade)})\n`;
    });

    texto += `\nSubtotal: ${moeda.format(this.subtotal())}`;
    texto += `\nFrete: ${frete.valorFrete > 0 ? moeda.format(frete.valorFrete) : 'A combinar'}`;
    texto += `\nTotal: ${moeda.format(this.total())}${frete.valorFrete > 0 ? '' : ' + frete'}`;

    texto += `\n\nPara a localização:\n`;
    texto += `${frete.logradouro}, ${frete.bairro}\n`;
    texto += `${frete.localidade} - ${frete.uf}`;

    const url = `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');
  }
}
