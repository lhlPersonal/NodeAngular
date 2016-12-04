/**
 * Created by bulusli on 2016/6/1.
 */
"use strict";
class A {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }

    toStringA() {
        return this.x + " ", this.y;
    }
}


class B extends A {
    constructor() {
        super(1, 2);
    }

    toStringB() {
        return this.x;
    }
}

var b = new B();
console.log("################ES6 Inherit by Class########################");
//ES6中，__proto__的指向：可以通过Object.getPrototypeOf()取得
// 父类的__proto__指向function，
// 子类的__proto__指向父类，
// 子类实例的__proto__指向子类的prototype。
// 子类的prototype的__proto__指向父类的prototype。
// 父类的prototype的__proto__指向object
console.log("A:", A);
console.log("B:", B);
console.log("[b.__proto__.__proto__==A.prototype]:", (b.__proto__.__proto__ == A.prototype));
console.log("[B.__proto__]:", (B.__proto__));
console.log("[A.__proto__]:", (A.__proto__));
console.log("[A.prototype]:", (A.prototype));
console.log("[B.prototype]:", (B.prototype));
console.log("[b.constructor==B]:", (b.constructor == B));
console.log("[b.constructor]:", (b.constructor));
console.log("[A.prototype.constructor == A]:", (A.prototype.constructor == A));
console.log("Object.getPrototypeOf(B.prototype)", Object.getPrototypeOf(B.prototype));
console.log("b.__proto__", b.__proto__);

console.log("############ES5 class inherit test##############")

function F1() {
}

F1.prototype = {
    m: {}, n: {a: 1}
};
function F2() {
}

//只继承原型，不继承this属性
var inherit = (function () {
    let F = function () {
    };
    return function (C, P) {
        F.prototype = P.prototype;
        // C.prototype=P.prototype;这样会造成父子关联，改变任何一个的prototype会影响到另一个
        //C.prototype=new P();这样会继承P的this属性。
        C.prototype = new F(); //只继承原型
        C.super = P.prototype;  //超类指针
        C.prototype.constructor = C; //构造函数指向自身，不指定则默认指向Object，造成混乱
    }
})();
//F2.__proto__ = F1;

inherit(F2, F1);
var tt = new F2();

console.log("################ES5 Inherit Implements########################");
console.log("F1:", F1);
console.log("F2:", F2);
console.log("tt:", tt);
console.log("[tt.__proto__ == F2.prototype]:", (tt.__proto__ == F2.prototype));
console.log("[tt.__proto__.__proto__ == F1.prototype]:", (tt.__proto__.__proto__ == F1.prototype));
console.log("[tt.n]:", (tt.n));
console.log("[F2.__proto__]:", F2.__proto__);
console.log("[F1.__proto__]:", F1.__proto__);
console.log("[F2.prototype.__proto__ == F1.prototype]:", (F2.prototype.__proto__ == F1.prototype));
console.log("[Object.keys(F2.prototype)]:", Object.keys(F2.prototype));
console.log("[Object.keys(F1.prototype)]:", Object.keys(F1.prototype));
console.log("[Object.getOwnPropertyNames(F1.prototype)]:", Object.getOwnPropertyNames(F1.prototype));
console.log("[Object.getOwnPropertyNames(F2.prototype)]:", Object.getOwnPropertyNames(F2.prototype));
console.log("[F2.prototype.constructor]:", (tt.constructor.name));


class C extends null {

}
console.log("############null test##############")
console.log("C:", C);
console.log("[ C.prototype.__proto__]:", C.prototype.__proto__);
console.log("[C.__proto__]:", C.__proto__);


console.log("############Property test##############")

var t1 = {};
var f = function () {
};
f.x = 1;
f.y = 2;
var pts = Object.getOwnPropertyNames(f);
pts.forEach((p, i)=> {
    var pd = Object.getOwnPropertyDescriptor(f, p);
    //if (pd.configurable) {
    //    delete f[p];
    //}
    console.log("[PropertyDescriptor]:", pd);
    Object.defineProperty(t1, p, pd);
});
console.log("[OwnPropertyNames]:", Object.getOwnPropertyNames(f));
console.log("[Object.keys]:", Object.keys(f));
console.log("[Reflact.ownKeys]:", Reflect.ownKeys(f));

console.log("#################Symbol test###################")
t1[Symbol("test")] = 42;

console.log("[new obj]:", t1);
console.log("[Symbol]:", Object.getOwnPropertySymbols(t1));

const deviceType = {
    "Switch": Symbol('switch'),
    "AP": Symbol('ap'),
    "Router": Symbol('router'),
    "WirelessController": Symbol('wirelessController')
};
let dev = {};
let getDevByType = function (devType) {
    Object.defineProperty(dev, (devType), {value: devType});
}

