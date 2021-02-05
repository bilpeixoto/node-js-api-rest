const connection = require('../controllers/infraestrutura/conection')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        // const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        // const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: moment(data).isSameOrAfter(dataCriacao),
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: atendimento.cliente.length >= 5,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)


        if(erros.length) res.status(400).json(erros)
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
    
    
            connection.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) res.status(400).json(erro)
                else {
                    res.status(201).json(resultados)
                }
            })
        }
    }
}

module.exports = new Atendimento