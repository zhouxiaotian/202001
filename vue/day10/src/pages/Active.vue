<template>
  <div>动态路由</div>
</template>

<script>
/*
 * 点击多个按钮跳转到同一个路由，路由管控的组件并不会从头开始重新渲染（也就是created/mounted等周期函数只执行一次） ，触发的只是更新
 * 先切换到其它路由组件，路由中会默认把上一次渲染的组件销毁；当后期重新切换回来的时候，触发当前组件的从头开始重新渲染；
 */
export default {
  created() {
    // 第一次加载组件创建实例后
    console.log(this.$route.params);
  },
  watch: {
    // 监听路由信息的改变，从而实现某些操作（只有路由信息有变化，我们就可以监听到）
    $route(from, to) {
      // from 上一个路由的信息
      // to 当前路由的信息
      console.log(this.$route.params);
    }
  }
};
</script>