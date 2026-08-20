import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'itens_pedidos';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.uuid('id_pedido').references('id').inTable('pedidos').onDelete('CASCADE');
            table.uuid('id_produto').references('id').inTable('produtos').onDelete('CASCADE');
            table.integer('quantidade').notNullable();
            table.decimal('preco', 10, 2).notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1786291675525_create_itens_pedidos_table.js.map