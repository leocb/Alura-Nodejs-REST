let winston = require('winston')
let fs = require('fs')

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs')
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/payfast.log',
            maxsize: 102400, //100MB
            maxFiles: 10
        })
    ]
})
/*
logger.log('Log utilizando o winston')
logger.log('info', 'Log de info')
logger.info('log maroto')
*/