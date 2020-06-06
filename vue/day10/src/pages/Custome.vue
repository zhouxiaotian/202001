<template>
  <div class="customeBox">
    <!-- 客户管理
    <button @click="handle">按钮</button>-->

    <!-- 二级导航 -->
    <div class="navbox">
      <router-link to="/custome/list">列表</router-link>
      <router-link to="/custome/add">新增</router-link>
      <router-link to="/custome/tong">统计</router-link>
    </div>

    <!-- 右侧内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route);
  },
  methods: {
    handle() {
      // console.log(this.$router);
      // this.$router.push("/system");
      /*  this.$router.push({
        name: "nsystem",
        params: {
          id: 1000
        }
      }); */
      // this.$router.go(-1);
      // this.$router.back();
    }
  }
};
</script>

<style lang="less"  scoped>
.customeBox {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.navbox {
  a {
    display: block;
  }
}
</style>