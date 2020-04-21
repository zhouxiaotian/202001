/* var str = '珠峰666';
var reg = /\d/; // 只要字符串中含有数字 即可
console.log(reg.test(str)) // true [].push(7)
console.log(reg.test('werwf2ergdfg'))//true
console.log(reg.test('aefasdfsdfsf'))//false
console.log(reg.test('3453245254')) // true */

/* var reg = /\d?/; // 数字出现0或1次  字符串有没有数字都满足情况
console.log(reg.test('zhufeng666')) // true
console.log(reg.test('werwf2ergdfg'))//true
console.log(reg.test('aefasdfsdfsf'))//true
console.log(reg.test('3453245254')) // true
 */

/* var reg = /\d{2,4}/; // 字符串中有没有连续2个或者3个数字 或者4个数字
//  /\d\d/  /\d\d\d/  /\d\d\d\d/
console.log(reg.test('zhufeng666')) // true
console.log(reg.test('werwf2ergdfg'))//false
console.log(reg.test('aefasdfsdfsf'))// false
console.log(reg.test('3453245254')) // true */


/* var reg = /\d{2}/; // 字符串中 有两个连续的数字 即可
console.log(reg.test('zhufeng666')) // true
console.log(reg.test('werwf2e3rgdfg'))// false
console.log(reg.test('aefasdfsdfsf'))// false
console.log(reg.test('3453245254')) // true */


/* var reg = /^\d/; // 要求字符串是 以数字开头的
console.log(reg.test('zhufeng666')) // false
console.log(reg.test('werwf2e3rgdfg'))// false
console.log(reg.test('aefasdfsdfsf'))// false
console.log(reg.test('3453245254')) // true */

/* 
var reg = /^\d{2,3}/; // 要求 字符串 是以 两个或者三个数字开头的 即可
console.log(reg.test('1zhufeng666')) // false
console.log(reg.test('22werwf2e3rgdfg'))// true
console.log(reg.test('432aefasdfsdfsf'))// true
console.log(reg.test('3453245254')) // true */
/* 
var reg = /d{2,3}/; //字符串中 需要有连续两到三个d
console.log(reg.test('1zhufeng666')) // false
console.log(reg.test('22werwf2e3rgdfg'))// false
console.log(reg.test('432aefasdfsdfsf'))// false
console.log(reg.test('3453245254')) // false
 */


/* var reg = /\d$/; // 字符串需要是一个 数字 结尾的字符
console.log(reg.test('1zhufeng666')) // true
console.log(reg.test('22werwf2e3rgdfg'))// false
console.log(reg.test('432aefasdfsdfsf'))// false
console.log(reg.test('3453245254')) // true */

/* 
var reg = /\d{4,6}$/; // 以4-6个数字结尾的字符串
console.log(reg.test('1zhufeng666')) // false
console.log(reg.test('22werwf2e3rgdfg'))// false
console.log(reg.test('432aefasdfsdfsf3456'))// true
console.log(reg.test('3453245254')) // true */

/* var reg2 = /\d/;
var reg = /^\d$/; // 以数字开头 以数字结尾：以一个数字开头 还得以这个数字结尾
// 正则中有 ^ $   他就是说字符串必须全部满足正则
// 正则中没有 ^ $  只要字符串中有符合这个正则的字符即可 
console.log(reg.test('1zhufeng666')) // false
console.log(reg.test('22werwf2e3rgdfg'))// false
console.log(reg.test('432aefasdfsdfsf3456'))// false
console.log(reg.test('3453245254')) // false
console.log(reg.test('3333')) // false
console.log(reg.test('1')) // true
console.log(reg.test('9'))// true
console.log(reg.test('4'))// true
console.log(reg.test('5'))// true 
console.log(reg.test('8'))// true*/

/* 
var reg  = /^\d{2,3}$/;// 以两到三个数字开头 还得以这两到三个数字结尾 
//  也就是说 这个正则只能匹配 两到三位数字的字符串
console.log(reg.test('1zhufeng666')) // false
console.log(reg.test('22werwf2e3rgdfg'))// false
console.log(reg.test('432aefasdfsdfsf3456'))// false
console.log(reg.test('3453245254')) // false
console.log(reg.test('3333')) // false
console.log(reg.test('1')) // false
console.log(reg.test('9'))// false
console.log(reg.test('4'))// false
console.log(reg.test('5'))// false
console.log(reg.test('8'))// false
console.log(reg.test('18'))// true */


