let cluster = require('cluster')

console.log('executando thread')
if (cluster.isMaster) {
    console.log('master thread');
    cluster.fork()
} else {
    console.log('slave thread');
}