// 只是配置文件  每次修改 都要重新启动服务
module.exports = {
  lintOnSave:false,
  devServer: {
		// 跨域请求：PROXY代理 只在本地开发时起作用 上线的时候 这里的配置没用
		proxy:'http://localhost:8000'
	}
}