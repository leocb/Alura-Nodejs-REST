let memcached = require('memcached')

module.exports = function () {
    return createMemcachedClient
}

function createMemcachedClient() {
    return new memcached('localhost:11211', {
        retries: 10,
        retry: 10000,
        remove: true
    })
}
/*
cliente.set('pagamento-3', {
    id: 20
}, 60000, function (erro) {
    console.log('nova chave adicionada! - pagamento-2')
})

cliente.get('pagamento-3', function (erro, retorno) {
    if (erro || !retorno) {
        console.log('MISS - ' + JSON.stringify(erro))
        return
    }

    console.log('HIT - ' + JSON.stringify(retorno))
})*/