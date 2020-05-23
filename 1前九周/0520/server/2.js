// 实现登录注册
let express = require('express');
let qs = require('qs');
let session = require('express-session');//声明用户id并种植到前端的cookie中
let app = express();
let {readFile,writeFile} = require('./promiseFs.js');
app.listen(8080,function(){
  console.log('后台服务起于8080端口')
})

// 处理跨域
app.use((req,res,next)=>{
  res.header('access-control-allow-origin','http://127.0.0.1:5500')
  //因为 前端 设置了允许 跨域携带cookie 那么后端页必须设置下边的着响应头才行
  res.header('Access-Control-Allow-Credentials',true);//

  next();
})

// 是为了识别当前登录者 是谁
// 设置完这个属性之后，我们的req上 会多了一个 session的属性  
app.use(session({
  secret:'renjinhui',// 声明的那个id依赖这个字段
  saveUninitialized:false,//强制将未初始化的session存储
  resave:false,//强制保存session， 即使没有发生改变；
  cookie:{
    // 设置cookie的存活时间为一天；24小时
    maxAge:1000*60*60*24
  }
}))

//处理post参数
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

// 获取存储用户信息的那个数组
app.use((req,res,next)=>{
  // 先去把文件读出来 使用我们封装的promiseFs
  readFile('./json/user.json').then(data=>{
    // data 就是我们读取到的文件内容 他是一个json字符换
    let ary = JSON.parse(data);// ary就是json文件存储的那个数组；
    req.userData = ary;// 把这个数组存储到req上 方便下边的接口使用；
    next();
  })
})

// 创造接口
app.post('/login',function(req,res){
  // 怎么才能算是登录成功?
  // 根据穿过用户信息  去数据源 user.json 中对比 有没有这个人 密码一致不一致
  let {username,psw} = req.postData;
  let bol = req.userData.some(item=>{
    // item 是数据源中的每一个用户信息
    return item.username == username && item.psw == psw;
  })
  // 若bol是一个true 那么就证明 有这个人 密码也对
  if(bol){
    req.session.qqquserid = username;//登录成功之后 再session存一个能识别用户的信息
    res.send({
      code:0,
      msg:'你登陆成功了'
    })
  }else{
    res.send({
      code:1,
      msg:'你登陆失败了'
    })
  }
  
})
app.post('/reg',(req,res)=>{
  // 当用户注册的时候 我们后台应该把这个用户信息存储起来；
  // console.log(req.postData);// 获取到的是前端传过来的用户名和密码
  // console.log(req.userData);// 获取到的是json文件中存储的那个数组；
  // 获取到用户信息之后 我们要把这条信息 存储到user.json中的那个数组中去；
  // 下一步  究竟是把前端给的用户信息 存储到 这个数组中，然后把更改之后的数组重新写入到json文件中
  let ary = req.userData;
  ary.push(req.postData);
  writeFile('./json/user.json',JSON.stringify(ary)).then(data=>{
    // 写入成功  告诉前端OK了
    res.send({
      code:0,
      msg:'你注册成功了'
    })
  }).catch(err=>{
    res.send({
      code:1,
      msg:'注册失败'
    })
  })
  // res.send({
  //   code:0,
  //   msg:'你注册成功了'
  // })
})

app.get('/info',(req,res)=>{
  console.log(req.session.qqquserid)
  // 就是需要根据用户名 从user.json 文件中把对应的数据读出来传给前端
  res.send({
    name:req.session.qqquserid
  })
})