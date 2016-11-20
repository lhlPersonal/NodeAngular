/**
 * Created by weztt on 2016/11/20.
 */
let co = require('co');
let Thunk = require('thunkify');

function testThunk(arg1, arg2, callback) {
    console.log(arg1, arg2);
    setTimeout(()=> {
        callback('', 'thunk test');
    }, 200);
}

co(function *() {
    return Thunk(testThunk)('arg1', 'arg2')((err, data)=> {
        console.log('thunk call result:', data);
    });
}).then(result=> {
        console.log('co result:', result);
    }
);