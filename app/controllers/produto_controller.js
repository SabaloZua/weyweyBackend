import { listProdutosValidator, produtoIdValidator } from '#validators/produto';
import ProdutoService from '#services/Produto/ProdutoService';
import { tratarErro } from '#helpers/error_handler';
export default class ProdutoController {
    async index({ request, response }) {
        try {
            const payload = await request.validateUsing(listProdutosValidator);
            const page = payload.page ?? 1;
            const perPage = payload.perPage ?? 8;
            const service = new ProdutoService();
            const resultado = await service.listarProdutos(page, perPage);
            return response.ok(resultado);
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async populares({ response }) {
        try {
            const service = new ProdutoService();
            const produtos = await service.obterMaisPedidos();
            return response.ok({ data: produtos });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async show({ request, response, params }) {
        try {
            await request.validateUsing(produtoIdValidator, {
                data: { id: params.id },
            });
            const service = new ProdutoService();
            const produto = await service.obterProduto(params.id);
            return response.ok({ produto });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
}
//# sourceMappingURL=produto_controller.js.map