function Person(){
  this.name = "珠峰";
  this.age = 10;
}
Person.prototype.constructor === Person;
Person.prototype.eat = function(){}
Person.prototype.play = function(){}
Person.qwer = 666;// qwer是Person的静态属性
var p = new Person();

// class声明的类 只能通过 new 执行； 不能当作普通函数；
class People{
  constructor(...arg){
    // constructor 就是当前类的函数体；
    this.name = "zhufeng";
    this.age = 10;
    console.log(arg)
  }
  
  eat(){
    // 在这些位置编写的属性 都是属于当前类的共有属性；
    console.log(this.name)
  }
  paly(){

  }
  static qwer = 6666
}
var p2 = new People(1,2,3,4,5)