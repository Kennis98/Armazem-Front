import { Estoque } from "./estoque";

export interface Produto {
    id: number,
    nome: string,
    codigo: string,
    preco: number,
    estoque?: Estoque,
    descricaoCurta: string,
    imagemURL: string
}
