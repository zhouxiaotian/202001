<template>
  <div id="app">
    <!-- 导航 -->
    <nav class="navBox">
      <!-- 
        router-link最后渲染出来的标签也是A 
          to='[path]'
          :to="{[path]/[name],传参}"
      -->
      <router-link :to="{
        name:'nhome'
      }">首页</router-link>

      <!-- 
        基于query显示传参（传递的参数信息会以问号的方式显示在URL地址中）
          1. path或者name实现路由跳转都可以基于这个方式处理
          2. 基于$route.query可以获取这个值，而且不论是点击传递还是页面再刷新，只要地址栏中有问号参数，query中就可以获取到这个值
      -->
      <router-link
        :to="{
        path:'/custome',
        query:{
          id:100
        }
      }"
      >客户管理</router-link>

      <!-- 
        基于params传参是隐性传参（传递的信息不会在地址栏中体现）
           1.只有基于命名路由跳转才可以使用params传参
           2.进入到路由后，可以基于$route.params获取传递参数信息
           3.页面一旦刷新，则传递的参数信息就没有了
      -->
      <router-link
        :to="{
        name:'nsystem',
        params:{
          id:100
        }
      }"
      >系统设置</router-link>

      <!-- 
        动态路由（需要在路由表中设置好）
      -->
      <router-link :to="{
        path:'/active'
      }">动态路由1</router-link>

      <router-link :to="{
        path:'/active/100'
      }">动态路由2</router-link>

      <router-link :to="{
        path:'/active/100/zhufeng'
      }">动态路由3</router-link>

      <!-- <router-link to="/">首页</router-link>
      <router-link to="/custome">客户管理</router-link>
      <router-link to="/system">系统设置</router-link>-->
    </nav>

    <!-- 内容  容器不设置名字，默认名字default -->
    <router-view></router-view>
    <router-view name="AAA"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.navBox {
  background: #000;
  line-height: 50px;

  a {
    margin: 0 10px;
    font-size: 20px;
    color: #fff;
  }
}
</style>