var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EnderecoClienteSchema } from '#database/schema';
import { randomUUID } from 'node:crypto';
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm';
import Usuario from './usuario.js';
export default class EnderecoCliente extends EnderecoClienteSchema {
    static assignUuid(model) {
        model.id = randomUUID();
    }
}
__decorate([
    belongsTo(() => Usuario, { foreignKey: 'idUsuario' }),
    __metadata("design:type", Object)
], EnderecoCliente.prototype, "usuario", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EnderecoCliente]),
    __metadata("design:returntype", void 0)
], EnderecoCliente, "assignUuid", null);
//# sourceMappingURL=endereco_cliente.js.map