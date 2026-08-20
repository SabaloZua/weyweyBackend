export function tratarErro(error, response) {
    if (error.status) {
        return response.status(error.status).send({
            code: error.code || 'ERRO',
            message: error.message,
        });
    }
    throw error;
}
//# sourceMappingURL=error_handler.js.map