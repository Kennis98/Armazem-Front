import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalSerivice {

  private API_BLING: string = "bling"

  constructor(private http: HttpClient) { }

  private readonly baseUrl = 'https://localhost:44384/';

  private addHeaders() {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
       
      });
  
      // tslint:disable-next-line: object-literal-shorthand
      const options = { headers: headers };
  
      return options;
    }

     buscarCategorias(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}${this.API_BLING}/categorias`, {
        ...this.addHeaders()
      });
    }

    buscarProdutosCategoria(id: string | null): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}${this.API_BLING}/produtos/categoria/${id}`, {
        ...this.addHeaders()
      });
    }

    buscarCep(cep: string): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}${this.API_BLING}/cep/${cep}`, {
        ...this.addHeaders()
      });
    }
    
}
