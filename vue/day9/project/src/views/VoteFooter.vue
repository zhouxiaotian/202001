<template>
  <footer class="footerBox" @click="delegate">
    <button type="button" class="btn btn-primary">支持</button>
    <button type="button" class="btn btn-warning">反对</button>
  </footer>
</template>

<script>
import { delay } from "../assets/utils";

export default {
  methods: {
    async delegate(ev) {
      await delay();
      let target = ev.target,
        tagName = target.tagName,
        text = target.innerHTML;
      if (tagName === "BUTTON") {
        this.$emit("callback", text === "支持" ? 0 : 1);
      }
    }
  }
};
</script>