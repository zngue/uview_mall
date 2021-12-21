<template>
	<view class="orderList maincontent">
		
		<view class="order-list" v-for="(item,index) in orderListData" :key="index">
			<view class="order-list-price u-flex">
				<view class="order-list-price-title u-font-36 width50rpx">
					付款金额
				</view>
				<view class="order-list-price-content u-font-40">
					￥{{item.shopPrice/100}}
				</view>
			</view>
			<view class="order-list-tag u-flex">
				<view class="width50rpxs ">
					商品名称
				</view>
				<view class="textRight u-line-2">
					{{item.orderTitle}}
				</view>
			</view>
			<view class="order-list-tag u-flex order-height">
				<view class="width50rpxs">
					订单编号
				</view>
				<view class="textRight">
					{{item.orderNum}}<text class="copy-text" @click="copy(item.orderNum)" >复制</text>
				</view>
			</view>
			<view class="order-list-tag u-flex order-height">
				<view class="width50rpxs">
				创建时间
				</view>
				<view class="textRight">
					{{item.addTime}}
				</view>
			</view>
			<view class="order-list-tag u-flex order-height">
				<view class="width50rpxs">
				支付状态
				</view>
				<view v-if="item.payStatus==1" class="textRight" style="color: red;">
					已支付
				</view>
				<view v-else class="textRight" style="color: red;">
					未支付
				</view>
			</view>
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
				orderListData:[],
				isLoad:true,
				form:{
					page:1,
					pageSize:15,
					isPaginate:1
				}
			}
		},
		onLoad () {
			
			//#ifdef H5
				console.log("3669")
				this.getOrderList()
			//#endif
			//#ifdef MP-WEIXIN
				this.uniLogin()
			//#endif
			
		},
		onReachBottom(){
			this.getOrderList()
		},
		methods: {
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
						this.form.openid=r.data.openid
						console.log("2222",r);
						this.getOrderList()
					}
				})
			},
			getOrderList(){
				console.log("form",this.form)
				if (!this.isLoad){
					return
				}
				this.isLoad=false
				this.netService.orderList(this.form).then(r=>{
					if (r.statusCode==200){
						if (r.data && r.data.length==this.form.pageSize){
							this.isLoad=true
							this.form.page++
						}
						this.orderListData=[...this.orderListData,...r.data]
						// this.orderListData=r.data
					}
					console.log(r);
				})
				
			},
			test(){
				uni.requestPayment({
					provider:"wxpay",
					timeStamp:123456
				})
			},
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
		}
	}
</script>

<style lang="scss">
	.width50rpx{
		width: 220rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 30rpx;
		text-align: justify;
		text-align-last:justify;
		text-justify:distribute-all-lines; 
	}
	.width50rpxs{
		width: 180rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 30rpx;
		text-align: justify;
		text-align-last:justify;
		text-justify:distribute-all-lines; 
	}
	.textRight{
		text-align: right;
		padding-right: 15rpx;
		padding-left: 15rpx;
		width: 100%;
	}
	.order-height{
		font-size: 26rpx;
		height: 55rpx;
		padding-bottom: 10rpx;
	}
	.orderList{
		padding: 20rpx;
		font-family: "Microsoft YaHei",'Hiragino Sans GB','Helvetica','Arial';
		background-color: #eee;
		.order-list{
			margin-top: 20rpx;
			background: #fff;
			width: 100%;
			border-radius: 20rpx;
			&-price{
				border-bottom: solid #ddd 2rpx;
				&-content{
					text-align: right;
					width: 100%;
					padding-right: 10rpx;
					color: red;
					font-family: "Microsoft YaHei";
				}
			}
		}
	}
</style>