getDevByType(deviceType.Switch);
getDevByType(deviceType.Router);

console.log("[dev symbol,dev]:", Object.getOwnPropertySymbols(dev), dev);
var b = {};
Object.assign(b, {a: 1, c: 2});
console.log(b);
console.log("[Symbol for]", Object.is(Symbol.for('111'), Symbol.for('111')));
console.log("[Symbol.keyFor('111')]:", Symbol.keyFor(Symbol.for('111')));

let a = [];
let zz = Object[Symbol.hasInstance].call(Array, a); //内置Symbol的支持
console.log("Object[Symbol.hasInstance].call(Array, []):", zz);

class MyObject {
    static set[Symbol.hasInstance](o) {
        return o instanceof Array;
    }
}

let myobj = new MyObject();
console.log(myobj instanceof MyObject); //调用MyObject[Symbol.hasInstance](myobj)
console.log("Array[Symbol.hasInstance](a)", Array[Symbol.hasInstance](a));   // true`a instance of Array

//console.log(Object.getOwnSymbolNames(b)); not supported


console.log("[].constructor[Symbol.species]", [].constructor[Symbol.species]);
console.log("function(){}.constructor[Symbol.species]", function () {
}.constructor[Symbol.species]);
console.log("{}.constructor[Symbol.species]", {}.constructor[Symbol.species]);
console.log("'1111'.constructor[Symbol.species]", '111'.constructor[Symbol.species]);
console.log("new RegExp().constructor[Symbol.species]", new RegExp().constructor[Symbol.species]);
class MyArray extends Array {
    static get [Symbol.species]() { //改变部分方法调用时返回的值的类型。比如Array的map，slice，filter，splice，concat
        return Object;//return Array,return Function,return Regex,return Number
    }
}
let myarr = new MyArray(1, 2, 3);
let mapped = myarr.map(x => x * x);
let slice = myarr.slice();

console.log(mapped); // false
console.log(slice);
console.log("mapped instanceof Function", mapped instanceof Function);   // true`
console.log((new Function).name);

//var regexp = /\u{20BB7}/u;

{ //支持局部函数定义
    function z({x,y=5}) {
        //  alert("x:" + x + "  y:" + y);
    }

    z({x: 1});
}
//z({y:1});不能再外部调用

console.log("############解析赋值 test##############")

let [x,y]=[{x: 1}, {y: 2}];

let {f1}={
    f1: function () {
        //    alert("etttt")
    }
};

let [x1=(x=>1)()]=[];
console.log("f1", f1());
console.log("x:", x, "y:", y);
console.log("x1:", x1);

{
    function formatOutput(x = 10, y = x) {
        let [p1={x: 1, y: 2}]=[x, y];
        console.log("p1", p1);
    }

    function test1({x=20, y=x}={}) {
        let [p2={x: 1, y: 2}]=[x, y];
        console.log("p2", p2);
    }

    formatOutput();
    test1();
}

console.log("####################增强字符串########################")
//\x表示8位字符，\u为16进制字符，utf-16：单字符16位，汉字32位

//"\254" :Octal literals are not allowed in strict mode.
console.log("\xAF", "\z", "\u{FFFF}", 'a' > 'A', "\0o111"); //0o表示八进制
console.log(`
this string is used for test
   template string.
                will spaces in left be outputed?
`);

let str = '(name)=>`Hello,${name}!!`';
var ff = eval.apply(null, [str]);
console.log(ff('lhl'));

let name = "bulusli";

var newFF = Function('let name="internal clone bulusli";return `Hello,${name}`'); //使用内部变量
var newFF1 = new Function('return `Hello,${name}`');//使用外部变量
console.log(newFF());
console.log(newFF1());

/**
 * tagged template function
 *
 * @param constStr  `xxx`中的所有非变量字符串的数组，如果第一个字符是变量，则第一个为0
 * @param tmlData  `xxx${fff}`中的所有变量字符串数组，数组名为raw
 * @returns {string}
 */
