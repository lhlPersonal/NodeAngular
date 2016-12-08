/**
 * Created by weztt on 2016/11/20.
 */
'use strict';
let http = require('http');

function sendRequest() {
    http.request({port: 8081}, (res)=> {
        let _data = '';
        res.on('data', (chunk)=> {
            _data += chunk;
        })
        res.on('end', (data)=> {
            console.log(data);
        });
    }).end();
}


for (let i = 0; i < 10; i++) {
    sendRequest();
}