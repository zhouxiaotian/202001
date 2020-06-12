<template>
  <div id="app">
    <!-- 抽屉（左侧导航） -->
    <el-drawer :modal="false" :show-close="false" :visible="true" direction="ltr">
      <el-menu :router="true" default-active="/">
        <el-menu-item index="/">
          <i class="el-icon-document"></i>
          <span slot="title">客户列表</span>
        </el-menu-item>
        <el-menu-item index="/create">
          <i class="el-icon-circle-plus-outline"></i>
          <span slot="title">新增客户</span>
        </el-menu-item>
        <el-menu-item index="/upload">
          <i class="el-icon-upload"></i>
          <span slot="title">批量上传</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
    
    <!-- 视图容器 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less"></style>
