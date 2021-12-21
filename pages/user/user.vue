<template>
	<view class="userInfoView">
		
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 u-m-t-15">
				<u-avatar :src="userInfo.avatarUrl" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.nickName}}</view>
				<view class="u-font-14 u-tips-color">会员等级:v1</view>
			</view>
		
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="支付"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" @click="NavJump('/pages/user/account')" title="账号密码"></u-cell-item>
				<u-cell-item icon="photo" title="相册"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券"></u-cell-item>
				<u-cell-item icon="heart" title="关注"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
				<u-cell-item icon="setting" title="客服">
					
				</u-cell-item>
			</u-cell-group>
		</view>
		<button class="contact_button" type="warn" open-type="contact">客服</button>
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
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				sessesionKey:"",
				openid:"",
				userInfo:{},
			}
		},
		onLoad() {
			// this.userLogin()
			this.getUserInfo()
			/*
			uni.getLocation({
				success: (r) => {
					
					uni.openLocation({
						latitude:r.latitude,
						longitude:r.longitude,
						success: (r) => {
							console.log("open",r)
						}
					})
				}
			})*/
		},
		methods: {
			NavJump(path){
				uni.navigateTo({
					url:path
				})
			},
			getUserInfo(){
					
				uni.getUserInfo({
					provider:"weixin",
					success: (r) => {
						this.userInfo=r.userInfo
						console.log(r.userInfo)
					}
				})
					
			},
			async userLoginInfo(){
				let codeInfo={}
				await uni.login({
					provider:"weixin",
					onlyAuthorize:true,
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
						// this.userInfoData()
						uni.setStorage({
							key:"openid",
							data:this.openid
						})
						uni.setStorage({
							key:"session_key",
							data:this.sessesionKey
						})
						console.log(this.openid)
					}
				})
			},
			
			async userInfoData(sessionKey){
				
				uni.getUserInfo({
					provider:"weixin",
					success: (r) => {
						console.log(r.encryptedData)
						console.log(r.iv)
						console.log(r)
						this.getUserRealInfo(r.encryptedData,r.iv)
					}
				})
					
			},
			
			async getUserRealInfo(encryptedData,iv){
				
				await this.httpGet("/payment/userPhone",{sessionKey:this.sessesionKey,encryptedData,iv}).then(r=>{
					console.log("realInfo",r)
				})

			},
			
			userLogin(){
				this.userLoginInfo()
				/*
				uni.getUserInfo({
					provider:"weixin",
					success: (r) => {
						console.log("log",r)
						// console.log("log",r.encryptedData)
					}
				})*/
			}
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
button::after {
	  border: none;
	  background-color: none;
}
.userInfoView .u-cell__value uni-button{
	background: none;
	border: none;
}
.contact_button{
	font-size: 30rpx;
	margin-top: 30rpx;
	width: 80%;
	margin-left: 10%;
}
.camera{
	width: 54px;
	height: 44px;
	&:active{
		background-color: #ededed;
	}
	
}
.user-box{
	background-color: #fff;
}
</style>
