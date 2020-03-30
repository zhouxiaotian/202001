/* var ary = [100,200,300,400];
let fn = (item,index)=>{// 回调函数
  // item 和 index 都是形参
  // item 是数组中的每一项
  // index 是每一项对应的索引
  console.log(item,index)
  item = 1000;
}
ary.forEach(fn);// fn 是 forEach的回调函数
fn();
console.log(ary) */

var ary = [{a:100},{a:200},{a:300},{a:400},{a:500}];
let fn = (item,index)=>{// 回调函数
  // item 和 index 都是形参
  // item 是数组中的每一项
  // index 是每一项对应的索引
  // console.log(item,index)
  item.a = 1000;
  return index;
}
// ary.forEach(fn);// fn 是 forEach的回调函数
// fn();
// console.log(ary)

// forEach 没有返回值； map有返回值 是一个新数组,新数组是由每一个回调函数执行时候的返回值决定的
var t1 = ary.forEach(fn);
var t2 = ary.map(fn)
// console.log(t1,t2)



var arr = [100,200,300,400];
// [1100,1200,1300,1400];
var newArr = arr.map((item)=>{
  return 1000+item
});
var newArr = arr.map((item)=>1000+item);// 若只有一个形参的情况下 形参的小括号可以省略
var newArr = arr.map(item=>1000+item);
// console.log(newArr);

/* var bol = arr.some((item,index)=>{
  // 只要有一个回调函数的返回值是true 则some的运行结果就是true;
  // 一旦有一个回调函数的结果是true 则 后边的回调就不再执行了；
  console.log('1',item)
  return item > 600
})
var bol2 = arr.some((item,index)=>{
  console.log('2',item)
  return item > 200
})
console.log(bol,bol2); */

var bol = arr.every((item,index)=>{
  // 只要有一个回调函数的返回值是false 则every的运行结果就是false
  // 一旦有一个回调函数的结果是false 则 后边的回调就不再执行了；
  console.log('1',item)
  return item > 600
})
var bol2 = arr.every((item,index)=>{
  console.log('2',item)
  return item > 200
})
console.log(bol,bol2);
// filter  reduce
// Object.is  Object.keys  Object.values Object.assign  

