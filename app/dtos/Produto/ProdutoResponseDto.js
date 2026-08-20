export class ProdutoResponseDto {
    id;
    nome;
    preco;
    img;
    descricao;
    createdAt;
    updatedAt;
    constructor(produto) {
        this.id = produto.id;
        this.nome = produto.nome;
        this.preco = produto.preco;
        this.img = produto.img;
        this.descricao = produto.descricao ?? null;
        this.createdAt = produto.createdAt ? produto.createdAt.toISO() : null;
        this.updatedAt = produto.updatedAt ? produto.updatedAt.toISO() : null;
    }
}
export class TopProdutoDto {
    id;
    nome;
    img;
    constructor(produto) {
        this.id = produto.id;
        this.nome = produto.nome;
        this.img = produto.img;
    }
}
//# sourceMappingURL=ProdutoResponseDto.js.map