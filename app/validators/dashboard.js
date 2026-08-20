import vine from '@vinejs/vine';
export const listDashboardValidator = vine.compile(vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(100).optional(),
    estado: vine
        .string()
        .trim()
        .in(['Pendente', 'Em Preparação', 'A Caminho', 'Entregue', 'Cancelado'])
        .optional(),
}));
//# sourceMappingURL=dashboard.js.map