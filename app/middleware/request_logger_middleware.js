import logger from '@adonisjs/core/services/logger';
export default class RequestLoggerMiddleware {
    async handle({ request, response }, next) {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        const method = request.method();
        const url = request.url();
        const status = response.getStatus();
        const origin = request.header('origin') || '-';
        const statusColor = status >= 500 ? '🔴' : status >= 400 ? '🟡' : '🟢';
        logger.info(`${statusColor}  ${method.padEnd(6)} ${url.padEnd(40)} ${status}  ${ms}ms  | Origin: ${origin}`);
    }
}
//# sourceMappingURL=request_logger_middleware.js.map