import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'push_subscriptions';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery);
            table.uuid('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').notNullable();
            table.text('endpoint').notNullable();
            table.string('p256dh').notNullable();
            table.string('auth').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1786304918197_create_push_subscriptions_table.js.map