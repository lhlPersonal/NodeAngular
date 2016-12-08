'use strict';
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('[master] ' + "start master...");

    for (var i = 0; i < 100; i++) {
        cluster.fork(); //fork时会另启一个子进程，运行当前node进程所在的代码。
    }
    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    var num = 0;
    setTimeout(()=> {
        for (let i = 0; i < 1000000; i++) {

        }
    }, 1000);

    console.log(cluster.worker.id, 'finished');
    // http.createServer(function (req, res) {
    //     num++;
    //     console.log('worker' + cluster.worker.id + ":" + num);
    //     res.end('worker' + cluster.worker.id + ',PID:' + process.pid);
    // }).listen(8081);
}