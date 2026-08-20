import { ItensPedidoDto } from '#dtos/Pedido/PedidoResponseDto';
export class AdminPedidoDetalhesDto {
    id;
    estado;
    total;
    rua;
    bairro;
    municipio;
    cidade;
    itens;
    usuario;
    constructor(pedido) {
        this.id = pedido.id;
        this.estado = pedido.estado;
        this.total = pedido.total;
        this.rua = pedido.rua ?? null;
        this.bairro = pedido.bairro ?? null;
        this.municipio = pedido.municipio ?? null;
        this.cidade = pedido.cidade ?? null;
        this.itens = pedido.itens ? pedido.itens.map((item) => new ItensPedidoDto(item)) : [];
        this.usuario = pedido.usuario
            ? {
                nome: pedido.usuario.nome,
                telefone: pedido.usuario.telefone ?? null,
                email: pedido.usuario.email,
            }
            : null;
    }
}
export class AdminPedidoResumoDto {
    id;
    estado;
    total;
    rua;
    bairro;
    municipio;
    cidade;
    usuario;
    constructor(pedido) {
        this.id = pedido.id;
        this.estado = pedido.estado;
        this.total = pedido.total;
        this.rua = pedido.rua ?? null;
        this.bairro = pedido.bairro ?? null;
        this.municipio = pedido.municipio ?? null;
        this.cidade = pedido.cidade ?? null;
        this.usuario = pedido.usuario
            ? {
                nome: pedido.usuario.nome,
                telefone: pedido.usuario.telefone ?? null,
                email: pedido.usuario.email,
            }
            : null;
    }
}
//# sourceMappingURL=DashboardResponseDto.js.map