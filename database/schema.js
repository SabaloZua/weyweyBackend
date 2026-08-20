var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
export class AuthAccessTokenSchema extends BaseModel {
    static $columns = ['abilities', 'createdAt', 'expiresAt', 'hash', 'id', 'lastUsedAt', 'name', 'tokenableId', 'type', 'updatedAt'];
    $columns = AuthAccessTokenSchema.$columns;
}
__decorate([
    column(),
    __metadata("design:type", String)
], AuthAccessTokenSchema.prototype, "abilities", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], AuthAccessTokenSchema.prototype, "createdAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], AuthAccessTokenSchema.prototype, "expiresAt", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AuthAccessTokenSchema.prototype, "hash", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], AuthAccessTokenSchema.prototype, "id", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], AuthAccessTokenSchema.prototype, "lastUsedAt", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AuthAccessTokenSchema.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AuthAccessTokenSchema.prototype, "tokenableId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AuthAccessTokenSchema.prototype, "type", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], AuthAccessTokenSchema.prototype, "updatedAt", void 0);
export class CarrinhoSchema extends BaseModel {
    static $columns = ['createdAt', 'id', 'idUsuario', 'updatedAt'];
    $columns = CarrinhoSchema.$columns;
}
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], CarrinhoSchema.prototype, "createdAt", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], CarrinhoSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CarrinhoSchema.prototype, "idUsuario", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], CarrinhoSchema.prototype, "updatedAt", void 0);
export class CodigoTokenSchema extends BaseModel {
    static $columns = ['codigo', 'createdAt', 'dataValidade', 'id', 'idUsuario', 'tipoToken', 'updatedAt'];
    $columns = CodigoTokenSchema.$columns;
}
__decorate([
    column(),
    __metadata("design:type", String)
], CodigoTokenSchema.prototype, "codigo", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], CodigoTokenSchema.prototype, "createdAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], CodigoTokenSchema.prototype, "dataValidade", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], CodigoTokenSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CodigoTokenSchema.prototype, "idUsuario", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], CodigoTokenSchema.prototype, "tipoToken", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], CodigoTokenSchema.prototype, "updatedAt", void 0);
export class EnderecoClienteSchema extends BaseModel {
    static $columns = ['bairro', 'cidade', 'createdAt', 'id', 'idUsuario', 'municipio', 'rua', 'updatedAt'];
    $columns = EnderecoClienteSchema.$columns;
}
__decorate([
    column(),
    __metadata("design:type", String)
], EnderecoClienteSchema.prototype, "bairro", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], EnderecoClienteSchema.prototype, "cidade", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], EnderecoClienteSchema.prototype, "createdAt", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], EnderecoClienteSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], EnderecoClienteSchema.prototype, "idUsuario", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], EnderecoClienteSchema.prototype, "municipio", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], EnderecoClienteSchema.prototype, "rua", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], EnderecoClienteSchema.prototype, "updatedAt", void 0);
export class ItensCarrinhoSchema extends BaseModel {
    static $columns = ['createdAt', 'id', 'idCarrinho', 'idProduto', 'preco', 'quantidade', 'updatedAt'];
    $columns = ItensCarrinhoSchema.$columns;
}
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], ItensCarrinhoSchema.prototype, "createdAt", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], ItensCarrinhoSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ItensCarrinhoSchema.prototype, "idCarrinho", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ItensCarrinhoSchema.prototype, "idProduto", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ItensCarrinhoSchema.prototype, "preco", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItensCarrinhoSchema.prototype, "quantidade", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], ItensCarrinhoSchema.prototype, "updatedAt", void 0);
export class ItensPedidoSchema extends BaseModel {
    static $columns = ['createdAt', 'id', 'idPedido', 'idProduto', 'preco', 'quantidade', 'updatedAt'];
    $columns = ItensPedidoSchema.$columns;
}
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], ItensPedidoSchema.prototype, "createdAt", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], ItensPedidoSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ItensPedidoSchema.prototype, "idPedido", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ItensPedidoSchema.prototype, "idProduto", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ItensPedidoSchema.prototype, "preco", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItensPedidoSchema.prototype, "quantidade", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], ItensPedidoSchema.prototype, "updatedAt", void 0);
export class PedidoSchema extends BaseModel {
    static $columns = ['bairro', 'cidade', 'createdAt', 'estado', 'id', 'idUsuario', 'municipio', 'rua', 'total', 'updatedAt'];
    $columns = PedidoSchema.$columns;
}
__decorate([
    column(),
    __metadata("design:type", Object)
], PedidoSchema.prototype, "bairro", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], PedidoSchema.prototype, "cidade", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], PedidoSchema.prototype, "createdAt", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], PedidoSchema.prototype, "estado", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], PedidoSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], PedidoSchema.prototype, "idUsuario", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], PedidoSchema.prototype, "municipio", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], PedidoSchema.prototype, "rua", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], PedidoSchema.prototype, "total", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], PedidoSchema.prototype, "updatedAt", void 0);
export class ProdutoSchema extends BaseModel {
    static $columns = ['createdAt', 'descricao', 'id', 'img', 'nome', 'preco', 'totalPedidos', 'updatedAt'];
    $columns = ProdutoSchema.$columns;
}
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], ProdutoSchema.prototype, "createdAt", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ProdutoSchema.prototype, "descricao", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], ProdutoSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ProdutoSchema.prototype, "img", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ProdutoSchema.prototype, "nome", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ProdutoSchema.prototype, "preco", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ProdutoSchema.prototype, "totalPedidos", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], ProdutoSchema.prototype, "updatedAt", void 0);
export class PushSubscriptionSchema extends BaseModel {
    static $columns = ['auth', 'createdAt', 'endpoint', 'id', 'p256Dh', 'updatedAt', 'usuarioId'];
    $columns = PushSubscriptionSchema.$columns;
}
__decorate([
    column(),
    __metadata("design:type", String)
], PushSubscriptionSchema.prototype, "auth", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], PushSubscriptionSchema.prototype, "createdAt", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], PushSubscriptionSchema.prototype, "endpoint", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], PushSubscriptionSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], PushSubscriptionSchema.prototype, "p256Dh", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], PushSubscriptionSchema.prototype, "updatedAt", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], PushSubscriptionSchema.prototype, "usuarioId", void 0);
export class TipoUsuarioSchema extends BaseModel {
    static $columns = ['createdAt', 'id', 'tipo', 'updatedAt'];
    $columns = TipoUsuarioSchema.$columns;
}
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], TipoUsuarioSchema.prototype, "createdAt", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], TipoUsuarioSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], TipoUsuarioSchema.prototype, "tipo", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], TipoUsuarioSchema.prototype, "updatedAt", void 0);
export class UserSchema extends BaseModel {
    static $columns = ['createdAt', 'email', 'fullName', 'id', 'password', 'updatedAt'];
    $columns = UserSchema.$columns;
}
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], UserSchema.prototype, "createdAt", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], UserSchema.prototype, "fullName", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], UserSchema.prototype, "id", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], UserSchema.prototype, "updatedAt", void 0);
export class UsuarioSchema extends BaseModel {
    static $columns = ['createdAt', 'email', 'id', 'idTipoUsuario', 'navegador', 'nome', 'senha', 'telefone', 'updatedAt'];
    $columns = UsuarioSchema.$columns;
}
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", Object)
], UsuarioSchema.prototype, "createdAt", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], UsuarioSchema.prototype, "email", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], UsuarioSchema.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], UsuarioSchema.prototype, "idTipoUsuario", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], UsuarioSchema.prototype, "navegador", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], UsuarioSchema.prototype, "nome", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], UsuarioSchema.prototype, "senha", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], UsuarioSchema.prototype, "telefone", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], UsuarioSchema.prototype, "updatedAt", void 0);
//# sourceMappingURL=schema.js.map