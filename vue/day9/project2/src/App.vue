<template>
  <div id="app">
    <!-- 导航 -->
    <nav class="navBox">
      <a href>首页</a>
      <a href>客户管理</a>
      <a href>系统设置</a>
    </nav>

    <!-- 内容 -->
    <router-view></router-view>
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