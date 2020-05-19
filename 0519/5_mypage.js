let http = require('http');
let { readFile,writeFile } = require('./js/promiseFs.js');
let url = require('url');// 专门用来解析路径的；
http.createServer((request, response) => {
  // console.log(request.url)
  // console.log(url.parse(request.url,true))
  let {pathname,query} = url.parse(request.url,true);//pathname 这个属性 是不带 参数的
  // console.log(query)
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
    // 当前端的请求路径是/list的时候 我们后端要把data/list.json 中的内容返给前端；
    // 路径行带后缀的 我们正常读取staic中的内容
    // 不带后缀的 我们去data文件夹中获取
    if(/\.\w+/.test(pathname)){
      // 有后缀的
      readFile('./static'+pathname).then(data => {
        response.end(data)
      }).catch(err=>{
        console.log(err)
        response.statusCode = 444;
        response.statusMessage = 'not found';
        response.end('error');
      })
    }else{
      // 当前端 调用 add接口时  我们后端 1 怎么获取前端传递的参数 ？
      // 2 拿到传递的参数之后 怎么写入到list.json中？
      switch (pathname) {
        case '/add':
          // console.log(query.val)// 可以获取前端传递的参数
          // response.end('666')
          readFile('./data/list.json').then(data=>{
            // data 是读取到的json文件中的数据 是一个字符串
            data = JSON.parse(data);//把data从字符串转成了数组
            data.push(query.val);// 再把修改之后的数组写入到JSON文件中
            writeFile('./data/list.json',JSON.stringify(data)).then(data=>{
              // 走到这里才是写入成功了
              response.end(JSON.stringify({
                code:0,
                msg:'你成功了'
              }))
            }).catch(err=>{
              console.log(err);
              
            })
          })
          break;
        case '/list':
          readFile('./data'+pathname+'.json').then(data=>{
            response.end(data)
          })
          break;
        default:
          break;
      }
      
    }
    
  }

}).listen(8889, function () {
  console.log('服务启动成功 端口是8889')
})