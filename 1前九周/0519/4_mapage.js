let http = require('http');
let { readFile } = require('./js/promiseFs.js');
let url = require('url');// 专门用来解析路径的；
http.createServer((request, response) => {
  // console.log(request.url)
  // console.log(url.parse(request.url,true))
  let {pathname} = url.parse(request.url,true);//pathname 这个属性 是不带 参数的
  if(pathname == '/'){
    readFile('./static/index.html').then(data => {
      // data 就是 读出来的html文档的内容；
      response.end(data);
    }).catch(err=>{
      // 若后端出现问题 则 返回前端500的错误
      response.statusCode = 500;
      response.statusMessage = 'hahaha';
      response.end('error');
    })
  }else{
    readFile('./static'+pathname).then(data => {
      response.end(data)
    }).catch(err=>{
      console.log(err)
      response.statusCode = 444;
      response.statusMessage = 'not found';
      response.end('error');
    })
  }

}).listen(8889, function () {
  console.log('服务启动成功 端口是8889')
})