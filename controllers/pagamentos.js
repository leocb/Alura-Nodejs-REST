module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    res.send('olá :3')
  })

  app.post('/pagamentos/pagamento', function(req, res) {
    let pagamento = req.body
    console.log("Processando novo pagamento")

    pagamento.status = "Criado"
    pagamento.data = new Date

    let connection = app.persistencia.connectionFactory()
    let pagamentoDao = new app.persistencia.PagamentoDao(connection)

    pagamentoDao.salva(pagamento, function(erro, resultado) {
      console.log("Pagamento criado");
      res.json(pagamento)
    })
  })
}