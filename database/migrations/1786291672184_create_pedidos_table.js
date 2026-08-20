import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'pedidos';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.string('estado').notNullable();
            table.decimal('total', 10, 2).notNullable();
            table.string('rua').nullable();
            table.string('bairro').nullable();
            table.string('municipio').nullable();
            table.string('cidade').nullable();
            table.uuid('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1786291672184_create_pedidos_table.js.map