module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    res.send('olá :3')
  })

  //CRIA UM PAGAMENTO
  app.post('/pagamentos/pagamento', function(req, res) {

    //Validação dos dados de pagamento
    req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty()
    req.assert("valor", "Valor informado é inválido").notEmpty().isFloat()
    req.assert("moeda", "Moeda informada é inválido").notEmpty()
    let valErrors = req.validationErrors()

    if (valErrors) {
      console.log("Erros de validação encontrados: " + valErrors)
      res.status(400).send(valErrors)
      return
    }

    //Processa o pagamento (Salva no banco)
    let pagamento = req.body
    console.log("Processando novo pagamento")

    pagamento.status = "CRIADO"
    pagamento.data = new Date

    let connection = app.persistencia.connectionFactory()
    let pagamentoDao = new app.persistencia.PagamentoDao(connection)

    pagamentoDao.salva(pagamento, function(erro, resultado) {

      if (erro) {
        console.log("Erro ao processar o pagamento: " + erro)
        res.status(500).send(erro)
        return
      }

      console.log("Pagamento criado")
      res.location("pagamentos/pagamento/" + resultado.insertId)
      res.status(201).json(pagamento)

    })
  })

  //CONFIRMA UM PAGAMENTO
  app.put('/pagamentos/pagamento/:id', function(req, res) {
    let id = req.params.id
    let pagamento = {}

    pagamento.id = id
    pagamento.status = 'CONFIRMADO'

    let connection = app.persistencia.connectionFactory()
    let pagamentoDao = new app.persistencia.PagamentoDao(connection)

    pagamentoDao.atualiza(pagamento, function(erro) {
      if (erro) {
        res.status(500).send(erro)
        return
      }

      res.send(pagamento)
    })

  })
}