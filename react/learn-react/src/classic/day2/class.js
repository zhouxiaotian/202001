function ZZZ(){
  this.qqq = 123
}
ZZZ.prototype.aaa= function aaa(){}
ZZZ.www = 666

class A {
  constructor(props={}){
    //A的函数体
    this.a = props.a;
    this.b = props.b;
    this.c = 100;
  }
  qqq(){
    // 共有属性  只有类对应的实例才能调用；类本身是调用不到地 
    console.log(this.a,this.b,this.c);
  }
  static qqq = 123 // 静态属性 只有类本身能有调用 类的实例时调用不到
}
class B extends A{
  // constructor(props){
  //   // B的函数体
  //   super(props);// super就是 我们A类的函数体，在这执行的时候 相当于用了call执行这个函数体
  //   // super 就是把A类的私有属性 给了B类 变成了B类的私有属性；
  // }
  aaa(){
    console.log(this)
  }
}
// class继承 把私有的 共有  静态的 全都继承过来了；
console.log(new B({a:1000,b:3000}));