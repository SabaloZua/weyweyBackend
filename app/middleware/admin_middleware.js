export default class AdminMiddleware {
    async handle(ctx, next) {
        const usuario = await ctx.auth.getUserOrFail();
        await usuario.load('tipoUsuario');
        if (usuario.tipoUsuario?.tipo !== 'Admin') {
            return ctx.response.forbidden({
                code: 'ACESSO_NEGADO',
                message: 'Acesso restrito a administradores.',
            });
        }
        return next();
    }
}
//# sourceMappingURL=admin_middleware.js.map