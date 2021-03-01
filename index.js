const customExpress = require('./config/customExpress')
const conection = require('./infraestrutura/database/conexao')
const Tables = require('./infraestrutura/database/tables')

conection.connect((erro => {
    if(erro) console.log(erro)
    else {
        console.log('Conectado com sucesso')

        Tables.init(conection)
        const app = customExpress()        

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))    
    }
}))


