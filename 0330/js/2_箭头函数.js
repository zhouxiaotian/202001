// let const  不能重复声明  能够识别块级作用域({})  有暂时性死区(在声明执行 不能调用)
// const 声明的是一个常量 对应的值不能修改；
const ary = [1,2,3];// ary对应的值 是 0x111111
ary[0] = 100;//不会报错 因为给ary的是一个地址；
// ary = [];


// 箭头函数
var f1 = function(a,b){
  console.log(this);
  console.log(arguments);
  return 123;
}
var f2 = (a,b)=>{
  console.log(this);
  console.log(arguments);
  return 123;
}
var obj = {
  f1, // f1:f1
  f2
}
var arguments = 666;
obj.f1(1,2,3);//this 是 obj; arguments 是类数组【1,2,3】
obj.f2(100,200,300);//this 是window;  arguments 

// 箭头函数中 是把 this 和 arguments 当作了普通变量去对待；
// 也就是说 箭头函数中的this 和 arguments 都是去上级作用去中查找去了；
// 对于箭头函数 来说  call apply bind 三者是没有任何作用的

f2.call([],1,2);
var temp = f1.bind([]);// 再对 temp 用bind或者call 或者 apply 处理 里边的this不会再去更改


var f3 = (a,b,...c)=>{
  // ...c 我们成为剩余运算符；把剩下的实参都放到c这个数组中；
  console.log(a,b,c)
  return a + b;
}
f3(1,2,3,4)

// 用箭头函数实现 不定项求和；
var sum = (...ary)=>{
  // ary是个形参
  // 把剩余的所有的实参 都放到 ary这个数组中；
  // console.log(ary)
  // console.log(ary.join('+'));
  return eval(ary.join('+'))
}
// 若函数体中只有一个return的逻辑 可以使用简写；
var sum2 = (...ary)=>eval(ary.join('+'));




/* 
  for 循环 是根据指定的循环次数循环的
  for in 循环 for(let k  in obj){} k 是obj的键值对中的属性名 一般只用来循环 普通对象的 他会把原型上自己添加的属性获取到
  for of 循环  for(let val of obj){}  val 是obj的键值对中的值；
              只能用来循环可迭代(有索引的)的数据类型；
*/
// Array.prototype.qwe = function(){};
var sum3 = (...ary)=>{
  let count = 0;
  /* for(let i = 0; i < ary.length; i++){
    count += ary[i];
  } */
  /* for(let k in ary){
    console.log(k,typeof k);
    count += ary[k]
  } */
  for(let k of ary){
    // 
    console.log(k,typeof k);
  }
  return count
}
/* var obj = {a:123,b:234,c:345};
Object.prototype.qqq = 100;
// Object.defineProperty(obj, 'qqq', {
//   enumerable: false,
// });
for(let k in obj){
  if(obj.hasOwnProperty(k)){
    console.log(k)
  }
  // console.log(k)
} */
var obj = {
  0:123,
  1:234,
  2:345,
  length:3,
  [Symbol.iterator]: function () {
    // index用来记遍历圈数
    let index = 0;
    let next = () => {
        return {
            value: this[index],
            done: this.length == index++
        }
    }
    return {
        next
    }
}
};

function fn3(...ary){
  console.log(ary);
}
Math.max(...[1,2,3,2,1,3,5,2]);// 展开运算符


