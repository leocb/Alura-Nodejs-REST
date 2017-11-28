let cluster = require('cluster')
let os = require('os')

let cpus = os.cpus()

console.log('executando thread')
if (cluster.isMaster) {
    console.log('master thread');
    cpus.forEach(cpu => {
        cluster.fork()
    });
} else {
    console.log('slave thread');
    require('./index')
}