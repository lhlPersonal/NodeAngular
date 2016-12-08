/**
 * Created by 小白 on 2016/12/4 0004.
 */


/**
 * 正则标识符：带括号的匹配，每一个括号都会返回一个匹配内容。
 *  ignoreCase:i   multiline:m   global:g  lastIndex:下次匹配位置
 *  source:返回正则模式，不包括斜杠和gim。
 *  exec方法和test方法。
 *
 *   1.匹配范围：*(0次或多次)  ?(0次或1次)  +(1次或多次)  {n}(n次)  {min,(max)}(范围，最少min次，max不写则表示大于min的任意次)
 *   2.匹配内容：\d==[0-9] \D反之   \s==''||(\r\n\t\f\v) \S相反   \w=='数字，字母，下划线'  \W相反   \u代表匹配Unicode字符。
 *   3.[abc],[a-z],[a|b]中括号表示匹配的字符范围。
 *   4.a(?=b)表示a后面跟着b，a(?!b)表示后面跟的不是b。eg: 'Some text'.match(/Some(?= text)/) ==> ["Some"]
 *   5.\b匹配单词的边界，如空格，标点符号，或者其它结束符号。\B反之。
 *      eg: 'Some2 text2 1'.match(/\S{4,}2\b/g)  ==> ["Some2", "text2"]
 *          's2e2 text2 1'.match(/[se]2\b/g)  ==>["e2"]
            's2e2 text2 1'.match(/[se]2/g)    ==>["s2", "e2"]
 *   6.\0表示null.  \x表示ascii码匹配。eg：'dudu'.match(/\x64/g)  ==> ['d','d']。 \u表示Unicode字符匹配。eg:'dudu'.match(/\u0064/g)  ==> ["d", "d"]
 *
 *
 */


/**
 * 字符串匹配  str.match(reg|str)
 * 返回匹配的所有子串的数组。加上括号表示需要单独匹配，match在匹配完整个参数后，也会单独匹配括号中的正则表达式。
 *
 * match参数有两种：
 *   1.正则字符串：如 '(\\d)'
 *   2.正则表达式：如 /(\d)/
 *
 */

'ab012'.match('([a-z])([a-z])');  //加上括号，会在匹配完全部内容后，单独匹配括号中的内容
// ['ab', 'a', 'b']
'ab012'.match('([a-z])');
//  ['a', 'a']
'ab012'.match('[a-z]');//没有括号，则只匹配全部
//  ['a']
'ab012'.match('\\d\\d');
// ['01']
'ab012'.match('(\\d\\d)');
// ['01', '01']
'ab012'.match('(a)');
// ['a', 'a']
'ab012'.match(/\d\d/);
//  ['01']
'ab012'.match(/(\d)\d/);
// ['01', '0']
'0a212'.replace(/\d/g, 't');
//'tattt'

/**
 * 正则匹配
 * regexp.exec(str); 返回匹配的第一个数组
 * regexp.test(str); 返回bool值
 */
/\d/g.exec('0a212');
//['0']
/(\d)/g.exec('0a212');//包含括号会匹配全部和局部，所以只要有匹配，数组的长度最少为2。
//['0', '0']
'0a212'.match(/\d/g);//加上g表示全局匹配
//['0', '2', '1', '2']
'0a212'.match(/\d/);
//['0']
/\d/.test('0a212');
//true

/***
 *
 * 在正则设为g的时候，exec多次调用会一直返回匹配的数组值，并循环执行。
 */
var reg = /\d/g;
reg.exec('0a212');
//["0"]
reg.lastIndex;  //返回下一次开始匹配的index
//1
reg.exec('0a212');
//["2"]
reg.lastIndex;  //返回下一次开始匹配的index
//3
reg.exec('0a212');
//["1"]
reg.exec('0a212');
//["2"]
reg.exec('0a212');
//null

//执行完重新开始
reg.exec('0a212');
//["0"]
reg.exec('0a212');
//["2"]
reg.exec('0a212');
//["1"]
reg.exec('0a212');
//["2"]


/***
 * ip 0-255匹配
 */
/^(([1-2]{1}[0-5]{1}[0-5]{1})|(0?\d?\d{1})\.)$/.exec('255');