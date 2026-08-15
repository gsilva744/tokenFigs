import pool from '../repository/db.js';

class PedidosService {
    async getTodosPedidos() {
        const resultado = await pool.query(
            'SELECT * FROM pedidos ORDER BY id DESC'
        );

        return resultado.rows;
    }

    async getPedidosConcluidos() {
        const resultado = await pool.query(
            `SELECT * FROM pedidos
             WHERE status = $1
             ORDER BY id DESC`,
            ['concluido']
        );

        return resultado.rows;
    }

    async getPedidosPendentes() {
        const resultado = await pool.query(
            `SELECT * FROM pedidos
             WHERE status = $1
             ORDER BY id DESC`,
            ['pendente']
        );

        return resultado.rows;
    }

    async concluirPedido(id) {
        const resultado = await pool.query(
            `UPDATE pedidos
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            ['concluido', id]
        );

        return resultado.rows[0];
    }

    async criarPedido(pedido) {
        const resultado = await pool.query(
            `INSERT INTO pedidos (pedido, cliente, email, telefone, sexualidade, foi_aluno, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                pedido.pedido,
                pedido.cliente,
                pedido.email,
                pedido.telefone,
                pedido.sexualidade,
                pedido.foi_aluno,
                pedido.status ?? 'pendente'
            ]
        );

        return resultado.rows[0];
    }
}

export default new PedidosService();
