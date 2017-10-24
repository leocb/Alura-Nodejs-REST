let restify = require('restify-clients')

let cliente = restify.createJsonClient({
  url: 'http://localhost:3001'
})

cliente.post('/cartoes/autoriza', (erro, req, res, retorno) => {
  console.log('Consumindo serviço de cartões')
  console.log(retorno)
})