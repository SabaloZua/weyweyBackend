import PushSubscription from '#models/push_subscription';
import env from '#start/env';
export default class PushSubscriptionsController {
    async vapidPublicKey({ response }) {
        return response.ok({
            publicKey: env.get('VAPID_PUBLIC_KEY'),
        });
    }
    async subscribe({ request, response, auth }) {
        const user = auth.user;
        const { endpoint, keys } = request.only(['endpoint', 'keys']);
        if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
            return response.badRequest({ message: 'Payload de subscrição inválido' });
        }
        const subscription = await PushSubscription.firstOrNew({ endpoint });
        subscription.usuarioId = user.id;
        subscription.p256dh = keys.p256dh;
        subscription.auth = keys.auth;
        await subscription.save();
        return response.created({ message: 'Subscrição guardada com sucesso' });
    }
    async unsubscribe({ request, response, auth }) {
        const user = auth.user;
        const { endpoint } = request.only(['endpoint']);
        if (!endpoint) {
            return response.badRequest({ message: 'Endpoint é obrigatório' });
        }
        const subscription = await PushSubscription.query()
            .where('usuarioId', user.id)
            .where('endpoint', endpoint)
            .first();
        if (subscription) {
            await subscription.delete();
        }
        return response.ok({ message: 'Subscrição removida' });
    }
    async testPush({ response, auth }) {
        const user = auth.user;
        const { default: PushNotificationService } = await import('#services/PushNotificationService');
        const pushService = new PushNotificationService();
        const payload = {
            title: 'Teste de Notificação 🍔',
            body: 'Isto é um teste do WeyWey! As tuas notificações funcionam.',
            data: { url: '/my-orders' }
        };
        pushService.sendToUser(user.id, payload).catch((e) => console.error(e));
        return response.ok({ message: 'Push de teste disparado!' });
    }
}
//# sourceMappingURL=push_subscriptions_controller.js.map