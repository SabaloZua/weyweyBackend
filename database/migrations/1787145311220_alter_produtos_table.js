import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'produtos';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('total_pedidos').notNullable().defaultTo(0);
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('total_pedidos');
        });
    }
}
//# sourceMappingURL=1787145311220_alter_produtos_table.js.map