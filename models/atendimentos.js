const moment = require('moment')
const axios = require('axios')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimentos')

class Atendimento {
    constructor(){
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = tamanho => tamanho >= 3
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos três caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
      
        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length}
        }
        
        const erros = this.valida(parametros)


        if(erros.length){
            return new Promise((resolve, reject) => reject(erros))
        }
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}   
    
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return {...atendimento, id}
                })
        }
    }

    lista(res){
        return repositorio.lista()
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
    }

    altera(id, valores){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        return repositorio.altera(id, valores)
    }

    delete(id){
        return repositorio.delete(id)
    }
}

module.exports = new Atendimento