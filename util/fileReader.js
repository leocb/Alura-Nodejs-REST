let fs = require('fs')

fs.readFile('imagem.jpg', function (error, buffer) {
    console.log('arquivo lido')

    fs.writeFile('./imagem2.jpg', buffer, function (error) {
        console.log('arquivo escrito')
    })

})