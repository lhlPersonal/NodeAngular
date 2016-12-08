/**
 * Created by bulusli on 2016/7/12.
 */
'use strict';
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

let g = function*() {
    for (let z of hw) {
        console.log(z);
    }
    //let r = yield * hw; //调用另外一个generator函数，返回值为函数返回值
    //console.log("eeee" + r);
    yield  "bb";
};

for (let v of g()) {
    console.log(v);
}

//放在hw.next之后，则不会执行，因为此时已经终止，done:true
//for (let z of hw) {
//    console.log("dddd" + z);  //不会返回 ending
//}

//console.log(hw.next())
// { value: 'hello', done: false }

//console.log(hw.next())
// { value: 'world', done: false }

//console.log(hw.next())
// { value: 'ending', done: true }

//console.log(hw.next())
// { value: undefined, done: true }

console.log(hw[Symbol.iterator]() === hw);

let t = {0: 'a', 1: 'b', 2: 'c', length: 'f'};
t[Symbol.iterator] = function*() {  //自定义interator，利用generator函数
    let keys = Object.keys(this);
    console.log(keys);
    for (let k of keys) {
        yield {key: k, value: this[k]};
    }
}

t[Symbol.iterator] = function () {  //自定义next方法，实现iterator
    let keys = Object.keys(this);
    let index = 0;
    let len = keys.length;
    return {
        next: function () {
            if (index <= len - 1) {
                return {value: t[keys[index++]], done: false};
            } else {
                return {value: undefined, done: true};
            }
        }
    };
}


// for (let i of t) {
//     console.log(i);
// }

// console.log([...t]);

// console.log(Array.from(t));

let arr = [];
// for (let i = 0; i < 10000 * 10000; i++) {
//     arr[i] = (i + 1);
// }

function tailCallOptimize(arr, total) {
    if (arr.length > 0) {
        let t = arr.pop() + total;
        return tailCallOptimize(arr, t);  //return表示跳出方法。不加上就没有tail call optimized
    } else {
        console.log('finish' + total);
    }
}

//tailCallOptimize(arr, 0);


function co1(geFn) {
    let ctx = geFn();
    let next = ctx.next();
    let value = next.value;
    if (next.done) {
        return Promise.resolve(value);
    } else {

    }

    function doGe(fn) {
        if (typeof fn === 'object' && typeof fn.then === 'function') {
            doPromise(fn);
        } else if (typeof fn === 'function') {
            fn(callback);
        }
    }

    function callback(err, data) {
        let value = ctx.next(data);
        if (value.done) {
            doGe(value);
        } else {
            doGe(value);
        }
    }

    function doPromise(promise) {
        promise.then(result=> {
            let next = ctx.next(result);
            let value = next.value;
            if (next.done) {
                Promise.resolve(value);
            } else {
                doGe(value);
            }
        });
    }
}

/**
 * Thunk函数表示传函数代替传值，在JavaScript中，Thunk意指只有一个callback参数的函数。凡是最后一个参数为callback的函数，都可以转换为Thunk函数的形式。
 * @param fn
 * @returns {Function}
 * @constructor
 */
function Thunk(fn) {
    return function (...arg) {

        return function (callback) {
            var called = false;
            arg.push(function () {
                if (called) {
                    return;
                }
                called = true;
                callback.apply(this, arguments);
            });
            return fn.apply(null, arg);
        }
    }
}

function zz(arg1, arg2, callback) {
    console.log(arg1, arg2);
    setTimeout(()=> {
        callback('', 'thunk test');
    }, 200);
}

// let thunkZZ = Thunk(zz);
// thunkZZ('arg1', 'arg2')((para)=> {
//     console.log(para);
// });

function *ge() {
    let r = yield  new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve('aaa');
        }, 100);
    });
    console.log(r);

    let r2 = yield new Promise((resolve)=> {
        setTimeout(()=> {
            resolve('bbb');
        }, 100);
    });
    console.log(r2);

    let r3 = yield  Thunk(zz)('arg1', 'arg2')((para)=> {
        console.log(para);
    });
    console.log(r3);
    return 'ccc';
}

//let geee = ge();  //调用generator函数，返回指向遍历器对象的指针，该遍历器对象含有next函数，调用该函数返回{value;'',done:''}对象。
//console.log('geee:', geee[Symbol.iterator]() === geee);


// co(ge).then(result=> {
//     console.log(result);
// });

let co = require('co');

co(function *() {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve(new Promise((resolve)=> {  //resolve参数为Promise对象时，后面的then函数会等到该promise执行完成再执行。
                setTimeout(()=> {
                    resolve('ffffffff');
                }, 2000);
            }));
        }, 3000);
    }).then((rr)=> {
        console.log(rr);
    })
}).then(result=> {
        console.log('co', result);
    }
);

co(function *() {
    return Thunk(zz)('arg1', 'arg2')((err, data)=> {  //thunk放在generator的return语句中时，
        console.log(data);
    });
}).then(result=> {
        console.log('co', result);
    }
);