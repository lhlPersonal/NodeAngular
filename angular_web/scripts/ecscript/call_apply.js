/**
 * Created by bulusli on 2016/7/12.
 */
'use strict';
var x = 1;

/**
 *
 *函数调用call/apply
 *
 *1. 如果call/apply的第一个参数具有this属性（除了null和undefined之外都是，如果是字符串，bool值，数字等基本类型，会转换成对象类型），则该参数的this(self)会替换调用函数的this（如果调用函数里面有this引用）。
 *   eg：   (function(){return this.z;}).apply({z:3});
 *  result:3;
 *
 *   eg:    (function(){return this;}).apply(function(){this.a=1;return {z:3}});
 *   result: function(){this.a=1;return {z:3}};
 *
 *   eg:     var t = (function () {
 *           var z = Math.pow(2, this);
 *           console.log(z);  //1024
 *           return this;   //this为10.
 *           }).call(10);//call/apply中的参数不为undefined或者null，则该参数始终会替换调用函数的this。
 *
 * *   result: 1024
 *
 *
 *3. 如果调用函数里面没有显式的this调用，则相当于直接执行调用函数。
 *  eg:    (function(){return {f:5};}).apply(function(){this.a=1;return {z:3}});
 *  result:{f: 5};
 */

(function(){console.log('ttt');}).apply(function(){this.a=1;this.b=2;return 'apply para'});  //调用函数不包含this，相当于直接调用。
//ttt,undefined

(function(){return this;}).apply(function(){this.a=1;this.b=2;return 'apply para'});  //调用函数返回this，此时this为apply的参数function。
//function(){this.a=1;this.b=2;return 'apply para'}

(function(){return new this;}).apply(function(){this.a=1;this.b=2;return 'apply para'}); //new 参数，返回对象，因为参数函数返回的是基本类型，new操作符依然起作用。
//Object {a: 1, b: 2}

(function(){return new this;}).apply(function(){this.a=1;this.b=2;return {zzz:3}});//此时new操作符和下面的调用this一样，相当于直接调用参数函数，因为参数函数返回的是对象
//Object {zzz: 3}

(function(){return this();}).apply(function(){this.a=1;this.b=2;return {zzz:3}});//同上一个函数
//Object {zzz: 3}

(function(){return this;}).apply('apply para');//此时this为apply中字符串对象
//String {0: "a", 1: "p", 2: "p", 3: "l", 4: "y", 5: " ", 6: "p", 7: "a", 8: "r", 9: "a", length: 10, [[PrimitiveValue]]: "apply para"}

(function(){return this;}).apply(new String('ffff'));//this为apply中的string对象。
//String {0: "f", 1: "f", 2: "f", 3: "f", length: 4, [[PrimitiveValue]]: "ffff"}0: "f"1: "f"2: "f"3: "f"length: 4__proto__: String[[PrimitiveValue]]: "ffff"

(function(){return this;}).apply(0); //this为apply中的数字对象
//Number {[[PrimitiveValue]]: 0}__proto__: Number[[PrimitiveValue]]: 0

(function(){return this;}).apply(true);//this为apply中的bool对象
//Boolean {[[PrimitiveValue]]: true}

(function(){return this;}).apply(/^2/); //this为apply中的正则对象
//:/^2/

(function(){return this;}).apply(NaN); //this为数字对象，因为NaN也为数字类型
//Number {[[PrimitiveValue]]: NaN}

(function(){return this;}).apply(null);//此时相当于直接调用，this指向全局对象
//Window

(function(){return this;}).apply(undefined);//同null
//Window

(function(){return this;}).apply([]);//this为apply中的数组对象
//[]

/**
 *
 * bind的不同应用
 *
 * 1. 普通方法的bind。
 *    eg:    var ff=[1,2,3];var zz=[].push.bind(ff,5,6,7);
 *    result:zz=function push(){[native code]};
 *            zz()=6;//调用push:5,6,7之后数组的长度。
 *            ff=[1,2,3,5,6,7]  //改变后的数组。
 *
 * 2. bind.apply。 自身bind，需要利用apply或者call。a
 *
 *    bind.apply中的参数会从{b:2}开始传入para形参中。{a:10}会被截取。
 *    eg:    var zz=Function.prototype.bind.apply(function(para){return para.a;},{ a:10},{b:2});
 *    result:zz=function(para){return para.a;};//相当于zz=function({b:2}){return para.a;};
 *           zz()=undefined
 *
 *    eg:    var f=Function.prototype.bind.apply(function(){return {a:1}})
 *    result:
 *           f=function(){return {a:1}};
 *           f()=new f()={a: 1};   //函数返回对象或者实例的时候，new和直接调用都会返回该对象或者实例。如果函数返回的是基本类型，如字符串，bool值，数字等等，则new还是会应用在this上，返回值不会被使用。
 *
 * 3. apply.bind。
 *    eg:    var zz=Function.prototype.apply.bind(function(){return this;},function(){return 10;});
 *    result:zz=function apply(){[native code]};//相当于function zz(){ (function(){return this;}).apply(function(){return 10;});}
 *           zz()=function(){return 10;}
 *           zz()()=10;
 *
 *    eg:    var zz=Function.prototype.apply.bind(function(){return this.a;},{ a:10});
 *    result:zz=function apply(){[native code]};//相当于function(){(function(){return this.a;}).apply({a:10});};
 *             zz()=10;
 */


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