/* var reg2 =/^\d\w+\d$/;
var reg = /^\d+\w+\d+$/;
var reg3 = /^\d{1}|\d{1}$/;
var reg4 = /\d[a-z]{0,}\d/
console.log(reg4.test('1zhufeng666'))
console.log(reg4.test('432aefasdfsdfsf3456')) */

/* var reg = /^\d+.\d{2}$/;
console.log(reg.test('123.345'))// false
console.log(reg.test('123r34')) // true
console.log(reg.test('1235345'))//true
console.log(reg.test('123r345')) // false
console.log(reg.test('123 345')) // false
console.log(reg.test('123r45')) // true */

/* var reg = /\\d+/;// 要去匹配一个 \ 后边是1到多个d字符 ‘\ddd’
console.log(reg.test('qqwewer'))
console.log(reg.test('134543'))
console.log(reg.test('134543d'))
console.log(reg.test('dd'))
console.log(reg.test('\dd'))
console.log(reg.test('\\dd')) */


/* var reg = /[a-c]/;// 就是 abc中的任意一个字符
console.log(reg.test('aeadfgergdfgd'))//true
console.log(reg.test('234werrfrb')) // true
console.log(reg.test('acaca')) // true
console.log(reg.test('bbbbb')) // true */

/* 
// [] 中的字符 -  是按照 对应的的阿斯克码值对应的
// var reg = /[c-a]/
// var reg = /[C-a]/ ;// /[A-z]/ /[A-Za-z]/
var reg = /[c\-a]/ ;// c 或者 - 或者 a
var reg = /[.]/;// 在 [] 中的点 就代表 点儿本身  不再具有特殊含义了；量词元字符   | 也不再具有特殊含义了


var  reg = /^[1.2]$/;// 该正则 只能匹配一个字符； 1或.或2
console.log(reg.test('1.2'))//false;
console.log(reg.test('1q2'))//false
console.log(reg.test('1')) // true
console.log(reg.test('2'))// true


var  reg = /^1.2$/;// 该正则 1开头 2结尾 中间有一个任意字符
console.log(reg.test('1.2'))//;true
console.log(reg.test('1q2'))//true
console.log(reg.test('1')) // false
console.log(reg.test('2'))// false

var  reg = /^1\.2$/;// 该正则 1开头 2结尾 中间有一个点
console.log(reg.test('1.2'))//;true
console.log(reg.test('1q2'))//false
console.log(reg.test('1')) // false
console.log(reg.test('2'))// false */


// 转义 一个是正则中的转义   一个是字符串中的转义
//正则中的转义  就是把 正则中 有特殊含义的字符 转义字符本身
//字符串中的转义  就是把 字符串中 有特殊含义的字符 转义成字符本身；' " \

/* 
var reg = /18|19/;// 含有 18或者19即可
console.log(reg.test('18'))
console.log(reg.test('19'))
console.log(reg.test('189'))
console.log(reg.test('1819'))
console.log(reg.test('819'))
console.log(reg.test('1918'))
console.log(reg.test('118')) */

/* var reg = /^18|19/;// 18开头的  或者 含有19的 就是true;
console.log(reg.test('18')) // true
console.log(reg.test('19')) // true
console.log(reg.test('189'))//true
console.log(reg.test('1819'))//true
console.log(reg.test('819'))//true
console.log(reg.test('1918'))//true
console.log(reg.test('118')) // false
console.log(reg.test('119')) // true */

/* var reg = /^18|19$/;// 18开头的  或者 以19结尾的 就是true;
console.log(reg.test('18')) // true
console.log(reg.test('19')) // true
console.log(reg.test('189'))//true
console.log(reg.test('1819'))//true
console.log(reg.test('819'))//true
console.log(reg.test('1918'))//false
console.log(reg.test('118')) // false
console.log(reg.test('119')) // true
 */

// 编写一个正则 只有18 或者 19 匹配的结果是 true; 其他都是false;
var reg = /^(18|19)$/;// 只能匹配18或者19
console.log(reg.test('18')) // true
console.log(reg.test('19')) // true
console.log(reg.test('189'))//false
console.log(reg.test('1819'))//false
console.log(reg.test('819'))//trfalseue
console.log(reg.test('1918'))//false
console.log(reg.test('118')) // false
console.log(reg.test('119')) // false

var reg = /^[18|19]$/;// 只能匹配 1 8 | 1 9 中的一位 
var reg = /^1[89]$/; // 以1开头 后边是 8或者9 结尾；
var reg = /^[18]9$/; // 以1或者8开头  9结尾
var reg = /^1(8|9)$/;// 以1开头 后边是 8或者9 结尾；