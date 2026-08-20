import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Produto from '#models/produto';
export default class extends BaseSeeder {
    async run() {
        const img = 'assets/img/shop-food/s1.png';
        await Produto.updateOrCreateMany('nome', [
            {
                nome: 'Hambúrguer Clássico',
                preco: '2500.00',
                img,
                descricao: 'Pão macio, carne grelhada, queijo, alface e molho especial.',
            },
            {
                nome: 'Whopper Burger King',
                preco: '3200.00',
                img,
                descricao: 'Hambúrguer suculento com vegetais frescos e molho da casa.',
            },
            {
                nome: 'Pizza Pepperoni',
                preco: '4500.00',
                img,
                descricao: 'Massa crocante, molho de tomate, queijo derretido e pepperoni.',
            },
            {
                nome: 'Pizza Vegetariana',
                preco: '4200.00',
                img,
                descricao: 'Pizza com legumes frescos, queijo e azeite de oliva.',
            },
            {
                nome: 'Frango Grelhado',
                preco: '3800.00',
                img,
                descricao: 'Peito de frango grelhado, acompanhado de batata e salada.',
            },
            {
                nome: 'Frango Frito Crocante',
                preco: '3000.00',
                img,
                descricao: 'Tiras de frango empanado, crocantes por fora e suculentas por dentro.',
            },
            {
                nome: 'Massa Chinesa',
                preco: '2800.00',
                img,
                descricao: 'Noodles salteados com legumes e molho agridoce.',
            },
            {
                nome: 'Combo Fast Food',
                preco: '5500.00',
                img,
                descricao: 'Hambúrguer, batata frita e refrigerante para uma refeição completa.',
            },
            {
                nome: 'Ruti com Frango',
                preco: '2700.00',
                img,
                descricao: 'Ruti quentinho recheado com frango temperado e vegetais.',
            },
            {
                nome: 'Batata Frita Especial',
                preco: '1500.00',
                img,
                descricao: 'Batatas crocantes com sal e molho à escolha.',
            },
        ]);
    }
}
//# sourceMappingURL=produto_seeder.js.map