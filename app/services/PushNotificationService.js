import webPush from 'web-push';
import env from '#start/env';
import logger from '@adonisjs/core/services/logger';
import PushSubscription from '#models/push_subscription';
import Usuario from '#models/usuario';
export default class PushNotificationService {
    constructor() {
        webPush.setVapidDetails(env.get('VAPID_SUBJECT'), env.get('VAPID_PUBLIC_KEY'), env.get('VAPID_PRIVATE_KEY'));
    }
    async sendToUser(usuarioId, payload) {
        const subscriptions = await PushSubscription.query().where('usuarioId', usuarioId);
        if (subscriptions.length === 0) {
            logger.info(`Sem subscrições Push para o utilizador ${usuarioId}`);
            return;
        }
        const payloadString = JSON.stringify(payload);
        const promises = subscriptions.map(async (sub) => {
            const pushSubscription = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth,
                },
            };
            try {
                await webPush.sendNotification(pushSubscription, payloadString);
                logger.info(`Notificação Push enviada com sucesso para endpoint ${sub.endpoint}`);
            }
            catch (error) {
                logger.error(`Falha ao enviar Push para endpoint ${sub.endpoint}. Erro: ${error.statusCode} - ${error.message}`);
                if (error.statusCode === 410 || error.statusCode === 404) {
                    logger.info(`Removendo subscrição expirada: ${sub.id}`);
                    await sub.delete();
                }
            }
        });
        await Promise.allSettled(promises);
    }
    async sendToAdmins(payload) {
        const admins = await Usuario.query().whereHas('tipoUsuario', (query) => {
            query.where('tipo', 'Admin');
        });
        if (admins.length === 0) {
            logger.info('Sem utilizadores Admin para enviar notificação Push');
            return;
        }
        await Promise.allSettled(admins.map((admin) => this.sendToUser(admin.id, payload)));
    }
}
//# sourceMappingURL=PushNotificationService.js.map