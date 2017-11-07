let fs = require('fs')

fs.createReadStream('imagem.jpg')
    .pipe(fs.createWriteStream('imagem-com-stream.jpg')
        .on('finish', function (error) {
            if (error) {
                console.error(error)
                return
            }
            console.log("Arquivo escrito");
        }))