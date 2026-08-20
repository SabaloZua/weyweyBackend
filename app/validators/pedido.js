import vine from '@vinejs/vine';
export const listPedidosValidator = vine.compile(vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(100).optional(),
}));
export const pedidoIdValidator = vine.compile(vine.object({
    id: vine.string().uuid(),
}));
export const createPedidoValidator = vine.compile(vine.object({
    rua: vine.string().trim().minLength(2).maxLength(255),
    bairro: vine.string().trim().minLength(2).maxLength(255),
    municipio: vine.string().trim().minLength(2).maxLength(255),
    cidade: vine.string().trim().minLength(2).maxLength(255),
    salvarEndereco: vine.boolean().optional(),
}));
export const updateStatusPedidoValidator = vine.compile(vine.object({
    estado: vine
        .string()
        .trim()
        .in(['Pendente', 'Em Preparação', 'A Caminho', 'Entregue', 'Cancelado']),
}));
//# sourceMappingURL=pedido.js.map