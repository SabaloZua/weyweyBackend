import { BaseSeeder } from '@adonisjs/lucid/seeders';
import TipoUsuario from '#models/tipo_usuario';
export default class extends BaseSeeder {
    async run() {
        await TipoUsuario.updateOrCreateMany('tipo', [
            { tipo: 'Cliente' },
            { tipo: 'Admin' }
        ]);
    }
}
//# sourceMappingURL=tipo_usuario_seeder.js.map