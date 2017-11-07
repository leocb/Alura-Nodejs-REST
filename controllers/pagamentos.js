module.exports = function (app) {
  app.get('/pagamentos', function (req, res) {
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });

  app.get('/pagamentos/pagamento/:id', function (req, res) {
    let id = req.params.id
    console.log('consultando pagamento ' + id);

    let connection = app.persistencia.connectionFactory();
    let pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.buscaPorId(id, function (erro, resultado) {
      if (erro) {
        console.log('erro de consulta: ' + erro);
        res.status(500).send(erro)
        return
      }

      if (resultado.length === 0) {
        console.log('nao encontrado')
        res.sendStatus(204)
        return
      }

      console.log('consulta ok: ' + JSON.stringify(resultado));
      res.json(resultado)
    })

  })

  app.delete('/pagamentos/pagamento/:id', function (req, res) {
    let pagamento = {};
    let id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    let connection = app.persistencia.connectionFactory();
    let pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function (erro) {
      if (erro) {
        res.status(500).send(erro);
        return;
      }
      console.log('pagamento cancelado');
      res.status(204).send(pagamento);
    });
  });

  app.put('/pagamentos/pagamento/:id', function (req, res) {

    let pagamento = {};
    let id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    let connection = app.persistencia.connectionFactory();
    let pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function (erro) {
      if (erro) {
        res.status(500).send(erro);
        return;
      }
      console.log('pagamento criado');
      res.send(pagamento);
    });

  });

  app.post('/pagamentos/pagamento', function (req, res) {

    req.assert("pagamento.forma_de_pagamento",
      "Forma de pagamento eh obrigatorio").notEmpty();
    req.assert("pagamento.valor",
        "Valor eh obrigatorio e deve ser um decimal")
      .notEmpty().isFloat();

    let erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    let pagamento = req.body["pagamento"];
    console.log('processando uma requisicao de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    let connection = app.persistencia.connectionFactory();
    let pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function (erro, resultado) {
      if (erro) {
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
        pagamento.id = resultado.insertId;
        console.log('pagamento criado');

        if (pagamento.forma_de_pagamento == 'cartao') {
          let cartao = req.body["cartao"];
          console.log(cartao);

          let clienteCartoes = new app.servicos.clienteCartoes();

          clienteCartoes.autoriza(cartao,
            function (exception, request, response, retorno) {
              if (exception) {
                console.log(exception);
                res.status(400).send(exception);
                return;
              }
              console.log(retorno);

              res.location('/pagamentos/pagamento/' +
                pagamento.id);

              response = {
                dados_do_pagamanto: pagamento,
                cartao: retorno,
                links: [{
                    href: "http://localhost:3000/pagamentos/pagamento/" +
                      pagamento.id,
                    rel: "confirmar",
                    method: "PUT"
                  },
                  {
                    href: "http://localhost:3000/pagamentos/pagamento/" +
                      pagamento.id,
                    rel: "cancelar",
                    method: "DELETE"
                  }
                ]
              }

              res.status(201).json(response);
              return;
            });


        } else {
          res.location('/pagamentos/pagamento/' +
            pagamento.id);

          let response = {
            dados_do_pagamanto: pagamento,
            links: [{
                href: "http://localhost:3000/pagamentos/pagamento/" +
                  pagamento.id,
                rel: "confirmar",
                method: "PUT"
              },
              {
                href: "http://localhost:3000/pagamentos/pagamento/" +
                  pagamento.id,
                rel: "cancelar",
                method: "DELETE"
              }
            ]
          }

          res.status(201).json(response);
        }
      }
    });

  });
}