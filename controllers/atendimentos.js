const Atendimento = require('../models/atendimentos')


module.exports = app => {    
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {

        Atendimento.adiciona(req.body, res)
        
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = (req.body)
        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req,res) =>{
        const id = parseInt(req.params.id)
        Atendimento.delete(id, res)
    })
}
