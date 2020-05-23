// fs 文件操作模块；读写文件  I/O input  output
let fs = require('fs');
/* // fs.readFile('文件路径','文件编码 一般utf-8',回调函数(err,data)=>{})
// readFile 是一个异步操作；
fs.readFile('./package.json','utf-8',(err,data)=>{
  // console.log(err)
  // console.log(data)
  // 当读取失败的时候 err 才会有内容， 读取成功的时候 err是一个null
  if(!err){
    // 证明读取成功了
    console.log(data)//data是读取的对应的数据；
  }else{
    // 证明读取失败了；
    console.log('失败了',err)
  }
})
let data = fs.readFileSync('./package-lock.json','utf-8');// 同步读取 返回结果是 读取的内容；
// 一旦读取失败 代码就会报错  下边的代码就不再执行了；
console.log(data);
console.log(666);
 */


/* 
fs.readdir('./es6',null,(err,data)=>{
  // 第一个参数是文件夹的路径
  if(!err){
    // 证明读取成功
    console.log(data)// data 是一个数组 数组中的项文件夹中的文件的名字
  }else{
    console.log(err)
  }
})
// 结合以上两个api实现 读取文件夹中的所有文件；
function readAllFile(url){
  fs.readdir(url,null,(err,data)=>{
    if(!err){
      // data 存储的文件名
      data = data.filter(item=>/\./.test(item))
      console.log(data)// 这时候 data中就不再包含文件夹的名字了；
      data.forEach(item=>{
        fs.readFile(url+'/'+item,'utf-8',(err,val)=>{
          if(!err){
            console.log(item+':',val)
          }else{
            console.log('------------------------------------')
          }
          
        })
      })
    }
  })
}
readAllFile('./es6') */

/* 
fs.mkdir('./mydir',(err)=>{
  // 创造文件夹  上边这个参数的意思 就是 在同级目录下创建一个mydir的文件夹
  // 若要创建的文件夹已经存在 那么 再去创造的时候 就会报错失败
  if(!err){
    console.log('创建成功')
  }else{
    console.log('创建失败',err)
  }
})
fs.mkdir('./js/mydir2',(err)=>{
  // 创造文件夹  上边这个参数的意思 就是 在统计目录下的js文件夹下创建一个mydir2的文件夹
  if(!err){
    console.log('创建成功')
  }else{
    console.log('创建失败',err)
  }
}) */

/* fs.rmdir('./mydir',(err)=>{
  if(!err){
    console.log('删除成功')
  }else{
    // 删除一个不存在的文件夹时 报错
    console.log('删除失败',err)
  }
}) */
/* fs.rmdir('./es6',(err)=>{
  // 文件夹若不为空 则删除失败
  console.log(err)
}) */

/* fs.unlink('./mytest/1.txt',(err)=>{
  // 删除文件
  console.log(err)
})
 */

//  fs.writeFile('./mytest/1.txt','hello world','utf-8',(err)=>{
//    // 写入的时候 若发现不存在对应的文件 则会默认创建一个对应的文件
//    // 有对应的文件 就会直接写入；
//    if(!err){
//      console.log('写入成功')
//    }else{
//      console.log('写入失败')
//    }
//  })

 fs.writeFile('./mytest/1.txt','hello 珠峰','utf-8',(err)=>{
  // 写入的时候 若发现不存在对应的文件 则会默认创建一个对应的文件
  // 有对应的文件 就会直接写入；
  // 写入的内容会把老内容整个替换掉
  if(!err){
    console.log('写入成功')
  }else{
    console.log('写入失败')
  }
})

fs.appendFile('./mytest/2.txt','hello 珠峰','utf-8',(err)=>{
  // 参数等同于 writeFile  但是 这个方法是添加内容 不是替换内容；
  console.log(err)
})
// readFile  readdir mkdir rmdir  unlink writeFile appendFile  都是异步的
// 
readFile().then(data=>{})