import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';
router.get('/', () => {
    return { hello: 'world' };
});
const UsuarioController = () => import('#controllers/usuario_controller');
const PushSubscriptionsController = () => import('#controllers/push_subscriptions_controller');
const PedidoController = () => import('#controllers/pedido_controller');
const CarrinhoController = () => import('#controllers/carrinho_controller');
const DashboardController = () => import('#controllers/dashboard_controller');
const ProdutoController = () => import('#controllers/produto_controller');
router
    .group(() => {
    router
        .group(() => {
        router.post('register', [UsuarioController, 'register']);
        router.post('login', [UsuarioController, 'login']);
    })
        .prefix('user');
    router.put('update-password', [UsuarioController, 'updatePassword']);
    router.get('products', [ProdutoController, 'index']);
    router.get('products/populares', [ProdutoController, 'populares']);
    router.get('products/:id', [ProdutoController, 'show']);
    router
        .group(() => {
        router.post('logout', [UsuarioController, 'logout']);
        router.get('me', [UsuarioController, 'me']);
        router.get('profile', [UsuarioController, 'profile']);
        router.put('update-profile', [UsuarioController, 'updateProfile']);
        router.put('update-address', [UsuarioController, 'updateAddress']);
    })
        .prefix('user')
        .use(middleware.auth());
    router
        .group(() => {
        router.post('subscribe', [PushSubscriptionsController, 'subscribe']);
        router.post('unsubscribe', [PushSubscriptionsController, 'unsubscribe']);
        router.post('test', [PushSubscriptionsController, 'testPush']);
    })
        .prefix('push')
        .use(middleware.auth());
    router.get('push/vapid-public-key', [PushSubscriptionsController, 'vapidPublicKey']);
    router
        .group(() => {
        router.post('checkout', [PedidoController, 'checkout']);
        router.get('my-orders', [PedidoController, 'myOrders']);
        router.get('order-details/:id', [PedidoController, 'orderDetails']);
        router.patch('cancel-order/:id', [PedidoController, 'cancelOrder']);
    })
        .prefix('orders')
        .use(middleware.auth());
    router
        .group(() => {
        router.post('items', [CarrinhoController, 'addItem']);
        router.get('/', [CarrinhoController, 'getItems']);
        router.get('summary', [CarrinhoController, 'summary']);
        router.put('items/:id', [CarrinhoController, 'updateItem']);
        router.delete('items/:id', [CarrinhoController, 'removeItem']);
    })
        .prefix('cart')
        .use(middleware.auth());
    router
        .group(() => {
        router.get('/', [DashboardController, 'index']);
        router.post('add-product', [DashboardController, 'addProduct']);
        router.get('products', [DashboardController, 'listProducts']);
        router.get('order-details/:id', [DashboardController, 'orderDetails']);
        router.put('update-product/:id', [DashboardController, 'updateProduct']);
    })
        .prefix('dashboard')
        .use(middleware.auth())
        .use(middleware.admin());
    router
        .patch('update-status-order/:id', [DashboardController, 'updateOrderStatus'])
        .use(middleware.auth())
        .use(middleware.admin());
})
    .prefix('/api/v1');
//# sourceMappingURL=routes.js.map