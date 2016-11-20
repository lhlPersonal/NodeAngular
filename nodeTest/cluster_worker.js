/**
 * Created by weztt on 2016/11/20.
 */
let cluster = require('cluster');
let http = require('http');

if (cluster.isWorker) {
    console.log('fffff');
    http.createServer(function (req, res) {
        res.write(200);
        res.end(`Process ${process.pid} send message`);
        process.send(`Process ${process.pid} handled`);
    }).listen(8081, function () {
        console.log(`Child Server is running on ${process.pid}`);
    });
}


function sendRequest() {
    http.request({port: 3000}, (res)=> {
        let _data = '';
        res.on('data', (chunk)=> {
            _data += chunk;
        })
        res.on('end', (data)=> {
            console.log(data);
        });
    }).end();
}

setTimeout(()=> {
    for (let i = 0; i < 10; i++) {
        sendRequest();
    }
}, 4000);
