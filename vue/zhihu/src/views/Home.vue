<template>
  <div class="homeBox">
    <!-- HEADER -->
    <header class="headerBox">
      <div class="base">
        <span class="time">
          6
          <em>六月</em>
        </span>
        <h1 class="title">知乎日报</h1>
      </div>
      <div class="user">
        <img src alt />
      </div>
    </header>

    <!-- 轮播图区域 -->
    <div class="bannerBox">
      <van-swipe :loop="true" :autoplay="3000">
        <van-swipe-item>
          <div class="item">
            <img src="http://img.zhufengpeixun.cn/zhufengquanzhan.jpg" alt />
            <div class="desc">
              <p>标题</p>
              <p>xxxx</p>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 列表区域 -->
    <div class="newsBox">
      <div class="itemBox">
        <h4 class="time">
          <span>06月05日</span>
          <i></i>
        </h4>
        <ul class="content">
          <li class="item">
            <a href>
              <div class="con">
                <h4>标题标题标题标题标题标题标题标题标题标题标题标题标题</h4>
                <span>知乎用户 ▪ 3分钟阅读</span>
              </div>
              <div class="img">
                <img src alt />
              </div>
            </a>
          </li>

          <li class="item">
            <a href>
              <div class="con">
                <h4>标题标题标题标题标题标题标题标题标题标题标题标题标题</h4>
                <span>知乎用户 ▪ 3分钟阅读</span>
              </div>
              <div class="img">
                <img src alt />
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div class="itemBox">
        <h4 class="time">
          <span>06月05日</span>
          <i></i>
        </h4>
        <ul class="content">
          <li class="item">
            <a href>
              <div class="con">
                <h4>标题标题标题标题标题标题标题标题标题标题标题标题标题</h4>
                <span>知乎用户 ▪ 3分钟阅读</span>
              </div>
              <div class="img">
                <img src alt />
              </div>
            </a>
          </li>

          <li class="item">
            <a href>
              <div class="con">
                <h4>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h4>
                <span>知乎用户 ▪ 3分钟阅读</span>
              </div>
              <div class="img">
                <img src alt />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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