export class ItensCarrinhoResponseDto {
    id;
    idCarrinho;
    idProduto;
    quantidade;
    preco;
    subtotal;
    produto;
    constructor(item) {
        this.id = item.id;
        this.idCarrinho = item.idCarrinho;
        this.idProduto = item.idProduto;
        this.quantidade = item.quantidade;
        this.preco = item.preco;
        const precoNum = parseFloat(item.preco) || 0;
        this.subtotal = precoNum * item.quantidade;
        this.produto = item.produto
            ? {
                id: item.produto.id,
                nome: item.produto.nome,
                preco: item.produto.preco,
                img: item.produto.img,
            }
            : null;
    }
}
//# sourceMappingURL=CarrinhoResponseDto.js.map