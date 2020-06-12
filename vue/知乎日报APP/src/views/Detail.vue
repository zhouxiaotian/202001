<template>
  <div class="homeBox">
    <van-button type="primary" @click="goBack">返回</van-button>
    <div v-html="body"></div>
  </div>
</template>

<script>
import { API_DETAIL } from "../api/index";

export default {
  name: "Detail",
  data() {
    return {
      body: ""
    };
  },
  async created() {
    let { id } = this.$route.params;
    let { body, css } = await API_DETAIL(id);

    // 把知乎的样式动态插入到页面中
    let link = document.getElementById("link");
    if (!link) {
      link = document.createElement("link");
      link.id = "link";
      link.href = css[0];
      link.rel = "stylesheet";
      document.body.appendChild(link);
    }

    this.body = body;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>