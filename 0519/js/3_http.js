let http = require('http');
let {readFile} = require('./promiseFs.js')
http.createServer((request,response)=>{
  // 前端向我们后端发送请求的时候 会执行这个回调函数；
  //request 存放的是请求信息
  //response 存放的是响应信息；
  // console.log(request)
  console.log(request.url)// 前端的请求路径
  if(request.url == '/favicon.ico'){
    // 前端这是要 小图标
    readFile('../result.png').then(data=>{
      response.end(data)
    })
    // response.end('666')
  }else{
    response.end('i love you');// 这是前端给后端的响应 参数就是响应信息
  }
  
}).listen(8888,function(){
  console.log('服务启动成功 端口号是8888')
})