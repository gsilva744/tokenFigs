import avaliacaoService from '../services/avalicacaoService.js';

class AvaliacaoController {
    async criar(req, res) {
        const { cliente, avaliacao } = req.body;

        if (typeof cliente !== 'string' || typeof avaliacao !== 'number') {
            return res.status(400).json({
                erro: 'cliente e avaliacao são obrigatórios.'
            });
        }

        try {
            const novaAvaliacao = await avaliacaoService.enviarAvaliacao({
                cliente: cliente.trim(),
                avaliacao: avaliacao
            });

            return res.status(201).json(novaAvaliacao);
        } catch (error) {
            console.error('Erro ao enviar avaliação: ', error);
            return res.status(500).json({ erro: 'Não foi possível enviar a avaliação.' });
        }
    }
}

export default new AvaliacaoController();