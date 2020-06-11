<template>
  <div class="home">
    <!-- 首页的内容
    这是routerview是用来展示home子路由对应组件的 
    <router-view></router-view> -->
    <el-container>
      <el-header class='header'>
        <h1>CRM管理系统</h1>
        <div class='middle'>
          <router-link to="/crm">客户管理</router-link>
          <router-link to="/org">组织管理</router-link>
        </div>
        <div class="right">
          欢迎您：{{username}}
          <span @click='logout'>安全退出</span>
        </div>
      </el-header>
      <!-- <el-container class='container'>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container> -->
      <router-view></router-view>
      <el-footer class='footer'>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import {logout} from '@/api/api.js'
import { SETUSERINFO } from "../store/types";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    username(){
      console.log(this.$store.state.userInfo)
      return this.$store.state.userInfo.userName
    }
  },
  // created() {
  //   if(!this.$store.state.userInfo.power){
  //     this.$router.replace('/login')
  //   }
  // },
  methods: {
    logout(){
      // 调用 退出接口
      logout().then((data)=>{
        // 退出成功之后  要干什么事？
        // 1-清空localstorage
        // 2-清空vuex的相应信息 
        // 3-跳转到登录页
        localStorage.removeItem('crmUserInfo');
        this.$store.commit(SETUSERINFO,{});//清空vuex的userInfo
        this.$router.push('/login')

      })
    }
  },
};
</script>
<style lang="less">
.middle{
  a{
    padding: 0 10px;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
  }
  a.current{
    color: salmon;
  }
}
.header{
  display: flex;
  background: #333;
  color:#fff;
  h1{
    width: 200px;
    
  }
  .right{
    width: 200px;
  }
  .middle{
    flex:auto;
    text-align: left;
    padding-left: 50px;
  }
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.container{
  position: absolute;
  top:60px;
  bottom:60px;
  width: 100%;
}


.el-header,
.el-footer {
  // background-color: #b3c0d1;
  // color: #333;
  text-align: center;
  line-height: 60px;
  height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

</style>
