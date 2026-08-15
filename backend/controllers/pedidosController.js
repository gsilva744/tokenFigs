import pedidosService from '../services/pedidosService.js';

class PedidosController {
    async listarTodos(req, res) {
        try {
            const pedidos = await pedidosService.getTodosPedidos();

            return res.status(200).json(pedidos);
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            return res.status(500).json({ erro: 'Não foi possível listar os pedidos.' });
        }
    }

    async listarConcluidos(req, res) {
        try {
            const pedidos = await pedidosService.getPedidosConcluidos();

            return res.status(200).json(pedidos);
        } catch (error) {
            console.error('Erro ao listar pedidos concluídos:', error);
            return res.status(500).json({ erro: 'Não foi possível listar os pedidos concluídos.' });
        }
    }

    async listarPendentes(req, res) {
        try {
            const pedidos = await pedidosService.getPedidosPendentes();

            return res.status(200).json(pedidos);
        } catch (error) {
            console.error('Erro ao listar pedidos pendentes:', error);
            return res.status(500).json({ erro: 'Não foi possível listar os pedidos pendentes.' });
        }
    }

    async criarNovoPedido(req, res) {
        const { pedido, cliente, email, telefone, sexualidade, foi_aluno: foiAluno } = req.body;

        if (!pedido || !cliente || !email || !telefone || !sexualidade || typeof foiAluno !== 'boolean') {
            return res.status(400).json({
                erro: 'pedido, cliente, email, telefone, sexualidade e foi_aluno são obrigatórios.'
            });
        }

        try {
            const novoPedido = await pedidosService.criarPedido(req.body);

            return res.status(201).json(novoPedido);
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            return res.status(500).json({ erro: 'Não foi possível criar o pedido.' });
        }
    }

    async concluirNovoPedido(req, res) {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ erro: 'O id do pedido deve ser um número inteiro positivo.' });
        }

        try {
            const pedido = await pedidosService.concluirPedido(id);

            if (!pedido) {
                return res.status(404).json({ erro: 'Pedido não encontrado.' });
            }

            return res.status(200).json(pedido);
        } catch (error) {
            console.error('Erro ao concluir pedido:', error);
            return res.status(500).json({ erro: 'Não foi possível concluir o pedido.' });
        }
    }
}

export default new PedidosController();
