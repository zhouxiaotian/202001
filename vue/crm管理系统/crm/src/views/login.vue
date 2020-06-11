<template>
  <div class='login_box'>
    <h1>CRM管理系统</h1>
    <div class="content">
      <el-input
        v-model="name"
        placeholder="请输入用户名"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-user"
        ></i>
      </el-input>
      <el-input
        v-model="psw"
        placeholder="请输入密码"
        show-password
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-tickets"
        ></i>
      </el-input>
      <el-button
        type="primary"
        @click='login'
      >登录</el-button>

      <el-button
        type="primary"
        @click='qqq'
      >qqq</el-button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// @ 符 代表的就是 src这一层路径  @/api /src/api
import { login } from "@/api/api.js";
// import {login}  from '../api/api.js'
import { SETUSERINFO } from "../store/types";
export default {
  name: "login", // 不能是已经存在的html标签
  data() {
    return {
      name: "",
      psw: ""
    };
  },

  methods: {
    qqq(){
      this.$router.push('/')
    },
    login() {
      login({
        account: this.name,
        password: this.psw
      }).then(data => {
        //登录成功之后 把用户信息存储到 vuex中；
        if (data.code == 0) {
          // 这是把用户信息存储到了vuex
          this.$store.commit(SETUSERINFO, {
            userName: this.name,
            power: data.power
          });
          // 为了了防止刷新vuex重置的问题 我们把同样的数据存储到localStorage中
          localStorage.setItem('crmUserInfo',JSON.stringify({
            userName: this.name,
            power: data.power
          }))
          //  编程式导航 push replace 这两个函数的参数 跟 router-link 的 to属性跟的值一样
          //  this.$router.push('/')
          //  this.$router.replace({path:'/'})
          //  push 会产生历史  也就说 它是当前路径的后边新跳了一个路径
          //  replace 不会产生历史 他其实是把当前路径替换成了你要走的路径；
          console.log(this.$router);
          this.$alert("CRM欢迎您！", "登录成功", {
            confirmButtonText: "确定",
            callback: action => {
              // 点击确定走的函数
              this.$router.push('/')
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.login_box {
  width: 100%;
  height: 100%;
  background: #eee;
  .content {
    width: 500px;
    // height: 300px;
    margin: 50px auto;
    padding-top: 30px;
    background: #fff;
    .el-input {
      width: 60%;
      margin: 30px auto 0;
      display: block;
    }
    button {
      margin: 30px;
    }
  }
}
</style>