import Usuario from '#models/usuario';
import codigo_tokens from '#models/codigo_token';
import EnderecoCliente from '#models/endereco_cliente';
import hash from '@adonisjs/core/services/hash';
import TipoUsuario from '#models/tipo_usuario';
import { PerfilResponseDto } from '#dtos/Usuario/PerfilResponseDto';
export default class UsuarioService {
    async criarConta(data) {
        const tipoCliente = await TipoUsuario.findBy('tipo', 'Cliente');
        if (!tipoCliente) {
            throw new Error("Tipo de usuário 'Cliente' não encontrado na base de dados.");
        }
        const usuario = new Usuario();
        usuario.nome = data.nome;
        usuario.email = data.email;
        usuario.senha = data.senha;
        usuario.telefone = data.telefone;
        if (data.navegador)
            usuario.navegador = data.navegador;
        usuario.idTipoUsuario = tipoCliente.id;
        await usuario.save();
        return usuario;
    }
    async fazerLogin(data) {
        try {
            const usuario = await Usuario.verifyCredentials(data.email, data.senha);
            return usuario;
        }
        catch {
            throw new Error('Credenciais inválidas');
        }
    }
    async updataPassword(data) {
        if (data.senhaNova !== data.senhaConfirmacao)
            throw {
                status: 422,
                code: 'SENHAS_NAO_COINCIDEM',
                message: 'A nova senha e a confirmação não coincidem',
            };
        const usuario = await Usuario.findByOrFail('email', data.email);
        if (!usuario) {
            throw new Error('Ocorreu um erro ao alterar a senha tente novamente mais tarde');
        }
        const codigoUser = await codigo_tokens.query().where('idUsuario', usuario.id).first();
        if (codigoUser?.codigo !== data.codigoToken)
            throw {
                status: 422,
                code: 'Erro ',
                message: 'Ocorreu um erro ao alterar a senha tente novamente mais tarde',
            };
        usuario.senha = await hash.make(data.senhaNova);
        await usuario.save();
    }
    async obterPerfil(idUsuario) {
        const usuario = await Usuario.query()
            .where('id', idUsuario)
            .preload('enderecos')
            .firstOrFail();
        return new PerfilResponseDto(usuario);
    }
    async actualizarPerfil(idUsuario, data) {
        const usuario = await Usuario.findOrFail(idUsuario);
        if (data.email !== usuario.email) {
            const emailExistente = await Usuario.query()
                .where('email', data.email)
                .whereNot('id', idUsuario)
                .first();
            if (emailExistente) {
                throw {
                    status: 422,
                    code: 'EMAIL_JA_EXISTE',
                    message: 'Este email já está a ser utilizado por outra conta.',
                };
            }
        }
        usuario.nome = data.nome;
        usuario.email = data.email;
        usuario.telefone = data.telefone;
        await usuario.save();
        await usuario.load('enderecos');
        return new PerfilResponseDto(usuario);
    }
    async actualizarEndereco(idUsuario, data) {
        const usuario = await Usuario.query()
            .where('id', idUsuario)
            .preload('enderecos')
            .firstOrFail();
        const enderecoExistente = usuario.enderecos?.[0];
        if (enderecoExistente) {
            enderecoExistente.rua = data.rua;
            enderecoExistente.bairro = data.bairro;
            enderecoExistente.municipio = data.municipio;
            enderecoExistente.cidade = data.cidade;
            await enderecoExistente.save();
        }
        else {
            await EnderecoCliente.create({
                idUsuario: idUsuario,
                rua: data.rua,
                bairro: data.bairro,
                municipio: data.municipio,
                cidade: data.cidade,
            });
        }
        await usuario.load('enderecos');
        return new PerfilResponseDto(usuario);
    }
}
//# sourceMappingURL=UsuarioService.js.map