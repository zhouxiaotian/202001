<template>
  <div id="app">
    <Vote title="VUE是一款优秀的框架！"></Vote>
    <Vote title="学习VUE其实很简单！"></Vote>
  </div>
</template>

<script>
import Vote from "./views/Vote.vue";

export default {
  components: {
    Vote
  }
};
</script>

<style lang="less">
</style>