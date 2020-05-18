let fn = function(a,b){
  return a+b;
}
let fn2 = function(){
  console.log(666)
}
// exports.fn = fn // 把自己的fn 导出去
// exports.fn2 = fn2 // 不支持整个覆盖
// exports={ //不支持整个覆盖
//   fn,fn2
// }
module.exports={
  // 支持整个覆盖  用一个新地址 把 module.exports 整个替换了
  fn,
  fn2
}