function saferHTML(constStr, ...tmlData) {
    console.log(constStr, tmlData);
    let s = "";
    for (var i = 0; i < tmlData.length; i++) {
        let arg = String(tmlData[i]);
        s += constStr[i];
        s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    s += constStr[i];

    return s;
}

name = "<div>aaa</div>";

var message = saferHTML `<p>Hi\n${name} has sent you a message.</p>`;  //标签模板。
console.log(message);

console.log(String.raw `${(function a() {  //String.raw为官方提供的标签模板函数，用来原样输出转换变量之后的字符串，反斜杠都会被转义
    console.log(5);
}())}ffffff`);  //执行函数，返回字符串

console.log(String.raw `/既{2}/.formatOutput('既既'):`, /既{2}/.test('既既'));
//console.log(String.raw`/\u{61}/.formatOutput('a'):`, /\u{61}/.formatOutput('a'));
//console.log(String.raw`/\u{61}/u.formatOutput('a'):`, /\u{61}/
//u.formatOutput('a')
//)
//;
//console.log(String.raw `/[a-z]/iu.formatOutput('\u212A')`, /[a-z]/i
//u.formatOutput('\u212A')
//)
;

//大于0xFFFF的unicode字符，在es6的字符属性的length依然为2，意为两个utf-16字符。而codePointAt(index)的index值也有两个（0,1），传入0返回的是
//unicode码点，传入1返回的是该字符在utf-16 surrogate pair的0xDC00-0xDFFF中的编码。

let lhl = "李海龙\u{20bb7}";

for (let [index,c] of Array.from(lhl).entries()) {
    if (Object.is(c, '\u{20bb7}')) {
        console.log(c, c.length, c.codePointAt(0).toString(16), c.codePointAt(1).toString(16));
    } else {
        console.log(c, index, "codePointAt:", c.codePointAt(0).toString(16));
    }
}

console.log("[ES5->String.fromCharCode]:0x20BB7", String.fromCharCode(0x20BB7));
console.log("[ES6->String.fromCodePoint]:0x20BB7", String.fromCodePoint(0x20BB7));

//如果要取该字符的实际长度即1，采用如下方式：
let s = '\u{20bb7}'

`1. Array.from(s).length;
 2. [...s].length;
 3. for(let c of s){}
 4. s.match(/[\s\S]/g).length`;

console.log("s:", s);
console.log(`/^.$/.test(s):`, /^.$/.test(s));
console.log(`s.match(/[\s\S]/g).length:`, s.match(/[\s\S]/g).length);

console.log(`[1, 2, 3, 4, 5].slice()`, [1, 2, 3, 4, 5].slice());

console.log("#########default value,rest para,spread sign about function###################")

console.log(`function formatOutput(...item) {
    console.log(item);
}
formatOutput(...[1, 2, 3, 4, 5]);  //传递5个参数
formatOutput([1, 2, 3, 4, 5]); //传递一个参数
formatOutput('a', 'b', 'c'); //传递三个参数 ==formatOutput(...['a','b','c'])
`);
function formatOutput(...item) {
    console.log(item);
}

formatOutput(...[1, 2, 3, 4, 5]);  //传递5个参数
formatOutput([1, 2, 3, 4, 5]); //传递一个参数
formatOutput('a', 'b', 'c'); //传递三个参数 ==formatOutput(...['a','b','c'])
formatOutput(...UnicodeToUTF16(0x20bb7));
formatOutput(...UnicodeToUTF8(0xABCF));

//escape(string) 该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： * @ - _ + . / 。其他所有的字符都会被转义序列替换。

var total = [].reduce.bind([1, 2, 3, 5, 8], (prev, curr, index, arr)=> {
    formatOutput(...["prev:" + prev, "curr:" + curr, "index:" + index, "arr:" + arr]);
    return prev + curr;
}, 10)
formatOutput(total());

console.log("###################currying&tail call optimized########################");
const pipeline = function (...func) {
    return function (val) {
        return func.reduce((a, b)=> {
            return b(a);
        }, val)
    }
}


/**
 *递归调用，有闭包
 * @param func
 * @returns {a}
 */
const pipelineCurrying = function (...func) {
    let _func = func;
    return function a(m) {
        if (_func.length == 0) {
            return m;
        }
        return a(_func.splice(0, 1)[0](m));
    }
}

/**
 * 依次调用函数数组，tail call optimized（尾调用不包含函数内的其它参数）。
 * @param val 将每次计算后的值作为参数传入，避免闭包和调用侦
 * @param func
 * @returns {*}
 */
const pipelineOptimized = function (val, ...func) {
    let arr = func.length;
    if (arr == 0) {
        return val;
    } else {
        if (arr == 1) {
            return pipelineOptimized(func[0](val));
        } else {
            return pipelineOptimized(func[0](val), ...func.slice(1));
        }
    }
}


function testCurry(...rest) {
    console.log("currying output:", ...rest);
}

/**
 * currying化函数，链式连用，中间可任意传递参数，最后一步不传参数则表示执行
 * @param fn
 * @param rest
 * @returns {t}
 */
const currying = function (fn, ...rest) {
    let arg = rest;
    return function t(...rest) {
        arg.push(...rest);
        if (rest.length == 0) {
            return fn.apply(this, arg);
        } else {
            return t;
        }
    }
}

currying(testCurry, 10, 3, 4)("\u{20bb8}", "b")();

formatOutput("cycle call output:", pipelineCurrying((a)=> {
    return a + 1
}, (a)=> {
    return a * 2
})(5));

console.log("###############Object test####################");


