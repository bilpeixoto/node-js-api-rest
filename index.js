const customExpress = require('./config/customExpress')
const conection = require('./infraestrutura/conection')

conection.connect((error => {
    if(error) console.log(error)
    else console.log('')
}))

const app = customExpress()
app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
