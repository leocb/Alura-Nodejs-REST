module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    res.send('olá :3')
  })

  app.post('/pagamentos/pagamento', function(req, res) {
    let pagamento = req.body
    console.log(pagamento);
    res.send('Bip bop, eu sou um robo')
  })
}