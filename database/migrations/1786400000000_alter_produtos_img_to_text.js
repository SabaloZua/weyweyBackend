import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'produtos';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.text('img').alter();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('img').alter();
        });
    }
}
//# sourceMappingURL=1786400000000_alter_produtos_img_to_text.js.map