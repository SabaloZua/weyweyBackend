var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ItensPedidoSchema } from '#database/schema';
import { randomUUID } from 'node:crypto';
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm';
import Pedido from './pedido.js';
import Produto from './produto.js';
export default class ItensPedido extends ItensPedidoSchema {
    static assignUuid(model) {
        model.id = randomUUID();
    }
}
__decorate([
    belongsTo(() => Pedido, { foreignKey: 'idPedido' }),
    __metadata("design:type", Object)
], ItensPedido.prototype, "pedido", void 0);
__decorate([
    belongsTo(() => Produto, { foreignKey: 'idProduto' }),
    __metadata("design:type", Object)
], ItensPedido.prototype, "produto", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ItensPedido]),
    __metadata("design:returntype", void 0)
], ItensPedido, "assignUuid", null);
//# sourceMappingURL=itens_pedido.js.map