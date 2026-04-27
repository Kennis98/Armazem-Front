import { Estoque } from "./estoque";

export interface Produto {
    id: string,
    nome: string,
    codigo: string,
    preco: number,
    estoque: Estoque,
    descricaoCurta: string,
    imagemUrl: string
}
