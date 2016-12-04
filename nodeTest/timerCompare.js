/**
 * Created by weztt on 2016/11/20.
 *
 *执行顺序:process.nextTick-->I/O events-->setImmediate<==>setTimeout
 *
 * nextTick会在当前事件循环执行完成之后立即执行，有多少个执行多少个，nodejs中最多为1000个。该方法会阻塞I/O事件的执行，所以一般不要用。
 * setImmediate和setTimeout会在I/O调用之后执行，但两者的执行顺序不确定。
 * I/O事件：底层利用线程池执行，执行完成，通知I/O回调，回调执行的时间取决于操作系统和文件系统。
 * setImmediate会放在event loop的队尾，在I/O事件执行之后按顺序执行setImmediate队列里的所有回调函数。
 * 而setTimeout如果时间设为0的话，会默认为1，会先于setImmediate执行。
 *
 */
'use strict';
let fs = require('fs');

for (let i = 0; i < 100000; i++) {
    setImmediate(()=> {
        console.log('imme', i);
    });
}
setImmediate(()=> {
    console.log('imme2');
});

fs.stat('../app.js', function (err, stat) {
    if (stat) {
        console.log('exits');
    }
});
fs.readFile('../bower.json', (err, ctx)=> {
    console.log('bpwer.json');
});

process.nextTick(()=> {
    console.log('next1');
});

process.nextTick(()=> {
    console.log('next2');
});
