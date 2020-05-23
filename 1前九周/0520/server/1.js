// express 他是一个 node的框架； JQ vs JS
// 在浏览器端 能收到状态码 就证明 后台给了我们都对应的响应 
let express = require('express');
let qs = require('qs');// 这个插件是用来处理 xx=xx&xxx=xxx 转成对象
let app = express();
app.listen(8080,function(){
  console.log('服务起于 8080端口')
})

/* 
  req --> request  前端请求信息
  res --> response  后端的响应信息

*/

// 要想实现服务提供静态页  需要我们直到 中间件(中间的插件) 这个概念；
// express中间件的使用
app.use((req,res,next)=>{
  // req  前端的请求信息
  // res  后端的响应信息
  // next是下一步的意思
  req.qqq = 123;
  next()
})

app.use((req,res,next)=>{
  console.log(req.qqq);
  // 不管是请求头还是响应头 都不能有汉字
  res.header('ha','hahahah');// 设置响应头的 就是原生的 setHeader
  next();
})
app.use(express.static('../client'));
// 就是利用中间件  把client中的内容作为静态渲染的文件

// 把接收请求体的逻辑做成一个中间件
app.use((req,res,next)=>{
  let str = '';
  let obj = {};
  req.on('data',function(chunk){
    str += chunk;
  })
  req.on('end',function(){
    try {
      obj = JSON.parse(str)
    } catch (error) {
      obj = qs.parse(str)
    }
    req.postData = obj;// 自定义一个属性 去存储 接收到的前端的请求体
    next();
  })
})

// 后端需要支持跨域
// 需要后端设置一个 响应头  access-control-allow-origin: http://127.0.0.1:5500
app.use((req,res,next)=>{
  console.log(66666)
  res.header("access-control-allow-origin","http://127.0.0.1:5500")
  next()
})



app.get('/list',function(req,res){
  // 就是我们后端做了一个接口 是/list, 这个接口需要用 get的方式请求
  // 我们接口给的内容是 写死的一个对象
  console.log(req.query)// 存储的是前端 传递参数
  res.send({
    code:0,
    data:[]
  })
})
app.post('/add',function(req,res){
  console.log('req.postData',req.postData);
  // 每一次的前端请求  我们后端 都会走一遍中间件
  // 当执行到这个函数的时候 获取请求体的那个中间件 早就执行了
  // 也就是说 我们可以在这个函数中通过 req.postData 获取数据了
  res.send({
    code:0,
    msg:'success'
  })
})

/* app.post('/add',function (req,res) {
  // 我们后端创造一个 /add接口 接口需要使用post的方式请求
  // 实现后端获取前端传递的post参数
  let str = '';
  req.on('data',function(chunk){
    // 当前端 传递请求体时  会触发这个函数
    // chunk 默认传给这个回调函数的参数 代表的是 一段一段的数据
    str += chunk;// 我们后端把请求体 一段一段的拼接起来
  })
  req.on('end',function(){
    // 当前端把数据传递完成之后 会触发这个函数
    console.log(str);
    let obj = {};
    try {
      // 先走这里的代码  若这里的代码执行报错了 则会走到catch
      // 若前端传递时json字符串 那么 我们就直接使用JSON.parse 不会报错
      // 若不是  JSON.parse() 就会报错， 一报错 就走到catch中的代码
      obj = JSON.parse(str)
    } catch (error) {
      // 若是 search 字符串 则可以直接使用 qs这个插件转成对象
      obj = qs.parse(str);
    }
    console.log(obj);// 就是一个对象了 存储的时前端传递的参数
    res.send({
      code:0,
      msg:'你成功了'
    })
  })
  console.log('req.body',req.body)
  
}) */
