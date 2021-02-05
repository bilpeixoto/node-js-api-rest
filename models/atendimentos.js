const connection = require('../controllers/infraestrutura/conection')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'

        connection.query(sql, atendimento, (erro, resultados) => {
            if(erro) console.log(erro)
            else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento