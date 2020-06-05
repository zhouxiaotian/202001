<template>
  <!-- 组件的视图模板 -->
  <div id="app">{{text}}</div>
</template>

<script>
/* 当前组件的JS管控 */
export default {
  data() {
    return {
      text: "珠峰培训哈哈哈呵呵"
    };
  }
};
</script>

<style scoped>
/* 
 * 当前组件的样式 
 *   1.直接这样写，最后所有组件中的样式合并打包的时候容易产生冲突（手动避免冲突：基于less/sass中的嵌套，指定很长的前缀可以避免，但是生成的CSS性能不好）
 *   2. 直接设置scoped，代表当前组件中的样式是私有的（webpack帮助我们重新命名），最后打包在一起的时候就不会冲突了
 */
</style>