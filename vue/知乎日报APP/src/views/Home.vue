<template>
  <div class="homeBox">
    <!-- HEADER -->
    <header class="headerBox">
      <div class="base">
        <span class="time">
          {{handleTime(time,0)}}
          <em>{{handleTime(time,1)}}月</em>
        </span>
        <h1 class="title">知乎日报</h1>
      </div>
      <div class="user"></div>
    </header>

    <!-- 轮播图区域 -->
    <div class="bannerBox">
      <van-swipe :loop="true" :autoplay="3000" v-if="bannerData.length">
        <van-swipe-item v-for="item in bannerData" :key="item.id">
          <router-link
            class="item"
            :to="{
                path:`/detail/${item.id}`
              }"
          >
            <img :src="item.image" alt />
            <div class="desc">
              <p>{{item.title}}</p>
              <p>{{item.hint}}</p>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 列表区域 -->
    <van-skeleton title :row="4" v-if="newsData.length===0"></van-skeleton>
    <div class="newsBox" v-else>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" @load="handleLoad">
        <!-- START -->
        <div class="itemBox" v-for="item in newsData" :key="item.date">
          <h4 class="time" v-if="item.date!==time">
            <span>{{item.date | filterTime}}</span>
            <i></i>
          </h4>

          <ul class="content">
            <li class="item" v-for="news in item.stories" :key="news.id">
              <router-link :to="{
                path:`/detail/${news.id}`
              }">
                <div class="con">
                  <h4>{{news.title}}</h4>
                  <span>{{news.hint}}</span>
                </div>
                <div class="img">
                  <img alt v-lazy="news.images[0]" />
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- END -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { formatTime, delay } from "../assets/utils";
import { API_LATEST, API_BEFORE } from "../api/index";

export default {
  name: "Home",
  data() {
    return {
      time: formatTime(new Date()),
      bannerData: [],
      newsData: [],
      // 下拉刷新
      time2: "",
      loading: false,
      finished: false
    };
  },
  async created() {
    // 实例创建完成，我们就从服务获取数据
    let { date, stories, top_stories } = await API_LATEST();
    this.time = date;
    this.time2 = date;
    this.bannerData = top_stories;
    this.newsData.push({
      date,
      stories
    });
  },
  methods: {
    // 处理时间的
    handleTime(time, index = 0) {
      let month = parseInt(time.substr(4, 2)),
        day = parseInt(time.substr(6)),
        arr = [
          "",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "七",
          "八",
          "九",
          "十",
          "十一",
          "十二"
        ];
      return [day, arr[month]][index];
    },
    // 加载更多数据
    async handleLoad() {
      this.loading = true;
      await delay();
      let time2 = this.time2 || formatTime(new Date());
      time2 = time2.match(/^(\d{4})(\d{2})(\d{2})$/);
      time2 = formatTime(
        new Date(
          new Date(`${time2[1]}/${time2[2]}/${time2[3]}`).getTime() - 86400000
        )
      );
      let { date, stories } = await API_BEFORE(time2);
      this.newsData.push({
        date,
        stories
      });
      this.loading = false;
      this.time2 = time2;
    }
  },
  filters: {
    // 格式化时间
    filterTime(time) {
      let month = time.substr(4, 2),
        day = time.substr(6);
      return month + "月" + day + "日";
    }
  }
};
</script>

<style lang="less" scoped>
@A: #aaa;

.headerBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;

  .base {
    font-size: 0;

    .time,
    .title {
      display: inline-block;
      padding: 0 0.3rem;
    }

    .time {
      text-align: center;
      font-size: 0.34rem;
      font-weight: bold;
      vertical-align: middle;

      em {
        display: block;
        font-size: 0.24rem;
        font-weight: normal;
        font-style: normal;
      }
    }

    .title {
      font-size: 0.4rem;
      vertical-align: middle;
      border-left: 0.02rem solid @A;
    }
  }

  .user {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: url("../assets/images/timg.jpg") no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    img[src=""] {
      display: none;
    }
  }
}

.bannerBox {
  height: 7.5rem;
  background: lighten(@A, 20%);

  .van-swipe {
    height: 100%;
  }

  .item {
    display: block;
    position: relative;
    height: 100%;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .desc {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;

      padding: 0.3rem;
      width: 100%;
      height: 2rem;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.7);
      background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.7)
      );

      p {
        font-size: 0.4rem;
        color: rgba(255, 255, 255, 0.85);
        font-weight: bold;
        line-height: 0.8rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &:nth-child(2) {
          font-size: 0.32rem;
          font-weight: normal;
          line-height: 0.6rem;
        }
      }
    }
  }
}

.van-skeleton {
  margin-top: 0.4rem;
}

.newsBox {
  padding: 0.2rem;

  .itemBox {
    .time {
      box-sizing: border-box;
      position: relative;
      height: 0.6rem;
      line-height: 0.6rem;
      padding-top: 0.285rem;

      i {
        display: block;
        margin-left: 1.8rem;
        height: 0.02rem;
        background: lighten(@A, 20%);
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.6rem;
        text-align: center;
        font-size: 0.3rem;
        font-weight: normal;
        color: darken(@A, 20%);
      }
    }

    .content {
      .item {
        position: relative;
        padding: 0.2rem 0;
        min-height: 1.5rem;

        a {
          display: block;
        }

        .img {
          position: absolute;
          top: 0.2rem;
          right: 0;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.05rem;
          background: lighten(@A, 20%);
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            border-radius: 0.05rem;
          }
        }

        .con {
          margin-right: 1.7rem;

          h4,
          span {
            display: block;
            color: #000;
            font-size: 0.32rem;
            font-weight: normal;
            line-height: 0.5rem;
            max-height: 1rem;
            overflow: hidden;
          }

          span {
            color: darken(@A, 20%);
            font-size: 0.28rem;
          }
        }
      }
    }
  }
}
</style>