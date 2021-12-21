<template>
	<view class="ShopList">
		<view class="shop-list borderRadius" v-if="listData && listData.length>0" v-for="(item,index) in listData" :key="index" @click="jumUrl(item.id)">
			<view class="shop-list-content u-flex">
				<view class="shop-list-image">
					<image class="borderRadius" :src="imgUrl(item)"></image>
				</view>
				<view class="shop-list-right u-p-l-15">
					<view class="shop-list-right-title u-m-t-5 u-line-2">
						{{item.title}}
					</view>
					<view class="u-flex">
						<view class="shop-list-right-tag  u-font-30">
							<view class="u-m-t-15">
								<text>价格：</text>
								<text class="price">{{item.money/100}}</text>
								<text class="u-p-l-15">元</text>
							</view>
							<view class="u-m-t-8">
								<text>销量：</text>
								<text>{{item.salesNum}}</text>
								<text class="u-p-l-15">件</text>
							</view> 
							<view v-if="item.userLimit>0" class="u-m-t-8">
								<text>限购：</text>
								<text>{{item.userLimit}}</text>
								<text class="u-p-l-15">件</text>
							</view> 
							<view v-else class="u-m-t-8">
								<text>限购：</text>
								<text>无限制</text>
							</view> 
						</view>
					</view>
				</view>
			</view>
		</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"ShopList",
		data() {
			return {
				imageUrl:"https://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/176232/37/6059/194863/60826533E3a7e373b/b7f3ee9cfc15d5a7.jpg!q70.dpg.webp"
			};
		},
		props:["listData"],
		onLoad() {
			
			console.log(this.listData)
		},
		created() {
			
		},
		computed:{
			imgUrl(){
				return (item)=>{
					return item.img?item.img:this.imageUrl
				}
			}
		},
		methods:{
			jumUrl(id){
				console.log(id)
				if (id){
					uni.navigateTo({
						url:'/pages/detail/detail?id='+id,						
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.ShopList{
		padding: 20rpx;
	}
	.shop-list{
		background: #fff;
		width: 100%;
		margin-top: 15rpx;
		&-image{
			image{
				width: 250rpx;
				height: 250rpx;
			}
		}
		&-right{
			height: 250rpx;
			padding-right: 15rpx;
			&-title{
				height: 80rpx;
			}
			&-tag{
				width: 100%;
			}
			&-button{
				width: 120rpx;
			}
		}
		
	}
</style>
