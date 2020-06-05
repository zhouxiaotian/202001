<template>
  <div class="container">
    <header class="headerBox">
      <h3>标题：xxxx</h3>
      <span>【0】</span>
    </header>

    <vote-main></vote-main>
    <vote-footer></vote-footer>
  </div>
</template>

<script>
import VoteMain from "./VoteMain.vue";
import VoteFooter from "./VoteFooter.vue";

export default {
  components: {
    VoteMain,
    VoteFooter
  }
};
</script>

<style lang="less" scoped>
.container {
  margin: 20px auto;
  padding: 10px;
  width: 400px;
  border: 1px solid #aaa;
}

.headerBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40px;

  h3,
  span {
    font-size: 22px;
    margin: 0;
  }
}
</style>