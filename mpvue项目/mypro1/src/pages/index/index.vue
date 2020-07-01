<template>
  <div class='home_box'>
    <div class='header'>
      <van-icon name="location" />
      <span>送至珠峰培训</span>
      <van-icon name="arrow-down" />
    </div>
    <Bar>我很帅</Bar>
    <div class="swiper_box">
      <swiper :circular='true' :indicator-dots='true' indicator-active-color="#fff">
        <block v-for='item in ary'>
          <swiper-item class='item'>
            {{item}}
          </swiper-item>
        </block>
      </swiper>
    </div>

    <van-grid :gutter="10">
      <van-grid-item use-slot  v-for="i in 8" >
          <span>{{i}}</span>
      </van-grid-item>
    </van-grid>


    <van-tabs :active="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Bar from '../../components/searchBar'
export default {
  data () {
    return {
      ary:[1,2,3,4],
      active:0
    }
  },

  components: {
    Bar
  },

  methods: {
    
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style >
.home_box{
  padding: 20rpx;
  box-sizing: border-box;
}
.swiper_box{
  overflow: hidden;
  border-radius: 5px;
}
  .header{
    text-align: center;
  }
  .item{
    width: 100%;
    height: 300rpx;
    background: #333;
    color:#fff
  }
</style>
