import { listPedidosValidator, pedidoIdValidator, createPedidoValidator, } from '#validators/pedido';
import PedidoService from '#services/Pedido/PedidoService';
import { tratarErro } from '#helpers/error_handler';
export default class PedidoController {
    async checkout({ request, response, auth }) {
        try {
            const usuario = await auth.getUserOrFail();
            const payload = await request.validateUsing(createPedidoValidator);
            const service = new PedidoService();
            const pedido = await service.criarPedido(usuario.id, payload);
            return response.created({
                message: 'Pedido realizado com sucesso!',
                pedido,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async myOrders({ request, response, auth }) {
        try {
            const usuario = await auth.getUserOrFail();
            const payload = await request.validateUsing(listPedidosValidator);
            const page = payload.page ?? 1;
            const perPage = payload.perPage ?? 8;
            const service = new PedidoService();
            const resultado = await service.listarMeusPedidos(usuario.id, page, perPage);
            return response.ok(resultado);
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async orderDetails({ request, response, auth, params }) {
        try {
            const usuario = await auth.getUserOrFail();
            await request.validateUsing(pedidoIdValidator, {
                data: { id: params.id },
            });
            const service = new PedidoService();
            const pedido = await service.detalhesPedido(params.id, usuario.id);
            return response.ok({ pedido });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async cancelOrder({ request, response, auth, params }) {
        try {
            const usuario = await auth.getUserOrFail();
            await request.validateUsing(pedidoIdValidator, {
                data: { id: params.id },
            });
            const service = new PedidoService();
            const pedido = await service.cancelarPedido(params.id, usuario.id);
            return response.ok({
                message: 'Pedido cancelado com sucesso.',
                pedido,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
}
//# sourceMappingURL=pedido_controller.js.map