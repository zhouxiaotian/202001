let http = require('http');
let { readFile } = require('./js/promiseFs.js');
let url = require('url');
http.createServer((request, response) => {
  // 若想在前端展示页面 则 前端 请求内容时 我们给前端 html文档
  // 需要我们后端把html文档读出来 然后发给前端；
  // readFile('./static/index.html').then(data => {
  //   // data 就是 读出来的html文档的内容；
  //   response.end(data);
  // })
  // 真实情况应该是 前端要什么文件 我们给什么文件 而不应该是不管要啥 给的都是html文件
  console.log(request.url)// 前端的请求路径； 根据这个 我么你来判断给前端什么内容
  switch (request.url) {
    case '/':
      readFile('./static/index.html').then(data => {
        // data 就是 读出来的html文档的内容；
        response.end(data);
      })
      break;
    case '/index.css':
      readFile('./static/index.css').then(data => {
        response.end(data)
      })
      break;
    case '/index.js':
      readFile('./static/index.js').then(data => {
        response.end(data)
      })
      break;
    case '/result.png':
      readFile('./static/result.png').then(data => {
        response.end(data)
      })
      break;
    case '/favicon.ico':
      readFile('./static/favicon.ico').then(data => {
        response.end(data)
      })
      break;
    default:
      response.end('666')
      break;
  }

}).listen(8889, function () {
  console.log('服务启动成功 端口是8889')
})