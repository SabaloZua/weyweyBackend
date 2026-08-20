import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'codigo_tokens';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.string('codigo').notNullable();
            table.uuid('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE');
            table.timestamp('data_validade').notNullable();
            table.string('tipo_token').notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1786291678433_create_codigo_tokens_table.js.map