var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UsuarioSchema } from '#database/schema';
import { randomUUID } from 'node:crypto';
import { beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import TipoUsuario from './tipo_usuario.js';
import EnderecoCliente from './endereco_cliente.js';
import Pedido from './pedido.js';
import PushSubscription from '#models/push_subscription';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
const AuthFinder = withAuthFinder(hash, {
    uids: ['email', 'nome'],
    passwordColumnName: 'senha',
});
export default class Usuario extends compose(UsuarioSchema, AuthFinder) {
    static assignUuid(model) {
        model.id = randomUUID();
    }
}
__decorate([
    belongsTo(() => TipoUsuario, { foreignKey: 'idTipoUsuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "tipoUsuario", void 0);
__decorate([
    hasMany(() => EnderecoCliente, { foreignKey: 'idUsuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "enderecos", void 0);
__decorate([
    hasMany(() => Pedido, { foreignKey: 'clienteId' }),
    __metadata("design:type", Object)
], Usuario.prototype, "pedidos", void 0);
__decorate([
    hasMany(() => PushSubscription, { foreignKey: 'usuarioId' }),
    __metadata("design:type", Object)
], Usuario.prototype, "pushSubscriptions", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Usuario]),
    __metadata("design:returntype", void 0)
], Usuario, "assignUuid", null);
//# sourceMappingURL=usuario.js.map