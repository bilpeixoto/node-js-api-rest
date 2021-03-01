const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?'
        return query(sql, atendimento)
    }

    lista(){
        const sql = 'SELECT * FROM Atendimentos'
        return query(sql)
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
        return query(sql)
    }

    altera(id, valores){
        const sql = `UPDATE Atendimentos SET ${valores} WHERE id=${id}`
        return query(sql)
    }

    delete(id){
        const sql = `DELETE from Atendimentos WHERE id=${id}`
        return query(sql)
    }
}

module.exports = new Atendimento()