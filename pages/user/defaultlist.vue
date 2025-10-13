<template>
	<view>
		
		
		<div class="u-flex-col u-padding-20">
			<div class="u-flex-col u-padding-20  u-bg-white" style="border-bottom: 10rpx solid #F6F6F6;" v-for="(item,index) in list" :key="index" @click="tiao('myorder_info?id='+item.id)">
				<div class="u-flex u-row-between">
					<span class="u-font-26">ID：{{item.id}}</span>
					<span class="u-font-26 u-color-balck6">违约时间：{{item.adtime}}</span>
				</div>
				<div class="u-margin-top-10 u-flex" style="border-bottom: 1px solid #F6F6F6;padding-bottom: 10px;justify-content: space-between;">
					<div class="u-flex-col" style="width: 70%;">
						
					</div>
				</div>
				<div class="u-flex u-row-between" style="height: 30px;line-height: 40px;">
					<span class="u-font-26 u-color-balck6" v-if="item.title">{{item.title}}【订单ID:{{item.orderid}}】</span>
				</div>
			</div>
		</div>
		
		<uni-load-more :status="status"></uni-load-more>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navst:1,
				list:[],
				title: 'Hello',
				token:'',
				status: 'loadmore',
				type:1,
				count: 10,
				res_count:0,
				page: 1
			}
		},
		onLoad() {
			this.GetToken();
			this.getData();
		},
		onPullDownRefresh() {
			this.getData();
			setTimeout(function () {
			    uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			if(this.count >= this.res_count) return ;
			this.status = 'loading';
			this.page = ++ this.page;
			setTimeout(() => {
				this.count += 10;
				this.getData();
			}, 2000)
		},
		methods: {
			setnav(st){
				this.list=[];
				this.status = 'loading';
				this.navst=st;
				this.type=st;
				this.page=0;
				this.getData();
			},
			getData(){
				var _this=this;
				this.$api.setdefaultlist({'token':this.token,type:this.navst,page:this.page}).then((res)=>{
					_this.list=res.data.data.list;
					_this.res_count=res.data.data.count;
					if(_this.count >= _this.res_count) _this.status = 'nomore';
					else _this.status = 'loading';
				})
			},
			GetToken(){
				var _this=this;
				const value = uni.getStorageSync('userData');
				if (value) {
					_this.token=value.vuex_token;
				}
			},
			tiao(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F6F6F6;
	}
	.topvie{
		width: 750rpx;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		height: 80rpx;
	}
	.topli{
		height: 80rpx;
	}
</style>
