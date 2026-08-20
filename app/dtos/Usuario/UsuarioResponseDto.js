export class UsuarioResponseDto {
    id;
    nome;
    tipo;
    createdAt;
    updatedAt;
    constructor(usuario) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.tipo = usuario.tipoUsuario?.tipo ?? null;
        this.createdAt = usuario.createdAt ? usuario.createdAt.toISO() : null;
        this.updatedAt = usuario.updatedAt ? usuario.updatedAt.toISO() : null;
    }
}
//# sourceMappingURL=UsuarioResponseDto.js.map