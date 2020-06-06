<template>
  <div id="app">
    <!-- keep-alive在路由跳转的时候保持组件的不销毁 -->
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>