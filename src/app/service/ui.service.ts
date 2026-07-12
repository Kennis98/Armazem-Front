import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Controle do Loading
  loading$ = new BehaviorSubject<boolean>(false);
  
  // Controle do Toast
  toast$ = new BehaviorSubject<{ show: boolean, mensagem: string, tipo: string }>({ 
    show: false, 
    mensagem: '', 
    tipo: 'sucesso' 
  });

  mostrarLoading() {
    this.loading$.next(true);
  }

  esconderLoading() {
    this.loading$.next(false);
  }

  mostrarToast(mensagem: string, tipo: 'sucesso' | 'erro' = 'sucesso') {
    this.toast$.next({ show: true, mensagem, tipo });
    
    // Oculta o toast automaticamente após 3 segundos
    setTimeout(() => {
      this.toast$.next({ show: false, mensagem: '', tipo: 'sucesso' });
    }, 3000);
  }
}