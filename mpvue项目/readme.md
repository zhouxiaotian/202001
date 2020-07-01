mpvue 的使用流程
由于 mpvue 是基于 vue-cli 2.0
所以 先运行 npm install -g @vue/cli-init 拉取2.0的模板  一台电脑运行一次即可

下一步 使用 vue-cli 2.0的模板 创建 项目
vue init mpvue/mpvue-quickstart  项目名  

项目创建好之后  
cd 到 建好的项目
然后 安装依赖 （npm i）
安装好依赖之后  运行  npm run dev
运行之后 会生成一个dist 文件夹  里边有一个 wx文件夹
我们把这个 wx 文件夹 用 微信开发者工具 打开即可

打开之后 我们就可以看到页面了

下一步 就是写我们vue了； 每当更新之后  dev这个服务 会更新 wx文件夹
wx文件夹一更新  开发者工具中的页面就会更新了；


在这里  修改app.json 或者 新建页面的时候  需要 我们重新启动dev服务

这里不能使用 element-ui等 vue的 UI组件库
ajax 也需要使用 wx.request


在mpvue 的项目中 ；怎么使用 vant-weapp;
npm i ... 安装 ui组件库



需要 我们 自己 在wx这个文件夹中生成 对应的vant的文件夹
具体步骤：
1 找到 build 下的 webpack.base.conf.js 这个文件
在  
    new CopyWebpackPlugin([
      // 是把 src的兄弟的 static文件夹 生成一份 到 wx这个文件夹中
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(config.build.assetsRoot, './static'),
        ignore: ['.*']
      }
    ]),

这几行代码的下边 抄一份

new CopyWebpackPlugin([
      // 是把 node_modules 中的vant里边的所有 小程序组件 都复制一份到 
      // wx的 path 下的weapp这个文件夹中
      {
        from: path.resolve(__dirname, '../node_modules/@vant/weapp/dist'),
        to: path.resolve(config.build.assetsRoot, './weapp'),
        ignore: ['.*']
      }
    ]),

2- 使用  在对应的main.json 中 配置 usingComponents这个配置项
{
 "van-button": "/weapp/button/index"
}   
3- 模板中直接使用 <van-button type="default">默认按钮</van-button> 





在mpvue项目中的使用vant-weapp的第二种方式

先正常构建  生成 wx 文件夹之后， 在这个文件夹里边 安装 vant-weapp

安装完成之后i启动 开发者工具的 npm构建功能

然后直接 using照抄即可