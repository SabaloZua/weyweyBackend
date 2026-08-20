import vine from '@vinejs/vine';
export const addCartItemValidator = vine.compile(vine.object({
    idProduto: vine.string().uuid(),
    quantidade: vine.number().min(1).optional(),
}));
export const updateCartItemValidator = vine.compile(vine.object({
    quantidade: vine.number().min(1),
}));
export const listCartValidator = vine.compile(vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(100).optional(),
}));
export const cartItemIdValidator = vine.compile(vine.object({
    id: vine.string().uuid(),
}));
//# sourceMappingURL=carrinho.js.map