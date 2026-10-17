# armazem-geovanne

Plataforma de criação de pedidos, tais pedidos serão direcionados para a empresa via WhatsApp.

Angular 18 · Bootstrap 5 (grid/utilitários) · Angular Material (ícones).

## Rodando

| Comando | O que faz |
| --- | --- |
| `npm start` | Desenvolvimento usando o backend .NET em `http://localhost:5041/` |
| `npm run start:mock` | Desenvolvimento **sem backend**: a API é simulada no navegador |
| `npm run build` | Build de produção em `dist/armazem-geovanne/browser` |
| `npm test` | Testes unitários (Karma) |

## Ambientes e mock da API

Os arquivos em `src/environments/` controlam de onde vêm os dados:

| Arquivo | Usado em | `useMock` | `apiUrl` |
| --- | --- | --- | --- |
| `environment.development.ts` | `npm start` | `false` | `http://localhost:5041/` |
| `environment.ts` | `npm run build` e `npm run start:mock` | `true` | `''` |

Com `useMock: true`, o interceptor `src/app/mock/mock-api.interceptor.ts` responde às mesmas rotas do backend
(`/bling/categorias`, `/bling/produtos/categoria/:id`, `/cep/:cep`, `/fretes`) com os dados de
os JSON em `src/app/mock/dados/` (categorias, produtos, fretes e CEPs; imagens em `src/assets/mock/`). Fretes cadastrados na tela de gerenciamento ficam salvos no `localStorage`.

**Ao publicar o backend**, edite `src/environments/environment.ts`: `useMock: false` e `apiUrl: 'https://seu-backend/'`
(com a barra no final). Lembre de liberar a origem do frontend na política de CORS do backend.

CEPs de teste no modo demonstração: `13400-100` e `13400-200` (com frete) e `13400-500` (sem frete, "a combinar").

## Publicando em hospedagem gratuita

O build é estático. Como o app usa rotas do Angular, a hospedagem precisa devolver `index.html` para qualquer
caminho; isso já está configurado para os principais serviços:

- **Netlify**: conecte o repositório (usa `netlify.toml`) ou arraste a pasta `dist/armazem-geovanne/browser` (usa `public/_redirects`).
- **Vercel**: importe o repositório (usa `vercel.json`).
- **Cloudflare Pages**: build `npm run build`, diretório de saída `dist/armazem-geovanne/browser` (SPA é suportado por padrão).
- **GitHub Pages** (publica em subcaminho): `npx ng build --base-href /NOME-DO-REPOSITORIO/` e copie `index.html` para `404.html` dentro de `dist/armazem-geovanne/browser`.

## Identidade visual

A paleta fica nas variáveis CSS de `src/styles.scss` (`--color-primary`, `--color-secondary`, `--color-accent`,
`--color-background`, `--color-dark`, ...). Evite cores literais nos componentes: use as variáveis, e as classes
globais (`.btn-brand`, `.surface`, `.page-title`, `.input`, `.field`).

## Tela de fretes

A rota `/frete` (gerenciamento de fretes) não tem link no site. Ela continua acessível digitando o endereço, então
ainda **não é protegida**: antes de publicar com o backend real, a proteção precisa existir no backend
(`POST /fretes` hoje aceita qualquer requisição), e o frontend só deve esconder/mostrar a tela.

## Configurações

- Número do WhatsApp que recebe os pedidos: `whatsappNumber` em `src/environments/*.ts`.
