function fn(...arr) {
  // 剩余运算符
  console.log(arr)
}
Math.max(...[1,2,3,4,2,3])// 展开运算符

var a = [1,2,3],
    b = [3,4,5,6];
var c = [...a,...b]; 
console.log(c);  

var o1 = {a:1,b:2,c:3},
    o2 = {q:100,w:200,c:300};
var o3 = {...o1,...o2};
var o4 = {...o2,...o1};
console.log(o3,o4); 

var s1 = Symbol();// Symbol() 每一次执行 都会返回一个唯一的值；


// es6的字符串模板
var myname = "珠峰";
var str = '<div>'+
            '<h1>hello '+myname+'</h1>'+
          '</div>';

// 模板字符串的最大特点就是可以编写换行，若需要变量 则 编写${变量名}；          
var str2 = `<div>
              <h1>hello ${myname}</h1>
            </div>`   ;   
console.log(str);       
console.log(str2)         