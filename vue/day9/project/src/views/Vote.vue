<template>
  <div class="container">
    <header class="headerBox">
      <h3>{{title}}</h3>
      <span>【{{supNum+oppNum}}】</span>
    </header>

    <vote-main :supnum="supNum" :oppnum="oppNum"></vote-main>
    <vote-footer @callback="handle"></vote-footer>
  </div>
</template>

<script>
import VoteMain from "./VoteMain.vue";
import VoteFooter from "./VoteFooter.vue";

export default {
  components: {
    VoteMain,
    VoteFooter
  },
  props: ["title"],
  data() {
    return {
      supNum: 0,
      oppNum: 0
    };
  },
  methods: {
    handle(lx) {
      lx === 0 ? this.supNum++ : this.oppNum++;
    }
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