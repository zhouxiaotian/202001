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
