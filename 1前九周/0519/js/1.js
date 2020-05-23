/* let path = require('path');
console.log(path.resolve('qqq','www'))
console.log(path.join('qqq','www'))

let url = require('url');
let str = 'https://www.baidu.com/search/qqq?a=1&b=2#www';
console.log(url.parse(str))
console.log(url.parse(str,true).query.a); */

let fs = require('fs');

/* fs.readFile('../1_复习.html','utf-8',(err,data)=>{
  if(!err){
    //读取成功
    console.log(data)
  }else{
    console.log('失败',err)
  }
}) */

/* fs.mkdir('./qqq',(err)=>{
  console.log(err)
})  
fs.writeFile('./qqq/1.txt','hello','utf-8',(err)=>{
  console.log(err)
}) */

/* fs.appendFile('./qqq/2.txt','hello ','utf-8',(err)=>{
  console.log(err)
}) */
let {readFile,readdir} = require('./promiseFs')
readFile('./qqq/1.txt').then(data=>{
  console.log('data:',data)
}).catch(err=>{
  console.log(err)
})
readdir('./qqq').then(data=>{}).catch(err=>{})

/* function readFile(url,encoding='utf-8'){
  //encoding='utf-8' es6给形参赋默认值
  return new Promise(function(res,rej){
    // res对应的成功态 要执行的函数
    // rej对应的失败态 要执行的函数
    // executor
    fs.readFile(url,encoding,(err,data)=>{
      if(!err){
        // 读取成功
        res(data)
      }else{
        // 读取失败
        rej(err)
      }
    })
  })
}
function readdir(url){
  return new Promise((res,rej)=>{
    fs.readdir(url,null,(err,data)=>{
      if(!err){
        res(data)
      }else{
        rej(err)
      }
    })
  })
} */