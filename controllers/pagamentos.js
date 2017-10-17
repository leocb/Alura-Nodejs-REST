module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    res.send('olá :3')
  })

  app.post('/pagamentos/pagamento', function(req, res) {
    let pagamento = req.body
    console.log("Processando novo pagamento")

    pagamento.status = "Criado"
    pagamento.data = new Date

    res.send(pagamento)
  })
}