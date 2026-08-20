import vine from '@vinejs/vine';
export const listProdutosValidator = vine.compile(vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(100).optional(),
}));
export const createProdutoValidator = vine.compile(vine.object({
    nome: vine.string().trim().minLength(2).maxLength(255),
    preco: vine.number().min(0),
    img: vine.string().trim().minLength(1).maxLength(2000),
    descricao: vine.string().trim().maxLength(2000).optional(),
}));
export const updateProdutoValidator = vine.compile(vine.object({
    nome: vine.string().trim().minLength(2).maxLength(255),
    preco: vine.number().min(0),
    img: vine.string().trim().minLength(1).maxLength(2000),
    descricao: vine.string().trim().maxLength(2000).optional(),
}));
export const produtoIdValidator = vine.compile(vine.object({
    id: vine.string().uuid(),
}));
//# sourceMappingURL=produto.js.map