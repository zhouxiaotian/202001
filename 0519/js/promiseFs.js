let fs = require('fs');
let obj = {
  // readFile,readdir
};
['readFile','readdir'].forEach(key=>{
  obj[key] = function(url,encoding=null){
    // 需要 对 encoding 进行判断处理； 若是 js css html txt json 等这类文件的
    // encoding 需要时 utf-8; 其他的 是null即可
    if(/\.(js|css|html|txt|json)/i.test(url)){
      encoding = 'utf-8'
    }
    return new Promise((res,rej)=>{
      fs[key](url,encoding,(err,data)=>{
        if(!err){
          res(data)
        }else{
          rej(err)
        }
      })
    })
  }
});
// mkdir  rmdir  unlink
// writeFile  appendFile
['mkdir','rmdir','unlink'].forEach(key=>{
  obj[key] = function(url){
    return new Promise((res,rej)=>{
      fs[key](url,(err)=>{
        if(!err){
          res('success')
        }else{
          rej(err)
        }
      })
    })
  }
});
['writeFile','appendFile'].forEach(key=>{
  obj[key]=function(url,data,encoding='utf-8'){
    return new Promise((res,rej)=>{
      fs[key](url,data,encoding,(err)=>{
        if(!err){
          res('success')
        }else{
          rej(err)
        }
      })
    })
  }
});

console.log(obj)
module.exports = obj;