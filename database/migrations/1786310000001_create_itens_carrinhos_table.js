import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'itens_carrinhos';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.uuid('id_carrinho').references('id').inTable('carrinhos').onDelete('CASCADE');
            table.uuid('id_produto').references('id').inTable('produtos').onDelete('CASCADE');
            table.integer('quantidade').notNullable().defaultTo(1);
            table.decimal('preco', 10, 2).notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1786310000001_create_itens_carrinhos_table.js.map