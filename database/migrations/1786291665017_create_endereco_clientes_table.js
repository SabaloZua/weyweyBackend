import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'endereco_clientes';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.string('rua').notNullable();
            table.string('bairro').notNullable();
            table.string('municipio').notNullable();
            table.string('cidade').notNullable();
            table.uuid('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1786291665017_create_endereco_clientes_table.js.map