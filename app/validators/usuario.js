import vine from '@vinejs/vine';
export const createUsuarioValidator = vine.compile(vine.object({
    nome: vine.string().trim().minLength(3).maxLength(100),
    email: vine.string().email().normalizeEmail().maxLength(254).unique(async (db, value) => {
        const match = await db.from('usuarios').select('id').where('email', value).first();
        return !match;
    }),
    senha: vine.string().minLength(6).maxLength(64),
    telefone: vine.string().trim().maxLength(20),
    navegador: vine.string().trim().maxLength(255).optional()
}));
export const loginUsuarioValidator = vine.compile(vine.object({
    email: vine.string().email().normalizeEmail().maxLength(254),
    senha: vine.string().minLength(6).maxLength(64),
}));
export const updatePasswordValidator = vine.compile(vine.object({
    email: vine.string().email().normalizeEmail().maxLength(254),
    codigoToken: vine.string().minLength(4).maxLength(6),
    senhaNova: vine.string().minLength(8).maxLength(64),
    senhaConfirmacao: vine.string().minLength(8).maxLength(64),
}));
export const updateProfileValidator = vine.compile(vine.object({
    nome: vine.string().trim().minLength(3).maxLength(100),
    email: vine.string().email().normalizeEmail().maxLength(254),
    telefone: vine.string().trim().minLength(9).maxLength(20),
}));
export const updateAddressValidator = vine.compile(vine.object({
    rua: vine.string().trim().minLength(3).maxLength(100),
    bairro: vine.string().trim().minLength(2).maxLength(100),
    municipio: vine.string().trim().minLength(2).maxLength(100),
    cidade: vine.string().trim().minLength(2).maxLength(100),
}));
//# sourceMappingURL=usuario.js.map