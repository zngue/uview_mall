<template>
	<view class="tabbar">
		<u-tabbar @change="beforeSwitch" v-model="current" :list="list"></u-tabbar>
	</view>
</template>

<script>
	export default {
		name:"TabBar",
		data() {
			return {
				current:0,
				list:[
					{
						iconPath:"home",
						selectedIconPath:"home-fill",
						text:"首页",
						pagePath:"/pages/index/index"
					},
					{
						iconPath:"order",
						selectedIconPath:"order",
						text:"订单管理",
						midButton: true,
						pagePath:"/pages/order/order"
					},
					{
						iconPath:"calendar",
						selectedIconPath:"calendar-fill",
						text:"我的",
						midButton: true,
						pagePath:"/pages/user/user"
					}
				]
			};
		},
		watch:{
			$route:{
				handler(old,namepath){
					// console.log("111",old)
					console.log("new",namepath)
				},
			},
		},
		onLoad(option) {
			console.log("9595")
			console.log(this.list)
		},
		created() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
			this.getCurrent(curRoute)			
		},
		methods:{
			getCurrent(path){
				this.list.forEach( (item,index)=>{
					if ( item.pagePath == path ){
						this.current=index
					}
				} )
			},
			getPath(){
				
				console.log(this.list)
			},
			beforeSwitch(index){
				const path=this.list[index].pagePath
				if (path){
					uni.navigateTo({
						url:path
					})
				}
				console.log(path)
			}
		}
	}
</script>

<style>

</style>
