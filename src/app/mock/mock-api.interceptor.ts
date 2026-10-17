import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { Categoria } from '../interfaces/categoria';
import { CepResposta } from '../interfaces/cep';
import { Frete } from '../interfaces/frete';
import { Produto } from '../interfaces/produto';
import { RespostaLista } from '../interfaces/resposta-lista';
import categoriasJson from './dados/categorias.json';
import cepsJson from './dados/ceps.json';
import fretesJson from './dados/fretes.json';
import produtosJson from './dados/produtos.json';

// Dados temporários do modo demonstração: edite os JSON em ./dados.
const MOCK_CATEGORIAS: Categoria[] = categoriasJson;
const MOCK_PRODUTOS: Record<string, Produto[]> = produtosJson;
const MOCK_FRETES_INICIAIS: Frete[] = fretesJson;
const MOCK_CEPS: Record<string, Omit<CepResposta, 'valorFrete'>> = cepsJson;

const LATENCIA_MS = 350;
const STORAGE_FRETES = 'armazem_mock_fretes_v2';

function lerFretes(): Frete[] {
  try {
    const salvo = localStorage.getItem(STORAGE_FRETES);
    if (salvo) return JSON.parse(salvo);
  } catch { /* storage indisponível: usa os dados iniciais */ }
  return structuredClone(MOCK_FRETES_INICIAIS);
}

function salvarFretes(fretes: Frete[]): void {
  try {
    localStorage.setItem(STORAGE_FRETES, JSON.stringify(fretes));
  } catch { /* ignora: o mock continua funcionando em memória */ }
}

function ok<T>(body: T, status = 200): Observable<HttpResponse<T>> {
  return of(new HttpResponse({ status, body })).pipe(delay(LATENCIA_MS));
}

function erro(req: HttpRequest<unknown>, status: number, message: string): Observable<never> {
  return timer(LATENCIA_MS).pipe(
    mergeMap(() => throwError(() => new HttpErrorResponse({ status, error: { message }, url: req.url })))
  );
}

/**
 * Simula a API do backend (Bling + fretes + CEP) no navegador, para publicar o
 * frontend em hospedagens estáticas sem backend. Só é registrado quando
 * `environment.useMock` é true (veja app.config.ts).
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const caminho = new URL(req.url, 'http://mock.local').pathname.replace(/\/+$/, '');

  if (req.method === 'GET' && caminho === '/bling/categorias') {
    return ok<RespostaLista<Categoria>>({ data: MOCK_CATEGORIAS });
  }

  const produtos = caminho.match(/^\/bling\/produtos\/categoria\/(\d+)$/);
  if (req.method === 'GET' && produtos) {
    return ok<RespostaLista<Produto>>({ data: MOCK_PRODUTOS[produtos[1]] ?? [] });
  }

  const cep = caminho.match(/^\/cep\/(.+)$/);
  if (req.method === 'GET' && cep) {
    if (!/^\d{8}$/.test(cep[1])) {
      return erro(req, 400, 'CEP inválido. Informe apenas 8 números.');
    }
    const endereco = MOCK_CEPS[cep[1]];
    if (!endereco) {
      return erro(req, 404, 'CEP não encontrado.');
    }
    const frete = lerFretes().find(f => f.bairro === endereco.bairro);
    return ok<CepResposta>({ ...endereco, valorFrete: frete?.valorFrete ?? 0 });
  }

  if (caminho === '/fretes') {
    if (req.method === 'GET') {
      return ok<Frete[]>(lerFretes());
    }
    if (req.method === 'POST') {
      const fretes = lerFretes();
      const novo: Frete = { ...(req.body as Frete), id: Math.max(0, ...fretes.map(f => f.id)) + 1 };
      fretes.push(novo);
      salvarFretes(fretes);
      return ok<Frete>(novo, 201);
    }
  }

  return next(req);
};
