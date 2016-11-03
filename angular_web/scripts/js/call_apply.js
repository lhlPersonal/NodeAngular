/**
 * Created by bulusli on 2016/7/12.
 */
'use strict';
var x = 1;
var t = (function () { //call调用函数时，如果传入的是实例，则函数里的this作用在该实例上，如果传入的不是实例，则this作用在传入的参数上，相当于参数本身。一句话，call相当于用call的参数去执行函数里面的代码。遇到this就适用前述规则。
    var z = Math.pow(2, this);
    console.log(z);
    return this;
}).call(function a() {
    return 10;
}());
console.log(JSON.stringify(t));


var newArr = (function a(n, arr = []) {
    if (n > 0) {
        //  arr.push(n--);
        [].push.call(arr, n--);
        return a(n, arr);
    } else {
        return arr.reverse();
    }
})(5);

console.log(newArr);


(function getName() {
    alert();
}());

/**
 *


 new操作符可以用来产生一个对象的实例。并将该实例作为函数上下文中的this对象来引用。 
 new的过程 
 语法上，以上的效果是一致的。 var obj =newConstructor; var obj =newConstructor(); 
 但是，需要注意的是，我们不能认为Contructor后面的括号是函数调用的括号。如果这是对函数的调用，那么以下的代码正好说明它的不合理性。 var obj =new(Construcotr()); 
 所以，不能错误的认为，new的过程，是“产生对象实例并调用构造函数”。 
 引用蝴蝶书的例子，如果new运算符是一个方法而不是运算符，它作用的过程，应该类似于： Function.method('new',function(){ // 创建一个新对象，它继承字构造函数的原型对象 var that =Object.create(this.prototype); // 调用构造函数，绑定 this 到对象上 var other =this.apply(that, arguments); // 如果返回值不是对象，就返回该新对象 
return(typeof other ==='object'&& other)|| that; }); 
 返回对象 
 默认情况下，调用new操作符返回对象的实例。ECMAScript 13.2.2中对构造函数返回值定义为： 
 If Type(result) is Object then return result. 

 这样可以修改构造函数默认返回的对象实例。 functionFoo(){ this.name ='foo'; return{}; } 
 var foo =newFoo(); foo.name;// undefined 
 注意的是，只能通过返回一个引用类型或对象实例，而不是能true、123、'abc'之类的。 
 内置对象 
 如果把JS内置的构造函数当作构造函数调用，对于引用类型（Array、Function和Object），还是会创建一个该对象实例的返回值，这意味着以下代码效果是等同的： var arr =newArray('a','b'); var arr =Array('a','b'); 
 但是，String、Boolean、Number这些非引用类型的构造函数，被当成函数调用，得到的结果相当于实例的valueOf。 
 var str =newString('abc');// String 
 var str =String('abc');// 效果等同： new String('abc').valueOf(); 
 另外，Date类型特别的类型转换了一下，比较容易误解。 
 容错处理 
 虽然墨守成规的认为首字母大写的是构造函数，但也难免会疏忽而直接调用。 functionFoo(){ 
// 没有使用new操作符调用构造函数时的容错处理。 
if(!(thisinstanceofFoo)){ 
returnnewFoo(); } // ... 
} 
 var foo =newFoo(); 

 * @returns {*}
 * @constructor
 */
function TestObj() {
    //this.a = 1;
    //this.b = 2;
    //this.c = 3;

    //new的实际过程，new TestObj===new TestObj(),不是直接调用函数，而是调用类似如下的一个method，
    //返回一个object对象或者其它实例对象。new时，定义的属性或者prototype上的属性会绑在this对象上。
    //let _this = Object.create(this.prototype);
    //let other = this.apply(_this, arguments);
    //return (Object.is(typeof other, "object") && other) || _this;
}

TestObj.prototype.func1 = function () {
    console.log("func1");
}

let obj = new TestObj;
console.log(obj);
obj.func1();

let s = new String("test");
let s1 = String("test");//s.valueOf();
s[Symbol.toPrimitive] = function (hit) { //转换时使用，hit为需要转换成的类型,"number", "string", and "default"
    console.log(hit + " eeeee");
    if (Object.is(hit, 'number')) {  //+s 时，即意味着字符串转换为整数，会调用toPrimitive方法。
        return 200;
    }
    return "2222";
};

/**
 * 数学符号+运行符与其它类型结合使用时，其它类型会进行数字转换，结果如下：
 * bool值，null，整数数字字符（包括十六进制，可以带+、-符号），数组，日期，都会转换成数字
 * undefined，非整数数字字符（数字前有除了+、-、进制之外的符号），对象，无法转换，输出NaN
 */
console.log(+true, +null, +undefined, +false, +"+100", +"4/3", +"0xAD",+"4.000000" + {}, +[], +(new Date()));
console.log(-true, -null, -undefined, -false, -"-100", -{}, -[], -(new Date()));