import Produto from '#models/produto';
import { ProdutoResponseDto, TopProdutoDto } from '#dtos/Produto/ProdutoResponseDto';
export default class ProdutoService {
    async listarProdutos(page = 1, perPage = 8) {
        const produtosPaginados = await Produto.query()
            .orderBy('createdAt', 'desc')
            .paginate(page, perPage);
        const meta = produtosPaginados.getMeta();
        return {
            data: produtosPaginados.all().map((p) => new ProdutoResponseDto(p)),
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
    async obterProduto(id) {
        const produto = await Produto.findOrFail(id);
        return new ProdutoResponseDto(produto);
    }
    async obterMaisPedidos() {
        const produtos = await Produto.query()
            .orderBy('totalPedidos', 'desc')
            .orderBy('createdAt', 'desc')
            .limit(5);
        return produtos.map((p) => new TopProdutoDto(p));
    }
}
//# sourceMappingURL=ProdutoService.js.map