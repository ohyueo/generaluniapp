<template>
	<view>
		
		<view class="topvie zhuti_bg u-flex u-row-center u-col-center">
			<i class="icon u-font-56 u-color-white" style="font-size: 68rpx;">&#xe680;</i>
			<view class="u-flex-col u-margin-left-20">
				<text class="u-font-36 u-color-white">购买成功</text>
				<text class="u-font-24 u-color-white u-margin-top-10">感谢您的购买</text>
			</view>
		</view>
		
		<view class="centvie u-flex-col">
			<text class="u-font-32 u-color-balck3" style="line-height: 90rpx;">￥{{money}}</text>
			<view class="u-flex centli">
				<text class="u-font-26 u-color-balck6">订单编号：</text>
				<text class="u-font-26 u-color-balck3">{{id}}</text>
			</view>
			<view class="u-flex centli">
				<text class="u-font-26 u-color-balck6">下单时间：</text>
				<text class="u-font-26 u-color-balck3">{{time}}</text>
			</view>
			<!-- <view class="u-flex centli">
				<text class="u-font-26 u-color-balck6">支付方式：</text>
				<text class="u-font-26 u-color-balck3">xxx</text>
			</view> -->
			<view class="u-flex centli">
				<text class="u-font-26 u-color-balck6">订单状态：</text>
				<text class="u-font-26 u-color-balck3">支付成功</text>
			</view>
		</view>
		
		<view class="paybtn zhuti_bg" @click="tiaoord()">
			<text class="u-font-28 u-color-white">查看订单</text>
		</view>
		
		<view class="paybtn" style="margin-top: 30rpx;border:1rpx solid #cccccc;" @click="tiaoindex()">
			<text class="u-font-28 u-color-balck3">返回首页</text>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				version:'',
				company:'',
				img:'',
				money:0,
				id:0,
				time:''
			}
		},
		onLoad(e) {
			if(e.id){
				this.id=e.id;
			}
			if(e.money){
				this.money=e.money;
			}
			this.GetToken();
			var time = new Date();
			time.toLocaleString();
			this.time=time;
		},
		onBackPress() {
			uni.reLaunch({
			    url: './myorder'
			});
		},
		methods: {
			GetToken(){
				var _this=this;
				uni.getStorage({
				    key: 'userData',
				    success: function (res) {
						_this.token=res.data.vuex_token;
				    }
				});
			},
			tiao(url){
				uni.navigateTo({
					url:url
				})
			},
			tiaoord(){
				uni.reLaunch({//信息更新成功后跳转到小程序首页
					url: '/pages/shop/myorder'
				});
				return false;
			},
			tiaoindex(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>
	.paybtn{
		width: 400rpx;
		height: 80rpx;
		border-radius: 45rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 160rpx;
		margin-left: 175rpx;
	}
	.centli{
		width: 600rpx;
		margin-left: 20rpx;
		line-height: 70rpx;
	}
	.centvie{
		width: 640rpx;
		margin-top: -60rpx;
		margin-left: 55rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
	}
	.topvie{
		height: 300rpx;
	}
	.u-font-56{
		font-size: 56rpx;
	}
</style>
