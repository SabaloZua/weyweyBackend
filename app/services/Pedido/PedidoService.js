import Pedido from '#models/pedido';
import ItensPedido from '#models/itens_pedido';
import Produto from '#models/produto';
import Carrinho from '#models/carrinho';
import ItensCarrinho from '#models/itens_carrinho';
import UsuarioService from '#services/Usuario/UsuarioService';
import PushNotificationService from '#services/PushNotificationService';
import logger from '@adonisjs/core/services/logger';
import { PedidoResponseDto, PedidoResumoDto, } from '#dtos/Pedido/PedidoResponseDto';
export default class PedidoService {
    async criarPedido(idUsuario, data) {
        const carrinho = await Carrinho.findBy('idUsuario', idUsuario);
        if (!carrinho) {
            throw {
                status: 400,
                code: 'CARRINHO_VAZIO',
                message: 'O seu carrinho está vazio. Adicione produtos antes de finalizar a compra.',
            };
        }
        const itensCarrinho = await ItensCarrinho.query()
            .where('idCarrinho', carrinho.id)
            .preload('produto');
        if (itensCarrinho.length === 0) {
            throw {
                status: 400,
                code: 'CARRINHO_VAZIO',
                message: 'O seu carrinho está vazio. Adicione produtos antes de finalizar a compra.',
            };
        }
        let totalGeral = 0;
        const itensComPreco = [];
        for (const item of itensCarrinho) {
            const quantidade = item.quantidade;
            const produto = item.produto || (await Produto.findOrFail(item.idProduto));
            const precoNum = parseFloat(produto.preco) || 0;
            totalGeral += precoNum * quantidade;
            itensComPreco.push({
                idProduto: produto.id,
                quantidade,
                preco: produto.preco,
            });
        }
        const pedido = await Pedido.create({
            idUsuario,
            estado: 'Pendente',
            total: totalGeral.toFixed(2),
            rua: data.rua,
            bairro: data.bairro,
            municipio: data.municipio,
            cidade: data.cidade,
        });
        for (const item of itensComPreco) {
            await ItensPedido.create({
                idPedido: pedido.id,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                preco: item.preco,
            });
        }
        await ItensCarrinho.query().where('idCarrinho', carrinho.id).delete();
        if (data.salvarEndereco) {
            const usuarioService = new UsuarioService();
            await usuarioService.actualizarEndereco(idUsuario, {
                rua: data.rua,
                bairro: data.bairro,
                municipio: data.municipio,
                cidade: data.cidade,
            });
        }
        await pedido.load('itens', (q) => q.preload('produto'));
        await pedido.load('usuario');
        this.notificarAdminsNovoPedido(pedido);
        return new PedidoResponseDto(pedido);
    }
    notificarAdminsNovoPedido(pedido) {
        const nomeCliente = pedido.usuario?.nome ?? 'Um cliente';
        const pushService = new PushNotificationService();
        pushService
            .sendToAdmins({
            title: 'Novo pedido 🍔',
            body: `Novo pedido de ${nomeCliente} no valor de R$${pedido.total}.`,
            badge: 1,
            data: { url: `/admin/order-details?id=${pedido.id}` },
        })
            .catch((error) => {
            logger.error(`Falha ao notificar admins do pedido ${pedido.id}: ${error}`);
        });
    }
    async listarMeusPedidos(idUsuario, page = 1, perPage = 8) {
        const pedidosPaginados = await Pedido.query()
            .where('idUsuario', idUsuario)
            .preload('usuario')
            .orderBy('createdAt', 'desc')
            .paginate(page, perPage);
        const meta = pedidosPaginados.getMeta();
        return {
            data: pedidosPaginados.all().map((p) => new PedidoResumoDto(p)),
            meta: {
                total: meta.total,
                page: meta.currentPage,
                perPage: meta.perPage,
                lastPage: meta.lastPage,
                hasNextPage: meta.currentPage < meta.lastPage,
                hasPreviousPage: meta.currentPage > 1,
            },
        };
    }
    async detalhesPedido(idPedido, idUsuario) {
        const pedido = await Pedido.query()
            .where('id', idPedido)
            .where('idUsuario', idUsuario)
            .preload('itens', (q) => q.preload('produto'))
            .firstOrFail();
        return new PedidoResponseDto(pedido);
    }
    async cancelarPedido(idPedido, idUsuario) {
        const pedido = await Pedido.query()
            .where('id', idPedido)
            .where('idUsuario', idUsuario)
            .firstOrFail();
        if (pedido.estado !== 'Pendente') {
            throw {
                status: 422,
                code: 'PEDIDO_NAO_CANCELAVEL',
                message: `Apenas pedidos com estado "Pendente" podem ser cancelados. Estado actual: "${pedido.estado}"`,
            };
        }
        pedido.estado = 'Cancelado';
        await pedido.save();
        await pedido.load('itens', (q) => q.preload('produto'));
        return new PedidoResponseDto(pedido);
    }
}
//# sourceMappingURL=PedidoService.js.map