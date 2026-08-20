import Pedido from '#models/pedido';
import Produto from '#models/produto';
import { ProdutoResponseDto } from '#dtos/Produto/ProdutoResponseDto';
import { AdminPedidoDetalhesDto, AdminPedidoResumoDto, } from '#dtos/Dashboard/DashboardResponseDto';
export default class DashboardService {
    async obterDashboard(page = 1, perPage = 8, estado) {
        const stats = await this.calcularEstatisticas();
        const query = Pedido.query()
            .preload('usuario')
            .orderBy('createdAt', 'desc');
        if (estado) {
            query.where('estado', estado);
        }
        const pedidosPaginados = await query.paginate(page, perPage);
        const meta = pedidosPaginados.getMeta();
        return {
            stats,
            pedidos: {
                data: pedidosPaginados.all().map((p) => new AdminPedidoResumoDto(p)),
                meta: {
                    total: meta.total,
                    page: meta.currentPage,
                    perPage: meta.perPage,
                    lastPage: meta.lastPage,
                    hasNextPage: meta.currentPage < meta.lastPage,
                    hasPreviousPage: meta.currentPage > 1,
                },
            },
        };
    }
    async criarProduto(data) {
        const produto = await Produto.create({
            nome: data.nome,
            preco: data.preco.toFixed(2),
            img: data.img,
            descricao: data.descricao ?? null,
        });
        return new ProdutoResponseDto(produto);
    }
    async listarProdutos() {
        const produtos = await Produto.query().orderBy('createdAt', 'desc');
        return produtos.map((p) => new ProdutoResponseDto(p));
    }
    async detalhesPedidoAdmin(idPedido) {
        const pedido = await Pedido.query()
            .where('id', idPedido)
            .preload('usuario')
            .preload('itens', (q) => q.preload('produto'))
            .firstOrFail();
        return new AdminPedidoDetalhesDto(pedido);
    }
    async actualizarEstadoPedido(idPedido, data) {
        const pedido = await Pedido.findOrFail(idPedido);
        const estadoAnterior = pedido.estado;
        pedido.estado = data.estado;
        await pedido.save();
        await pedido.load('usuario');
        await pedido.load('itens', (q) => q.preload('produto'));
        if (data.estado === 'Entregue' && estadoAnterior !== 'Entregue') {
            for (const item of pedido.itens) {
                if (item.produto) {
                    item.produto.totalPedidos += item.quantidade;
                    await item.produto.save();
                }
            }
        }
        return new AdminPedidoDetalhesDto(pedido);
    }
    async actualizarProduto(idProduto, data) {
        const produto = await Produto.findOrFail(idProduto);
        produto.nome = data.nome;
        produto.preco = data.preco.toFixed(2);
        produto.img = data.img;
        produto.descricao = data.descricao ?? null;
        await produto.save();
        return new ProdutoResponseDto(produto);
    }
    async calcularEstatisticas() {
        const [totalResult] = await Pedido.query().count('* as total');
        const [pendentesResult] = await Pedido.query()
            .where('estado', 'Pendente')
            .count('* as total');
        const [emAndamentoResult] = await Pedido.query()
            .whereIn('estado', ['Em Preparação', 'A Caminho'])
            .count('* as total');
        const todosPedidos = await Pedido.query().select('total').where('estado', 'Entregue');
        const faturacaoTotal = todosPedidos.reduce((sum, pedido) => sum + (parseFloat(pedido.total) || 0), 0);
        return {
            totalPedidos: Number(totalResult.total),
            pendentes: Number(pendentesResult.total),
            emAndamento: Number(emAndamentoResult.total),
            faturacaoTotal: faturacaoTotal.toFixed(2),
        };
    }
}
//# sourceMappingURL=DashboardService.js.map