var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { randomUUID } from 'node:crypto';
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import Carrinho from './carrinho.js';
import Produto from './produto.js';
export default class ItensCarrinho extends BaseModel {
    static table = 'itens_carrinhos';
    static assignUuid(model) {
        if (!model.id) {
            model.id = randomUUID();
        }
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], ItensCarrinho.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ItensCarrinho.prototype, "idCarrinho", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ItensCarrinho.prototype, "idProduto", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ItensCarrinho.prototype, "quantidade", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ItensCarrinho.prototype, "preco", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], ItensCarrinho.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], ItensCarrinho.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Carrinho, { foreignKey: 'idCarrinho' }),
    __metadata("design:type", Object)
], ItensCarrinho.prototype, "carrinho", void 0);
__decorate([
    belongsTo(() => Produto, { foreignKey: 'idProduto' }),
    __metadata("design:type", Object)
], ItensCarrinho.prototype, "produto", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ItensCarrinho]),
    __metadata("design:returntype", void 0)
], ItensCarrinho, "assignUuid", null);
//# sourceMappingURL=itens_carrinho.js.map