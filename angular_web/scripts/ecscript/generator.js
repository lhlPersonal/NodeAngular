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


for (let i of t) {
    console.log(i);
}

console.log([...t]);

console.log(Array.from(t));

let arr = [];
for (let i = 0; i < 10000 * 10000; i++) {
    arr[i] = (i + 1);
}

function tailCallOptimize(arr, total) {
    if (arr.length > 0) {
        let t = arr.pop() + total;
        return tailCallOptimize(arr, t);  //return表示跳出方法。不加上就没有tail call optimized
    } else {
        console.log('finish' + total);
    }
}

tailCallOptimize(arr, 0);


function a(arg1, arg2, arg3, arg4, callback) {

}

var ff = Thunk(a);
ff(1, 2, 3, 4)(function () {
});

function Thunk(fn) {
    return function (...arg) {
        return function (callback) {
            let args = arg.push(callback);
            return fn.call(this, args);
        }
    }
}



function *call() {
    let v1 = yield new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve('aaaaa');
        }, 100);
    });

}





