// Build de produção (`ng build`). Enquanto o backend não estiver publicado,
// mantenha useMock = true: a API é simulada no próprio navegador (veja app/mock).
// Para usar a API real, troque useMock para false e preencha apiUrl (com "/" no final).
export const environment = {
  production: true,
  useMock: true,
  apiUrl: '',
  whatsappNumber: '5511974685735',
};
