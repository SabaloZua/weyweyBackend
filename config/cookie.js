import env from '#start/env';
import app from '@adonisjs/core/services/app';
const sameSite = env.get('SESSION_SAME_SITE') ?? 'lax';
const secure = env.get('SESSION_SECURE') ?? (sameSite === 'none' ? true : app.inProduction);
const domain = env.get('SESSION_COOKIE_DOMAIN') || undefined;
export const sessionCookie = {
    path: '/',
    httpOnly: true,
    secure,
    sameSite,
    ...(domain ? { domain } : {}),
};
//# sourceMappingURL=cookie.js.map