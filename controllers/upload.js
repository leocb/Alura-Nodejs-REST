let fs = require('fs')

module.exports = function (app) {
    app.post('/upload/imagem', function (req, res) {
        console.log('recebendo imagem')

        let filename = req.headers.filename

        req.pipe(fs.createWriteStream('files/' + filename)
            .on('finish', function () {
                res.sendStatus(200)
                console.log('imagem salva!')
            }))
    })
}