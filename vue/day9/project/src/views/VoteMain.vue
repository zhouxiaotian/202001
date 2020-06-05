<template>
  <main class="mainBox">
    <p>支持人数：{{supnum}} 人</p>
    <p>反对人数：{{oppnum}} 人</p>
    <p>支持比率：{{ratio}}</p>
  </main>
</template>

<script>
export default {
  props: {
    supnum: {
      type: Number,
      default: 0
    },
    oppnum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ratio() {
      let { supnum, oppnum } = this,
        total = supnum + oppnum;
      return total === 0 ? `--` : `${((supnum / total) * 100).toFixed(2)}%`;
    }
  }
};
</script>

<style lang="less" scoped>
.mainBox {
  margin: 10px auto;

  p {
    line-height: 35px;
    margin: 0;
  }
}
</style>