/* let ary = [1,2,3,4,5];
// let a = ary[0],
//     b = ary[1]
//     c = ary[2]
//     d = ary[3]
let [a,b,c,d] = ary;// 数组的结构赋值，他是根据位置（索引进行对应的）
console.log(a,b,c,d);

// q  w   对应 1，4
let [q,,,w] = ary;
console.log(q,w)

var x = 1,y = 2;// x = 2, y = 1;不借助第三方变量；
// [x,y] = [y,x];
x = x + y;
y = x - y;
x = x - y;

console.log(x,y); */

let ary = [6,7];
let [a=0,b=0,c=0,d=0] = ary;// 给a,b,c,d一个默认值 0；
console.log(a,b,c,d);

function fn(p1=100,p2=100,p3=100) {
  // 给形参附默认值；
  console.log(p1,p2,p3)
}
fn(1,2)

var obj = {name:"珠峰",age:10,sex:0}
var {name,age,age2=100} = obj; // 把属性转成变量；根据属性名
console.log(name,age,age2);

// var n = obj.name;
var {n:name} = obj;// var name = obj.n;
var {name:n} = obj;// var n = obj.name;
console.log(n,name);

