import http from './http'
// 假如说 login 五个组件调用， 那么当后期 接口路径放生改变的时候
export function login(options){
  return http.post('/user/login',options)
}

export function logout(options){
  return http.get('/user/signout')
}

// 用来 获取 部门列表
export function getDepList(){
  return http.get('/department/list')
}

// 用来新增部门的
export function addDep(option){
  return http.post('/department/add',option)
}

// 用来删除部门的
export function removeDep(id){
  // return http.get('/department/delete',{
  //   params:{
  //     departmentId:id
  //   }
  // })
  return http.get('/department/delete?departmentId='+id)
}

// 用来获取对应部门的详细信息
export function getDepInfo(id){
  return http.get('/department/info',{
    params:{
      departmentId:id
    }
  })
}

//更新部门信息
export function updateDep(option){
  return http.post('/department/update',option)
}


//获取员工列表
export function getUserList(options={departmentId:undefined,search:''}){
  return http.get('/user/list',{
    params:options
  })
}