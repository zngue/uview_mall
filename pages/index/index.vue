<template>
	<view class="content maincontent">
		<shop-list :list-data="shopData"></shop-list>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import ShopList from "../../components/ShopList.vue"
	import TabBar from "../../components/TabBar.vue"
	import httpGet from "../../util/http"
	export default {
		components:{
			ShopList,TabBar
		},
		data() {
			return {
				title: 'Hello',
				shopData:[],
				form:{
					page:1,
					pageSize:15,
					isPaginate:1
				},
				isLoad:true
			}
		},
		onLoad() {
			this.getShopList()
			// uni.startPullDownRefresh()
		},
		
		created() {
			 // this.getShopList()
		},
		onReachBottom(){
			this.getShopList()
		},
		methods: {
			
			getShopList(){
				if (!this.isLoad){
					return
				}	
				this.isLoad=false
				this.netService.shopList(this.form).then(r=>{
					if ( r.data && r.data.length==this.form.pageSize){
						this.form.page++
						this.isLoad=true
					}else{
						this.isLoad=false
					}
					this.shopData=[...this.shopData,...r.data]
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #eee;
	}
</style>
