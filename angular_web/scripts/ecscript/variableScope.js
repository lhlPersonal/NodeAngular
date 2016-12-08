/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/8
 * Summary     : var变量提升
 * Desc        :
 *              函数作用域：
 *                  函数会先在自己的作用域寻找变量，如果找不到，会寻找上级作用域，比如闭包所在的父作用域。
 *                  直到global/window作用域。
 *
 *              1.变量提升时，全局变量始终会放在全局函数的前面，如果同名，则函数会覆盖变量的定义。
 *              2.全局变量被赋值时，如果有同名全局函数，则会覆盖该函数的定义。如下的ep2,ep3
 *              3.函数内部同名变量会提升到函数顶部，覆盖全局变量定义。
 *
 * *************************************************************/

/**
 *ep1
 *
 * 全局变量始终在全局函数前面，同名时函数会覆盖变量
 */
function a() {
}
var a;
console.log(typeof a);  //function

/**
 * ep2
 *
 * 相当于：
 * var b=undefined;
 * b=function() {}
 * console.log('typeof b:',typeof b);
 * b=3;
 * console.log(typeof b);
 */
console.log('typeof b:', typeof b); //function
var b = 3;
function b() {
}
console.log(typeof b); //number

/**
 * ep3
 *
 * 相当于：
 * var c=undefined;
 * c=function c() {}
 * console.log(typeof c);
 * c=2;
 * console.log(typeof c);
 */
function c() {
}
console.log(typeof c); //function
var c = 2;
console.log(typeof c); //number

/**
 * ep4
 * 注释掉的代码放开，则f为function，否则，f为undefined。放开时，var f所在的变量会被function f覆盖。
 *
 * 不放开时相当于：
 * var f;
 * console.log(typeof f);
 * f = function () {}
 *
 * 放开后相当于：
 * var f;
 * f = function () {}
 * console.log(typeof f);
 * f = function () {}
 *
 */
console.log(typeof f); //function
var f = function () {

}
// function f() {
//
// }


/**
 * ep5
 * 函数内部的同名变量会替换全局变量。内部变量也会默认提升，初始值为undefined，直到赋值的时候才有值
 * 相当于：
 *function zz() {var d;if (!d) {console.log('d is undefined');} d = 333;}
 *
 */
var d = 22;
zz();
function zz() {
    if (!d) { //由于内部变量提升，此时d并没有被赋值
        console.log('d is undefined');
    }
    var d = 333;
}


