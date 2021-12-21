export function httpFetch(options) {
	const host="https://mz.shop.zngue.com"
	let url="/"+options.url
	//#ifndef H5
		url= host+url
	//#endif
	options.url=url
	return new Promise((resolve, reject) => {
		// 这里根据你的需求去添加请求参数
		uni.request({
			url: options.url,
			method: options.method,
			header: {
				'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
			},
			data: options.data,
			success(res) {
				if (res.statusCode==200){
					resolve(res.data);
				}else{
					uni.showToast({
						title:"网络繁忙请稍后再试"
					})
					resolve({});
				}
			},
			fail(err) {
				reject(err);
			}
		});
	});
}
export function httpGet(url,data={}){
	return httpFetch({
		url:url,
		data:data,
		method:"GET"
	})
}
export function httpPost(url,data={}){
	return httpFetch({
		url:url,
		data:data,
		method:"POST"
	})
}
export class netService{
	static async shopList(data={}){
		return await httpGet("carmichael/zngShop/list",data)
	}
	// id
	static async shopDetail(data={}){
		return await httpGet("carmichael/zngShop/detail",data)
	}
	static async sessionKey(data={}){
		return await httpGet("payment/sessionKey",data)
	}
	static async addOrder(data={}){
		return await httpPost("carmichael/zngOrder/add",data)
	}
	static async orderPay(data={}){
		return await httpGet("payment/orderPay",data)
	}
	static async userPhone(data={}){
		return await  httpGet("payment/userPhone",data)
	}
	static async orderList(data={}){
		return await  httpGet("carmichael/zngOrder/list",data)
	}
	
	static async userLogin(){
		return await new Promise ( (resolve, reject)=>{
			uni.login({
				provider:"weixin",
				onlyAuthorize:true,
				success: (r) => {
					// console.log(r)
					resolve(r)
				},
				fail: (r) => {
					reject(r)
				}
			})
		} )
	}
	
}


