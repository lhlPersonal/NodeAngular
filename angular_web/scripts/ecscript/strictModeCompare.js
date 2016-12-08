/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/8
 * Summary     : strict mode and no strict mode
 * *************************************************************/

var o = {};
Object.defineProperty(o, 'readOnlyProp', {
    value: 'read',
    writable: false, //只读属性
    configurable: false //不可更改
});
/**
 * Strict mode
 */
(function (p1, p2, p3) {
    'use strict';
    /**
     * 1 .变量必须先声明再使用
     */
    d = 10;
    console.log(d);  //Uncaught ReferenceError: d is not defined，


    /**
     *  2. this不指向全局变量
     */
    console.log(this); //undefined


    /**
     * 3. 不能存在同名的参数
     */
    function f(a, a) {
    }//Uncaught SyntaxError: Duplicate parameter name not allowed in this context


    /**
     *   4. 不允许使用with语句
     */
    with (document) getElementById('aaa');


    /**
     *  5. 不能给readonly属性赋值
     */
    o.readOnlyProp = 'ffff';  //Uncaught TypeError: Cannot assign to read only property 'readOnlyProp' of object '#<Object>'(…)

    /**
     * 5. 不能删除不可删除的属性
     */
    delete  o.readOnlyProp;  //Uncaught TypeError: Cannot delete property 'readOnlyProp' of #<Object>(…)


    /**
     * 6.  不能删除变量
     */
    delete o;  //Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.

    /**
     * 7. 不能使用前缀0表示8进制
     */
    var a = 07; //prefer var a=0o7;
    console.log(a); //Uncaught SyntaxError: Octal literals are not allowed in strict mode


    /**
     *  8. eval中的变量不会成为函数的变量
     */
    eval('var b=0;');
    console.log('aaaaa:', b);  //Uncaught ReferenceError: b is not defined(…)


    /**
     * 9. 不能使用arguments.callee, arguments.caller, fn.caller, fn.arguments
     */
    //Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them(…)，不能使用
    console.log(arguments.callee, arguments.caller);
    function temp() {
    }

    console.log(temp.caller, temp.arguments);


    /**
     * 10 .eval和arguments不能被赋值
     */
    eval = null;
    arguments = [2];


    /**
     * 11. arguments跟实际参数互不影响
     */
    console.log(arguments);
    arguments[1] = 200;
    console.log('arg:', p2); //2，arguments跟实际传入的参数没关系。


    /**
     * 12. 新增一堆关键字
     */
    var protected = 'a';
    var interface = 'a';
    var static = 'a';
})(1, 2, 3);


/**
 * No strict mode
 */
(function (p1, p2, p3) {
    d = 10;
    console.log(d); //10

    console.log(this);//window

    function f(a, a) { //第二个a会忽略
    }

//可以正常使用，来自taobao
    // with (document)with (body)with (insertBefore(createElement("script"), firstChild))setAttribute("exparams", "category=&userid=68497352&aplus&yunid=", id = "tb-beacon-aplus", src = (location > "https" ? "//s" : "//a") + ".tbcdn.cn/s/aplus_v2.js");

    o.readOnlyProp = 'ffff';

    console.log(delete  o.readOnlyProp); //返回false

    console.log(delete o); //false

    // var a = 07;
    // console.log(a); //7

    eval('var a=0;'); //a会被引入到函数作用域
    console.log('a:', a); //a:0

    //可以使用
    // console.log(arguments.callee, arguments.caller);
    // function temp(p1, p2) {
    // }
    //
    // console.log(temp.caller, temp.arguments);

    //可以重新赋值
    eval = null;
    console.log(arguments);
    arguments[1] = 200;
    console.log('arg:', p2); //200 拷贝

    var protected = 'a';
    var interface = 'a';
    var static = 'a';
})(1, 2, 3);


