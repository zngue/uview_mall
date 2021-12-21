module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true
		}
	},
	devServer:{
		proxy:{
			"/carmichael":{
			  target: 'https://mz.shop.zngue.com/carmichael',
			  // target: 'http://127.0.0.1:6061/carmichael',
			  changeOrigin: true,  //是否跨域
			  pathRewrite: {
				'^/carmichael': ''   //需要rewrite的,
			  }
			},
			"/payment":{
				target: 'https://mz.shop.zngue.com/payment',
				// target: 'http://127.0.0.1:5959/wechat',
				changeOrigin: true,  //是否跨域
				pathRewrite: {
				  '^/payment': ''   //需要rewrite的,
				}
			},
		}
	}
}
