/**
 * Created by weztt on 2016/11/20.
 */
let cluster = require('cluster');
let http = require('http');

if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    var num = 0;
    http.createServer(function (req, res) {
        num++;
        console.log('worker' + cluster.worker.id + ":" + num);
        res.end('worker' + cluster.worker.id + ',PID:' + process.pid);
    }).listen(8081);
}
