/* 
  原型  
    每一个函数都有一个天生自带的属性 prototype
    每一个实例都有一个的 __proto__的属性指向 所属类 的原型
    每一个默认的原型上 都有一个constructor 指向所属类本身

  原型链 属性的查找机制；先在自身上查找某个属性，不存在就去所属类的原型上查找，
         再没有 就是当前类的原型所属类得原型上查找，。。。直到 找到基类（Object）的原型，没有的话就是undefined；  

  函数的三种角色
    普通函数
    类
    普通对象       

*/

[1,2,3].push()
// typeof null  'object' // 0x  00

function Person(){
  this.name = '珠峰';
  this.age = 10;

}
Person.age = 100;// Person 就是一个普通的对象
let p = new Person();// Person 就是一个类
let obj2 = Person();// Person 就是一个普通函数
console.log(p.__proto__.constructor);
Person.prototype = {
  name:"中国"
}
let p2 = new Person();
console.log(p2.name)
console.log(p2.__proto__.constructor)




//this  函数中的一个特殊字段
function fn(){
  // this对应的是函数执行主体 (谁让这个函数执行了)
  console.log(this)
  console.log(arguments);
  return 123;
}
fn();//window
var obj = {
  // fn:fn 如属性名和属性值 是同一个字符 则可以简写成 一个字符
  fn
}
obj.fn();// obj
// this 是谁  看函数执行的前边有没有点  有点 点前边是谁 this就是谁；
// 事件绑定的函数中的this  是指向了 绑定的那个元素；
//自执行函数中的this 是 window;
[].push(0);// push中的this就是 前边的这个空数组；

// call  apply   让函数执行执行了 返回值就是fn的返回值
// bind         不会让函数执行， 返回值是 一个新函数，新函数中的this是第一个参数；
fn.call([],1,2,2,3)// 把fn中的this指向改成[]; 然后给fn传递了1，2，2，3这几个实参；
fn.apply([],[1,2,3,4])
var fn2 = fn.bind([],1,2,3);// 返回值是一个新函数；






