// forEach  map  some  every
let fn = item=>{
  // console.log(item)
  return item + 100
}
let ary = [100,200,300,400];
let res1 = ary.forEach(fn);
let res2 = ary.map(fn);
let bol1 = ary.some(item=>item>5)
let bol2 = ary.every(item=>item<100)

let res3 = ary.filter(item=>{
  // 过滤  把回调函数return值是true的想复制一份放到新数组中；
  return item > 2
})
let res4 = ary.filter(item=>{
  return item <= 2
})
// console.log(res3,res4);
let ary2 = [100,200,300,400];
let res5 = ary2.reduce((prev,next)=>{
  // prev,next 形参； prev代表前一项  next代表后一项
  /* 
    若reduce存在第二个参数，那么第一次回调函数执行的时候，prev就是这个参数，next就是数组中的第一项；
    若不存在：
    prev在第一个回调函数执行的时候 是数组中的第一项，在这之后的回调函数执行时，prev是上一个回调函数的返回值
    next在第一个回调函数执行的时候 是数组中的第二项，在这之后都是数组的下一项
    res5 是最后一次回调函数执行时候的返回值
  */
  console.log(prev,next);
  // debugger;// 打断点 让JS代码运行到这个位置的时候停止向下执行
  // return next+20000
  // return next
})


// 练习  使用reduce 实现数组求和；
let ary3 = [10,20,30,40];
let res6 = ary3.reduce((prev,next)=>{
  // debugger
  return prev + next
},1000)


// Object.is(1,1) 类似于 1 === 1；特点就是可以用来比较 NaN  ;具体区分了 +0 和 -0；
Object.is(1,1)

// Object.assign(obj1,obj2,obj3) 是把obj2,obj3,... 合并到obj1中； 返回值是 合并后的obj1;

// Object.keys(obj)    把obj中的所有的属性名组成一个新数组    
// Object.values(obj)  把obj中的所有的属性值组成一个新数组

//obj2 = Object.freeze(obj) obj和obj2是同一个地址； 被冻住的对象不能进行任何操作；

