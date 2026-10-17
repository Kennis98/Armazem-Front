import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Frete } from '../interfaces/frete';
import { PrincipalService } from '../service/principal.service';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-frete',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, MatIconModule],
  templateUrl: './frete.component.html',
  styleUrl: './frete.component.scss'
})
export class FreteComponent implements OnInit {
  private service = inject(PrincipalService);
  private uiService = inject(UiService);

  formularioFrete = new FormGroup({
    uf: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)] }),
    bairro: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    cep: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{8}$/)] }),
    valorFrete: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
  });

  fretes = signal<Frete[]>([]);
  carregando = signal(true);
  salvando = signal(false);
  erroLista = signal(false);

  ngOnInit() {
    this.buscarFretes();
  }

  campoInvalido(nome: keyof typeof this.formularioFrete.controls): boolean {
    const campo = this.formularioFrete.controls[nome];
    return campo.invalid && (campo.touched || campo.dirty);
  }

  salvarFrete(): void {
    if (this.formularioFrete.invalid) {
      this.formularioFrete.markAllAsTouched();
      return;
    }

    const { uf, bairro, cep, valorFrete } = this.formularioFrete.getRawValue();
    this.salvando.set(true);
    this.service.cadastrarFrete({ id: 0, uf: uf.toUpperCase(), bairro: bairro.trim(), cep, valorFrete: valorFrete ?? 0 }).subscribe({
      next: () => {
        this.salvando.set(false);
        this.formularioFrete.reset();
        this.uiService.mostrarToast('Frete cadastrado com sucesso!');
        this.buscarFretes();
      },
      error: () => {
        this.salvando.set(false);
        this.uiService.mostrarToast('Não foi possível salvar o frete.', 'erro');
      }
    });
  }

  buscarFretes() {
    this.erroLista.set(false);
    this.service.buscarFretes().subscribe({
      next: fretes => {
        this.fretes.set(fretes);
        this.carregando.set(false);
      },
      error: () => {
        this.erroLista.set(true);
        this.carregando.set(false);
      }
    });
  }
}
