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
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import Usuario from "./usuario.js";
import ItensCarrinho from "./itens_carrinho.js";
export default class Carrinho extends BaseModel {
    static table = 'carrinhos';
    static assignUuid(model) {
        if (!model.id) {
            model.id = randomUUID();
        }
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], Carrinho.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Carrinho.prototype, "idUsuario", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Carrinho.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Carrinho.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Usuario, { foreignKey: 'idUsuario' }),
    __metadata("design:type", Object)
], Carrinho.prototype, "usuario", void 0);
__decorate([
    hasMany(() => ItensCarrinho, { foreignKey: 'idCarrinho' }),
    __metadata("design:type", Object)
], Carrinho.prototype, "itens", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Carrinho]),
    __metadata("design:returntype", void 0)
], Carrinho, "assignUuid", null);
//# sourceMappingURL=carrinho.js.map