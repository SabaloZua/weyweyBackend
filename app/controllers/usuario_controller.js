import { createUsuarioValidator, loginUsuarioValidator, updatePasswordValidator, updateProfileValidator, updateAddressValidator, } from '#validators/usuario';
import UsuarioService from '#services/Usuario/UsuarioService';
import { UsuarioResponseDto } from '#dtos/Usuario/UsuarioResponseDto';
import { tratarErro } from '#helpers/error_handler';
export default class UsuarioController {
    async register({ request, response }) {
        try {
            const payload = await request.validateUsing(createUsuarioValidator);
            const service = new UsuarioService();
            const usuario = await service.criarConta(payload);
            const usuarioDto = new UsuarioResponseDto(usuario);
            return response.created({
                message: 'Conta criada com sucesso!',
                usuario: usuarioDto,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async updatePassword({ request, response }) {
        try {
            const payload = await request.validateUsing(updatePasswordValidator);
            const service = new UsuarioService();
            await service.updataPassword(payload);
            return response.ok({
                message: 'Senha actualizada com sucesso.',
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async login({ request, response, auth }) {
        try {
            const payload = await request.validateUsing(loginUsuarioValidator);
            const service = new UsuarioService();
            const usuario = await service.fazerLogin(payload);
            await auth.use('web').login(usuario);
            await usuario.load('tipoUsuario');
            return response.ok({
                message: 'Login efetuado com sucesso!',
                usuario: new UsuarioResponseDto(usuario),
            });
        }
        catch (error) {
            return tratarErro(error, request);
        }
    }
    async logout({ auth, response }) {
        await auth.use('web').logout();
        return response.ok({
            message: 'Sessão encerrada com sucesso!',
        });
    }
    async me({ auth, response }) {
        const usuario = await auth.getUserOrFail();
        return response.ok({
            nome: usuario.nome,
        });
    }
    async profile({ auth, response }) {
        try {
            const usuario = await auth.getUserOrFail();
            const service = new UsuarioService();
            const perfil = await service.obterPerfil(usuario.id);
            return response.ok({ perfil });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async updateProfile({ request, response, auth }) {
        try {
            const usuario = await auth.getUserOrFail();
            const payload = await request.validateUsing(updateProfileValidator);
            const service = new UsuarioService();
            const perfil = await service.actualizarPerfil(usuario.id, payload);
            return response.ok({
                message: 'Dados pessoais actualizados com sucesso!',
                perfil,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
    async updateAddress({ request, response, auth }) {
        try {
            const usuario = await auth.getUserOrFail();
            const payload = await request.validateUsing(updateAddressValidator);
            const service = new UsuarioService();
            const perfil = await service.actualizarEndereco(usuario.id, payload);
            return response.ok({
                message: 'Endereço actualizado com sucesso!',
                perfil,
            });
        }
        catch (error) {
            return tratarErro(error, response);
        }
    }
}
//# sourceMappingURL=usuario_controller.js.map