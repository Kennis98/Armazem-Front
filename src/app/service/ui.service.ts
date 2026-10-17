import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type TipoToast = 'sucesso' | 'erro';

const TOAST_FECHADO = { show: false, mensagem: '', tipo: 'sucesso' as TipoToast };

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Controle do Loading
  loading$ = new BehaviorSubject<boolean>(false);

  // Controle do Toast
  toast$ = new BehaviorSubject<{ show: boolean, mensagem: string, tipo: TipoToast }>(TOAST_FECHADO);

  private toastTimer?: ReturnType<typeof setTimeout>;

  mostrarLoading() {
    this.loading$.next(true);
  }

  esconderLoading() {
    this.loading$.next(false);
  }

  mostrarToast(mensagem: string, tipo: TipoToast = 'sucesso') {
    // Cancela o timer anterior para que um toast antigo não feche o novo antes da hora.
    clearTimeout(this.toastTimer);
    this.toast$.next({ show: true, mensagem, tipo });

    this.toastTimer = setTimeout(() => this.toast$.next(TOAST_FECHADO), 3500);
  }
}
