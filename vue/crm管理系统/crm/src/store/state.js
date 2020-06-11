let str = localStorage.getItem('crmUserInfo');// null     """"
// 把存储到localstorage中的属性获取到
let obj = str ? JSON.parse(str) : {}
export  default{
  // 就是当作 state使用 的； 存放的都是公用数据
  count:100,
  userInfo:obj,// 把localStorage和vuex结合起来
}

/* 
  当我们登录成功之后 我们分别在vuex和localStorage中存储了用户信息
  打我们刷新页面的时候  我们是整个项目重新渲染 也就是说 html css js 都要重新加载
  重新来的时候 当前这个str会从local中获取， 然后把获取到的内容设置成vuex的初始值
  这样的话 我们的用户信息就保存下来的 也就是 页面刷新也不怕数据重置了


*/