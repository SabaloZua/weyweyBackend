import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'usuarios';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.string('nome').notNullable();
            table.string('senha').notNullable();
            table.string('email').notNullable().unique();
            table.string('telefone').nullable();
            table.string('navegador').nullable();
            table.uuid('id_tipo_usuario').references('id').inTable('tipo_usuarios').onDelete('CASCADE');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1786291661467_create_usuarios_table.js.map