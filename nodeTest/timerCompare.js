/**
 * Created by weztt on 2016/11/20.
 */
'use strict';
let fs = require('fs');
fs.stat('../app.js', function (err, stat) {
    if (stat) {
        console.log('exits');
    }
});
fs.readFile('../bower.json', (err, ctx)=> {
    console.log(ctx);
});
// new Promise((resolve)=> {
//     setTimeout(()=> {
//         resolve('fffff');
//     });
// }).then((result)=> {
//     console.log(result);
// });

setImmediate(()=> {
    console.log('imme1');
});
setImmediate(()=> {
    console.log('imme2');
});
process.nextTick(()=> {
    setImmediate(()=> {
        console.log('imme2 next1');
    });
    console.log('next1');
});
process.nextTick(()=> {
    setImmediate(()=> {
        console.log('imme2 next2');
    });
    console.log('next2');
});

setTimeout(()=> {
    console.log('timeout1');
},100);
