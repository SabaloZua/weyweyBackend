import { addCartItemValidator, updateCartItemValidator, listCartValidator, cartItemIdValidator, } from '#validators/carrinho';
import CarrinhoService from '#services/Carrinho/CarrinhoService';
import { tratarErro } from '#helpers/error_handler';
export default class CarrinhoController {
    async addItem({ request, response, auth }) {
        try {
            const usuario = await auth.getUserOrFail();
            const payload = await request.validateUsing(addCartItemValidator);
            const service = new CarrinhoService();
            const item = await service.adicionarItem(usuario.id, payload.idProduto, payload.quantidade ?? 1);
            const summary = await service.obterResumo(usuario.id);
            return response.ok({
                message: 'Produto adicionado ao carrinho com sucesso.',
                item,
                summary,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async getItems({ request, response, auth }) {
        try {
            const usuario = await auth.getUserOrFail();
            const payload = await request.validateUsing(listCartValidator);
            const page = payload.page ?? 1;
            const perPage = payload.perPage ?? 8;
            const service = new CarrinhoService();
            const resultado = await service.listarItens(usuario.id, page, perPage);
            return response.ok(resultado);
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async updateItem({ request, response, auth, params }) {
        try {
            const usuario = await auth.getUserOrFail();
            await request.validateUsing(cartItemIdValidator, {
                data: { id: params.id },
            });
            const payload = await request.validateUsing(updateCartItemValidator);
            const service = new CarrinhoService();
            const item = await service.atualizarItem(usuario.id, params.id, payload.quantidade);
            const summary = await service.obterResumo(usuario.id);
            return response.ok({
                message: 'Item do carrinho atualizado.',
                item,
                summary,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async removeItem({ request, response, auth, params }) {
        try {
            const usuario = await auth.getUserOrFail();
            await request.validateUsing(cartItemIdValidator, {
                data: { id: params.id },
            });
            const service = new CarrinhoService();
            await service.removerItem(usuario.id, params.id);
            const summary = await service.obterResumo(usuario.id);
            return response.ok({
                message: 'Item removido do carrinho.',
                summary,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async summary({ response, auth }) {
        try {
            const usuario = await auth.getUserOrFail();
            const service = new CarrinhoService();
            const summary = await service.obterResumo(usuario.id);
            return response.ok(summary);
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
}
//# sourceMappingURL=carrinho_controller.js.map