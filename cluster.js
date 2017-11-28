let cluster = require('cluster')
let os = require('os')

let cpus = os.cpus()

console.log('executando thread')

if (cluster.isMaster) {
    console.log('master thread');

    cpus.forEach(cpu => {
        cluster.fork()
    });

    cluster.on('listening', worker => {
        console.log('Cluster conectado ' + worker.process.pid);
    })

    cluster.on('exit', worker => {
        console.log('cluster %d desconectado', worker.process.pid);
        cluster.fork()
    })

} else {
    console.log('slave thread');
    require('./index')
}