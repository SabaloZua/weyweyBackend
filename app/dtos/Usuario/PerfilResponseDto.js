export class PerfilResponseDto {
    id;
    nome;
    email;
    telefone;
    createdAt;
    updatedAt;
    endereco;
    constructor(usuario) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.telefone = usuario.telefone ?? null;
        this.createdAt = usuario.createdAt ? usuario.createdAt.toISO() : null;
        this.updatedAt = usuario.updatedAt ? usuario.updatedAt.toISO() : null;
        const endereco = usuario.enderecos?.[0] ?? null;
        this.endereco = endereco ? new EnderecoPerfilDto(endereco) : null;
    }
}
export class EnderecoPerfilDto {
    id;
    rua;
    bairro;
    municipio;
    cidade;
    constructor(endereco) {
        this.id = endereco.id;
        this.rua = endereco.rua;
        this.bairro = endereco.bairro;
        this.municipio = endereco.municipio;
        this.cidade = endereco.cidade;
    }
}
//# sourceMappingURL=PerfilResponseDto.js.map