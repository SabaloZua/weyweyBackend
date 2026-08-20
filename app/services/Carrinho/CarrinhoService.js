import Carrinho from '#models/carrinho';
import ItensCarrinho from '#models/itens_carrinho';
import Produto from '#models/produto';
import { ItensCarrinhoResponseDto, } from '#dtos/Carrinho/CarrinhoResponseDto';
export default class CarrinhoService {
    async obterOuCriarCarrinho(idUsuario) {
        let carrinho = await Carrinho.findBy('idUsuario', idUsuario);
        if (!carrinho) {
            carrinho = await Carrinho.create({ idUsuario });
        }
        return carrinho;
    }
    async adicionarItem(idUsuario, idProduto, quantidade = 1) {
        const carrinho = await this.obterOuCriarCarrinho(idUsuario);
        const produto = await Produto.findOrFail(idProduto);
        let item = await ItensCarrinho.query()
            .where('idCarrinho', carrinho.id)
            .where('idProduto', idProduto)
            .first();
        if (item) {
            item.quantidade += quantidade;
            item.preco = produto.preco;
            await item.save();
        }
        else {
            item = await ItensCarrinho.create({
                idCarrinho: carrinho.id,
                idProduto,
                quantidade,
                preco: produto.preco,
            });
        }
        await item.load('produto');
        return new ItensCarrinhoResponseDto(item);
    }
    async atualizarItem(idUsuario, idItem, quantidade) {
        const carrinho = await this.obterOuCriarCarrinho(idUsuario);
        const item = await ItensCarrinho.query()
            .where('id', idItem)
            .where('idCarrinho', carrinho.id)
            .firstOrFail();
        if (quantidade <= 0) {
            await item.delete();
            return null;
        }
        item.quantidade = quantidade;
        await item.save();
        await item.load('produto');
        return new ItensCarrinhoResponseDto(item);
    }
    async removerItem(idUsuario, idItem) {
        const carrinho = await this.obterOuCriarCarrinho(idUsuario);
        const item = await ItensCarrinho.query()
            .where('id', idItem)
            .where('idCarrinho', carrinho.id)
            .first();
        if (item) {
            await item.delete();
        }
    }
    async listarItens(idUsuario, page = 1, perPage = 8) {
        const carrinho = await this.obterOuCriarCarrinho(idUsuario);
        const todosItens = await ItensCarrinho.query().where('idCarrinho', carrinho.id);
        let quantidadeTotal = 0;
        let subtotalTotal = 0;
        for (const i of todosItens) {
            quantidadeTotal += i.quantidade;
            subtotalTotal += (parseFloat(i.preco) || 0) * i.quantidade;
        }
        const itensPaginados = await ItensCarrinho.query()
            .where('idCarrinho', carrinho.id)
            .preload('produto')
            .orderBy('createdAt', 'desc')
            .paginate(page, perPage);
        const meta = itensPaginados.getMeta();
        return {
            data: itensPaginados.all().map((item) => new ItensCarrinhoResponseDto(item)),
            summary: {
                subtotalTotal,
                quantidadeTotal,
            },
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
    async obterResumo(idUsuario) {
        const carrinho = await this.obterOuCriarCarrinho(idUsuario);
        const todosItens = await ItensCarrinho.query().where('idCarrinho', carrinho.id);
        let quantidadeTotal = 0;
        let subtotalTotal = 0;
        for (const i of todosItens) {
            quantidadeTotal += i.quantidade;
            subtotalTotal += (parseFloat(i.preco) || 0) * i.quantidade;
        }
        return {
            quantidadeTotal,
            subtotalTotal,
            totalItensUnicos: todosItens.length,
        };
    }
}
//# sourceMappingURL=CarrinhoService.js.map