export class PedidoResponseDto {
    id;
    estado;
    total;
    rua;
    bairro;
    municipio;
    cidade;
    idUsuario;
    createdAt;
    updatedAt;
    itens;
    constructor(pedido) {
        this.id = pedido.id;
        this.estado = pedido.estado;
        this.total = pedido.total;
        this.rua = pedido.rua ?? null;
        this.bairro = pedido.bairro ?? null;
        this.municipio = pedido.municipio ?? null;
        this.cidade = pedido.cidade ?? null;
        this.idUsuario = pedido.idUsuario ?? null;
        this.createdAt = pedido.createdAt ? pedido.createdAt.toISO() : null;
        this.updatedAt = pedido.updatedAt ? pedido.updatedAt.toISO() : null;
        this.itens = pedido.itens
            ? pedido.itens.map((item) => new ItensPedidoDto(item))
            : [];
    }
}
export class PedidoResumoDto {
    id;
    estado;
    total;
    createdAt;
    usuario;
    constructor(pedido) {
        this.id = pedido.id;
        this.estado = pedido.estado;
        this.total = pedido.total;
        this.createdAt = pedido.createdAt ? pedido.createdAt.toISO() : null;
        this.usuario = pedido.usuario
            ? {
                nome: pedido.usuario.nome,
                telefone: pedido.usuario.telefone ?? null,
            }
            : null;
    }
}
export class ItensPedidoDto {
    id;
    idProduto;
    quantidade;
    preco;
    nomeProduto;
    imgProduto;
    constructor(item) {
        this.id = item.id;
        this.idProduto = item.idProduto ?? null;
        this.quantidade = item.quantidade;
        this.preco = item.preco;
        this.nomeProduto = item.produto?.nome ?? null;
        this.imgProduto = item.produto?.img ?? null;
    }
}
//# sourceMappingURL=PedidoResponseDto.js.map