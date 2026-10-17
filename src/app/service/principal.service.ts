import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Categoria } from '../interfaces/categoria';
import { CepResposta } from '../interfaces/cep';
import { Frete } from '../interfaces/frete';
import { Produto } from '../interfaces/produto';
import { RespostaLista } from '../interfaces/resposta-lista';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private readonly baseUrl = environment.apiUrl;
  private readonly API_BLING = 'bling';

  private categorias$?: Observable<Categoria[]>;

  constructor(private http: HttpClient) { }

  /** Categorias já em lista e em cache: navbar, início e catálogo compartilham a mesma chamada. */
  categorias(): Observable<Categoria[]> {
    this.categorias$ ??= this.http
      .get<RespostaLista<Categoria>>(`${this.baseUrl}${this.API_BLING}/categorias`)
      .pipe(map(res => res.data ?? []), shareReplay(1));
    return this.categorias$;
  }

  buscarProdutosCategoria(id: string | null): Observable<RespostaLista<Produto>> {
    return this.http.get<RespostaLista<Produto>>(`${this.baseUrl}${this.API_BLING}/produtos/categoria/${id}`);
  }

  buscarCep(cep: string): Observable<CepResposta> {
    return this.http.get<CepResposta>(`${this.baseUrl}cep/${cep}`);
  }

  cadastrarFrete(frete: Omit<Frete, 'id'> & { id?: number }): Observable<Frete> {
    return this.http.post<Frete>(`${this.baseUrl}fretes`, frete);
  }

  buscarFretes(): Observable<Frete[]> {
    return this.http.get<Frete[]>(`${this.baseUrl}fretes`);
  }
}
