<template>
	<view>
		
		<view class="u-flex u-row-center u-col-center u-padding-20">
			<text class="u-color-balck9 u-font-28">以下内容是 "{{tit}}" 的搜索结果</text>
		</view>
		
		<view style="width: 750rpx;">
			<view class="u-flex u-flex-wrap u-row-between u-padding-20">
				<view class="u-flex-col u-bg-white u-margin-bottom-20" v-for="(item,index) in list" :key="index" @click="tiao('../shop/info?id='+item.id)">
					<image :src="item.img" style="width: 348rpx;height: 348rpx;" mode=""></image>
					<view class="u-flex-col u-padding-10">
						<text class="u-font-26 u-color-balck3 u-font-dan-sheng" style="width: 324rpx;">{{item.title}}</text>
						<view class="u-flex u-margin-top-10">
							<text class="u-font-28 zhuti_color_hong">￥{{item.money}}</text>
							<text class="u-font-24 u-color-balck6 u-margin-left-10" style="text-decoration:line-through;">￥{{item.zmo}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="status"></uni-load-more>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tit:'',
				list:[],
				status: 'loadmore',
				page:1,
				count: 10,
				res_count:0,
			}
		},
		onLoad(e) {
			if(e.tit){
				this.tit=e.tit;
			}
			this.getlist();
		},
		onReachBottom() {
			if(this.count >= this.res_count) return ;
			this.status = 'loading';
			this.page = ++ this.page;
			setTimeout(() => {
				this.count += 10;
				this.getlist();
			}, 2000)
		},
		methods: {
			getlist(){
				var _this=this;
				this.$api.getshop({page:this.page,tit:this.tit}).then((res)=>{
					//_this.list=res.data.data.list;
					res.data.data.list.forEach(item=>{
						_this.list.push(item);
					});
					_this.res_count=res.data.data.count;
					if(_this.count >= _this.res_count) _this.status = 'nomore';
					else _this.status = 'loading';
				})
			},
			tiao(url){
				uni.navigateTo({
					url:url
				})
			},
			turl(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>
	.serbtn{
		padding: 8rpx 20rpx;
		background-color: #F6F6F6;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
		margin-right: 20rpx;
	}
	.searlist{
		width: 600rpx;
		height: 70rpx;
		border-radius: 40rpx;
		background-color: #F6F6F6;
		line-height: 70rpx;
		display: flex;
		flex-direction: row;
	}
	.seatit{
		width: 500rpx;
		height: 70rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		letter-spacing: 2rpx;
	}
</style>
