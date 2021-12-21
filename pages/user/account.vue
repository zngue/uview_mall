<template>
	<view class="maincontent">
		<view class="account-content">
			<u-cell-item :arrow="false" @click="copy(accountInfo.account)" title="账号">
				<text>{{accountInfo.account}}</text>
				<text class="copy-text">复制</text>
			</u-cell-item>
			<u-cell-item :arrow="false" @click="copy(accountInfo.password)" title="密码">
				<text>{{accountInfo.password}}</text>
				<text class="copy-text">复制</text>
			</u-cell-item>
			<u-cell-item :arrow="false" v-if="accountInfo.ext_account" @click="copy(accountInfo.ext_account)" title="备用账号">
				<text>{{accountInfo.ext_account}}</text>
				<text class="copy-text">复制</text>
			</u-cell-item>
			<u-cell-item v-if="accountInfo.ext_password" :arrow="false" @click="copy(accountInfo.ext_password)" title="备用密码">
				<text>{{accountInfo.ext_password}}</text>
				<text class="copy-text">复制</text>
			</u-cell-item>
			<u-cell-item :arrow="false" @click="copy('zng_001')" title="微信客服">
				<text>zng_001</text>
				<text class="copy-text">复制</text>
			</u-cell-item>
			<u-cell-item :arrow="false" title="到期时间">
				<text>{{ expireTime(accountInfo.expire_time) }}</text>
			</u-cell-item>
			<view  class="content-title">
				温馨提示
			</view>
			<view class="content-title-content">
				<view>1、账户仅限自己一人使用，切勿借给别人用，一旦发现账号有多人使用将不再提供任何售后服务</view>
				<view> 2、请勿私自修改密码，我们会定期进行维护，以便您能长期稳定使用（私自修改密码将注销此账号且不再提供售后服务，后果自负）</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import moment from "moment"
	export default {
		data() {
			return {
				openid:"",
				accountInfo:{}
			}
		},
		onLoad() {
			//#ifdef H5
				console.log("3669")
				this.getAccount()
			//#endif
			//#ifdef MP-WEIXIN
				this.uniLogin()
			//#endif
		},
		computed:{
			expireTime(){
				
				return (time)=>{
					let s = moment(+time*1000).format("YYYY-MM-DD HH:mm:ss")
					if (time){
						return s
					}
					return ""
				}
			}
		},
		methods: {
		
			copy(data){
				uni.setClipboardData({
					data:data,
					success: (r) => {
						uni.showToast({
							title:"复制成功"
						})
					}
				})
			},
			uniLogin(){
				uni.login({
					provider:"weixin",
					success: (r) => {
						this.loginInfo(r.code)
					}
				})
				
			},
			loginInfo(code){
				this.netService.sessionKey({code}).then(r=>{
					console.log(r);
					if (r.code==200){
						this.openid=r.data.openid
						this.getAccount()
					}
				})
			},
			getAccount(){
				
				this.httpGet("carmichael/zngUser/detail",{
					// openid:this.openid
				}).then(r=>{
					console.log(r)
					this.accountInfo=r.data
					console.log(r.data)
				})
			}
		}
	}
</script>

<style lang="scss">
	.account-content{
		width: 100%;
		padding: 20rpx;
	}
	.content-title{
		padding-left: 20rpx;
		margin-top: 20rpx;
		font-size: 38rpx;
		color: red;
		
		&-content{
			font-size: 34rpx;
			color: red;
			line-height: 60rpx;
			padding: 20rpx;
			border: solid #eee 1rpx;
			margin-top: 20rpx;
			border-radius: 20rpx;
		}
	}
</style>
