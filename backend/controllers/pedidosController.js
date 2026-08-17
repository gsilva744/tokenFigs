import pedidosService from '../services/pedidosService.js';
import logError from '../utils/logError.js';

class PedidosController {
    async listarTodos(req, res) {
        try {
            const pedidos = await pedidosService.getTodosPedidos();

            if(!pedidos) throw new Error("Erro na hora de buscar os pedidos")

            return res.status(200).json(pedidos);
        } catch (error) {
            logError(error)
            return res.status(500).json({ erro: 'Não foi possível listar os pedidos.' });
        }
    }

    async listarConcluidos(req, res) {
        try {
            const pedidos = await pedidosService.getPedidosConcluidos();

            return res.status(200).json(pedidos);
        } catch (error) {
            logError(error)
            return res.status(500).json({ erro: 'Não foi possível listar os pedidos concluídos.' });
        }
    }

    async listarPendentes(req, res) {
        try {
            const pedidos = await pedidosService.getPedidosPendentes();

            return res.status(200).json(pedidos);
        } catch (error) {
            logError(error)
            return res.status(500).json({ erro: 'Não foi possível listar os pedidos pendentes.' });
        }
    }

    async criarNovoPedido(req, res) {
        const { pedido, cliente, email, telefone, sexualidade, foiAluno } = req.body;

        if (!pedido || !cliente || !email || !telefone || !sexualidade || typeof foiAluno !== 'boolean') {
            throw new Error("Digite os campos corretamente!")
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
            throw new Error("O id do pedido deve ser positivo e inteiro")
        }

        try {
            const pedido = await pedidosService.concluirPedido(id);

            if (!pedido) {
                return res.status(404).json({ erro: 'Pedido não encontrado.' });
            }

            return res.status(200).json(pedido);
        } catch (error) {
            logError(error)
            return res.status(500).json({ erro: 'Não foi possível concluir o pedido.' });
        }
    }
}

export default new PedidosController();
