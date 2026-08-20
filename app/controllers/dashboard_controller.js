import { listDashboardValidator } from '#validators/dashboard';
import { createProdutoValidator, updateProdutoValidator, produtoIdValidator } from '#validators/produto';
import { pedidoIdValidator, updateStatusPedidoValidator } from '#validators/pedido';
import DashboardService from '#services/Dashboard/DashboardService';
import { tratarErro } from '#helpers/error_handler';
export default class DashboardController {
    async index({ request, response }) {
        try {
            const payload = await request.validateUsing(listDashboardValidator);
            const page = payload.page ?? 1;
            const perPage = payload.perPage ?? 8;
            const service = new DashboardService();
            const dashboard = await service.obterDashboard(page, perPage, payload.estado);
            return response.ok(dashboard);
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async addProduct({ request, response }) {
        try {
            const payload = await request.validateUsing(createProdutoValidator);
            const service = new DashboardService();
            const produto = await service.criarProduto(payload);
            return response.created({
                message: 'Produto cadastrado com sucesso!',
                produto,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async listProducts({ response }) {
        try {
            const service = new DashboardService();
            const produtos = await service.listarProdutos();
            return response.ok({ produtos });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async orderDetails({ request, response, params }) {
        try {
            await request.validateUsing(pedidoIdValidator, {
                data: { id: params.id },
            });
            const service = new DashboardService();
            const pedido = await service.detalhesPedidoAdmin(params.id);
            return response.ok({ pedido });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async updateProduct({ request, response, params }) {
        try {
            await request.validateUsing(produtoIdValidator, {
                data: { id: params.id },
            });
            const payload = await request.validateUsing(updateProdutoValidator);
            const service = new DashboardService();
            const produto = await service.actualizarProduto(params.id, payload);
            return response.ok({
                message: 'Produto actualizado com sucesso!',
                produto,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async updateOrderStatus({ request, response, params }) {
        try {
            await request.validateUsing(pedidoIdValidator, {
                data: { id: params.id },
            });
            const payload = await request.validateUsing(updateStatusPedidoValidator);
            const service = new DashboardService();
            const pedido = await service.actualizarEstadoPedido(params.id, payload);
            return response.ok({
                message: 'Estado do pedido actualizado com sucesso.',
                pedido,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
}
//# sourceMappingURL=dashboard_controller.js.map