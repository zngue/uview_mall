<template>
	<view class="detail maincontent">
		<view class="detail-content">
			<view class="detail-title u-title">
				{{shopInfo.title}}
			</view>
			<view class="u-flex u-m-t-25">
				<view class=" width50">
					<text>价格：</text>
					<text class="price">{{shopInfo.money/100}}</text>
					<text class="u-p-l-15">元</text>
				</view>
				<view class="width50">
					<text>销量：</text>
					<text>{{shopInfo.salesNum}}</text>
					<text class="u-p-l-15">件</text>
				</view> 
			</view>
			<view class="u-flex u-m-t-25">
				<view class="width50" v-if="shopInfo.userLimit>0">
					<text>限购：</text>
					<text>{{shopInfo.userLimit}}</text>
					<text class="u-p-l-15">件</text>
				</view> 
				<view class="width50" v-else>
					<text>限购：</text>
					<text>无限制</text>
				</view>
				<view class="width50">
					<u-button class="top-button" type="error" @click="payment">立即购买</u-button>
				</view>
			</view>
			<!--<view class="u-flex u-m-t-25">
				<view class=" width50">
					<button  
						class="top-button" 
						open-type="getUserInfo" 
						type="error" 
						 @getuserinfo="wxGetUserInfo"
					>登录</button>
					<button 
						type="primary" 
						shape="circle" 
						class="loginButton"
						 open-type="getPhoneNumber" 
						 @getphonenumber="getPhoneNumber">微信一键登录
					</button>
				</view>
			</view> -->
			
		</view>
		
		<view class="detail-content-view">
			<view class="detail-content-view-title">
				产品详情
			</view>
			<u-parse class="u-m-t-50 maincontent" :html="shopInfo.content"></u-parse>
		</view>
		<view class="detail-button">
			<u-button type="error" @click="payment">立即购买</u-button>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import TabBar from "../../components/TabBar.vue"
	export default {
		components:{
			TabBar
		},
		data() {
			return {
				id:0,
				shopInfo:{},
				sessesionKey:"",
				openid:"",
				appid:"wxb28a8c8e11b03dc0"
			}
		},
		created(e) {
			
		},
		onLoad(option) {
			console.log('option',option)
			this.id=option.id
			this.getDetail(option)
			this.userLogin()
		},
		methods: {
			
			getDetail(option){
				this.netService.shopDetail(option).then(r=>{
					this.shopInfo=r.data
				})
			},
			async createOrder(){
				await  this.netService.addOrder({
					shopId:this.id,
					userId:999,
					openid:this.openid,
					username:"",
					telphone:"",
					address:"",
					desc:""
				}).then(r=>{
					this.payInfo(r.data.orderNo)
					console.log("order",r)
				})
			},
			
			async payInfo(mchIdNo){
				await this.httpGet("/payment/orderPay",{
					mchIdNo:mchIdNo,
					openId:this.openid,
					appId:this.appid
				}).then(r=>{
					this.paymentInfo(r.data.JSAPI)
					console.log('payinfo',r.data.JSAPI)
				})
			},
			
			getPhoneNumber(e){
				console.log("encryptedData",e.detail.encryptedData)
				console.log("iv",e.detail.iv)
			},
			wxGetUserInfo(){
					
					const userinfo=this.agetuserInfo()
					const code=this.userLogin()

					
			},
			async userLogin(){
				// let _this = this
				let codeInfo={}
				await uni.login({
					provider:"weixin",
					success: (r) => {
						if (r.errMsg=="login:ok"){
							this.getLoginInfo(r.code)
						}
						codeInfo=r
						console.log('code',r)
					}
				})
				return codeInfo
			},
			async getLoginInfo(code){
				await this.httpGet("/payment/sessionKey",{code:code}).then(r=>{
					console.log("userinfo",r)
					if (r.code==200){
						this.sessesionKey=r.data.session_key
						this.openid=r.data.openid
						uni.setStorage({
							key:"openid",
							data:this.openid
						})
						console.log(this.openid)
					}
				})
				
			},
			async agetuserInfo(){
				let userinfo={}
				await uni.getUserInfo({
					success: (r) => {
						userinfo=r.userInfo
					}
				})
				return userinfo
			},
			payment(){
				this.createOrder()
				uni.getStorage({
					key:"openid",
					success: (r) => {
						console.log("ss",r)
					}
				})
			},
			paymentInfo(option){
				
				uni.requestPayment({
					provider:"wxpay",
					timeStamp:option.timeStamp,
					nonceStr:option.nonceStr,
					package:option.package,
					signType:option.signType,
					paySign:option.paySign,
					success:(res)=>{
						console.log('success:' + JSON.stringify(res));
					},
					fail:(err)=>{
						console.log('fail:' + JSON.stringify(err));
					}
				})
			},
			async paymentRequest(){
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		padding:  20rpx;
		background: #eee;
		image{
			width: 100%;
		}
		.top-button{
			width: 50%;
			height: 60rpx;
			line-height: 60rpx;
			margin-left: 0;
		}
		&-title{
			font-weight: 900;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		&-content{
			background: #fff;
			padding: 20rpx;
			border-radius: 20rpx;
			width: 100%;
		}
		&-content-view{
			padding: 20rpx;
			width: 100%;
			background: #fff;
			margin-top: 20rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			&-title{
				font-size: 30rpx;
				font-weight: 700;
			}
			img{
				border-radius: 50rpx;
			}
		}
		&-button{
			width: 80%;
			margin-left: 10%;
			margin-top: 50rpx;
			margin-bottom: 50rpx;
		}
	}
</style>
