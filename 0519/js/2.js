let {readFile,
  readdir,
  mkdir,
  rmdir,
  unlink,
  writeFile,
  appendFile
} = require('./promiseFs.js');

// readFile('./1.js').then(data=>{
//   console.log(data)
// }).catch(err=>{
//   console.log(err)
// })

// mkdir('./www').then(data=>{
//   console.log(data)
// }).catch(err=>{ 
//   console.log(err)
// })

// rmdir('./www').then(data=>{
//   console.log(data)
// }).catch(err=>{ 
//   console.log(err)
// })

writeFile('./qqq/3.txt','哈哈哈哈').then(data=>{
  console.log(data)
})