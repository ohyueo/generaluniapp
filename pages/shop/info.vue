<template>
	<view class="u-padding-20">
		
		<view class="u-flex-col u-border-ra10 u-bg-white">
			<div class="u-flex u-col-center u-row-between">
				<div class="imglist">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true">
						<swiper-item v-for="(item,index) in 1" :key="index">
							<image :src="list.img" mode="" class="swiimg"></image>
						</swiper-item>
					</swiper>
				</div>
			</div>
			<view class="u-padding-20 u-flex-col" v-if="list && list.title">
				<view class="u-flex">
					<text class="u-font-28 zhuti_color_hong u-font-bold">￥{{list.money}}</text>
					<text class="u-font-24 u-color-balck6 u-margin-left-10 u-font-bold" style="text-decoration:line-through;">￥{{list.zmo}}</text>
				</view>
				<text class="u-font-26 u-color-balck3 u-font-dan-sheng u-font-bold" style="width: 690rpx;margin-top: 10rpx;margin-bottom: 10rpx;">{{list.title}}</text>
				<view class="u-flex u-row-between u-margin-top-10">
					<text class="u-font-22 u-color-balck6">库存{{list.inventory}}件</text>
					<text class="u-font-22 u-color-balck6">已售{{list.sales}}件</text>
					<text class="u-font-22 u-color-balck6">浏览{{list.pv}}次</text>
				</view>
			</view>
		</view>
		<view class="jianju-10" v-if="list.uid>0"></view>
		<view class="u-flex u-row-between u-border-ra10 u-bg-white u-padding-20" v-if="list.uid>0" @click="tiao('../mershop/shop?id='+list.uid)">
			<view class="u-flex">
				<image v-if="shop && shop.shopimg" :src="shop.shopimg" mode="" style="width: 80rpx;height: 80rpx;"></image>
				<view class="u-flex-col u-margin-left-10" v-if="shop">
					<text class="u-font-28 u-color-balck3">{{shop.shopname?shop.shopname:''}}</text>
					<view class="u-flex u-margin-top-10">
						<text class="u-font-26 u-flex u-row-center u-col-center" style="padding: 5rpx 10rpx;border: 1rpx solid #ff9900;color: #ff9900;border-radius: 10rpx;">进店逛逛</text>
					</view>
				</view>
			</view>
			<view class="u-flex">
				<text class="icon u-font-32 u-color-balck6">&#xe623;</text>
			</view>
		</view>
		
		<view class="jianju-10"></view>
		<view class="u-flex-col u-border-ra10 u-bg-white">
			<view class="u-flex border-bottom-1">
				<view @click="current=0" class="u-flex u-flex-1 u-row-center u-col-center u-rela" style="height: 70rpx;">
					<text class="u-font-28 u-color-balck3">图文详情</text>
					<!-- <view class="dibtn u-abso zhuti_bg" v-if="current==0"></view> -->
				</view>
				<!-- <view @click="current=1" class="u-flex u-flex-1 u-row-center u-col-center u-rela" style="height: 70rpx;">
					<text class="u-font-28 u-color-balck3">产品参数</text>
					<view class="dibtn u-abso zhuti_bg" v-if="current==1"></view>
				</view> -->
			</view>
			
			<view class="u-padding-20" style="padding-top: 20rpx;" v-if="current==0">
				<view v-if="list.texter" class="u-margin-top-20 u-font-28">
					<u-parse :content="list.texter"></u-parse>
				</view>
			</view>
		</view>
		
		
		<view class="zhanwei"></view>
		<view class="bootvie u-flex u-col-center u-bg-white u-row-between" v-if="appid">
			<view class="u-flex">
				<view @click="openwxkf()" class="bootli u-flex-col" style="background: none;border: none;height: 80rpx;line-height: 40rpx;outline:none;">
					<i class="icon u-color-balck9 u-font-40 u-margin-top-10">&#xe617;</i>
					<text class="u-font-24 u-color-balck3 u-margin-top-5">客服</text>
				</view>
			</view>
			<div class="bar_btn zhuti_bg u-flex u-row-center u-col-center" @click="open()">
				<span class="u-font-32 u-color-white">立即购买</span>
			</div>
		</view>
		<view class="bootvie u-flex u-col-center u-bg-white u-row-center" v-if="!appid">
			<div class="bar_btn2 zhuti_bg u-flex u-row-center u-col-center" @click="open()">
				<span class="u-font-32 u-color-white">立即购买</span>
			</div>
		</view>
		
		<uni-popup ref="popup" type="share">
		    <view class="popbox">
		    	<view class="u-flex u-padding-20">
		    		<image :src="list.img" mode="" style="width: 150rpx;height: 150rpx;"></image>
					<view class="u-flex u-margin-left-5 u-col-bottom" style="height: 150rpx;width: 480rpx;">
						<text class="u-font-28 zhuti_color_hong">￥{{list.money}}</text>
						<text class="u-font-24 u-color-balck6 u-margin-left-10" style="text-decoration:line-through;">￥{{list.zmo}}</text>
					</view>
					<view @click="close()" style="height: 150rpx;width: 100rpx;text-align: right;">
						<text class="u-font-28 u-color-balck6">x</text>
					</view>
		    	</view>
				<view style="padding: 0 20rpx;">
					<view class="u-flex u-row-between" style="height: 70rpx;border-top: 1rpx solid #F0F0F0;">
						<text class="u-font-26 u-color-balck3">数量</text>
						<view class="u-flex" style="width: 150rpx;height: 40rpx;border: 2rpx solid #F0F0F0;">
							<view class="jjv" @click="upno(1)">
								<text class="u-font-24 u-color-balck3">-</text>
							</view>
							<input type="text" v-model="sno" class="jjput"/>
							<view class="jjv" @click="upno(2)">
								<text class="u-font-24 u-color-balck3">+</text>
							</view>
						</view>
					</view>
				</view>
				<view class="u-flex u-row-center u-col-center zhuti_bg" style="height: 90rpx;" @click="tinfo()">
					<text class="u-font-28 u-color-white">确定</text>
				</view>
		    </view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
		    uParse
		  },
		data() {
			return {
				current:0,
				id:0,
				title: 'Hello',
				list:[],
				shop:[],
				status: 'loadmore',
				type:2,
				count: 10,
				res_count:0,
				page: 1,
				sno:0,
				appid:'',
				kfurl:''
			}
		},
		onLoad(e) {
			if(e.id){
				this.id=e.id;
			}
			this.getData();
			this.getcart();
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			getcart(){
				//查询购物车数据
				var zno=0;//数量
				var value = uni.getStorageSync('cartvalue');
				if (value) {
					for(var i=0;i<value.length;i++){
						if(value[i].id==this.id){
							zno=value[i].no;
						}
					}
					this.sno=zno;//目前数量
				}
			},
			openwxkf(){
				var kfurl=this.kfurl;
				var appid=this.appid;
				console.log('打开客服');
				//#ifdef MP-WEIXIN
				wx.openCustomerServiceChat({
				  extInfo: {url: kfurl},
				  corpId: appid,
				  success(res) {
					console.log(res);
				  }
				})
				//#endif
				//#ifdef H5
				this.turl(1,kfurl);
				//#endif
			},
			turl(st,url){
				if(st==1){
					uni.navigateTo({
						url:'../index/weburl?url='+url
					})
				}
			},
			upno(st){
				if(st==1){
					if(this.sno>0){
						this.sno-=1;
						//查询购物车数据
						var value = uni.getStorageSync('cartvalue');
						if (value) {
							for(var i=0;i<value.length;i++){
								if(value[i].id==this.id){
									value[i].no=this.sno;
								}
							}
							uni.setStorageSync('cartvalue',value);
						}else{ //第一次  存入
							var list=[{id:this.id,no:1,money:this.list.money,title:this.list.title,img:this.list.img}];
							uni.setStorageSync('cartvalue',list);
						}
					}
				}
				if(st==2){
					this.sno+=1;
					//查询购物车数据
					var value = uni.getStorageSync('cartvalue');
					if (value) {
						for(var i=0;i<value.length;i++){
							if(value[i].id==this.id){
								value[i].no=this.sno;
							}
						}
						uni.setStorageSync('cartvalue',value);
					}else{ //第一次  存入
						var list=[{id:this.id,no:1,money:this.list.money,title:this.list.title,img:this.list.img}];
						uni.setStorageSync('cartvalue',list);
					}
				}
			},
			getData(){
				var _this=this;
				this.$api.shop_info({id:this.id}).then((res)=>{
					_this.list=res.data.data.list;
					_this.shop=res.data.data.list.shop;
					_this.appid=res.data.data.appid;
					_this.kfurl=res.data.data.kfurl;
					
				})
			},
			tinfo(){
				if(this.sno<1){
					uni.showToast({
						title: '请选择商品数量',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				uni.navigateTo({
					url:'order?no='+this.sno+'&id='+this.id
				})
			},
			tiao(url){
				uni.navigateTo({
					url:url
				})
			},
			tindex(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f6f6f6;
	}
	uni-button:after{
		border: none!important;
	}
	.jianju-10{
		width: 710rpx;
	}
	.dibtn{
		width: 100rpx;
		height: 4rpx;
		bottom: 2rpx;
	}
	.popbox{
		background-color: #FFFFFF;
	}
	.jjput{
		width: 50rpx;
		height: 50rpx;
		font-size: 24rpx;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.jjv{
		width: 50rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.imglist{
		width: 710rpx;
		height: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.swiper{
		height: 100%;
	}
	.swiimg{
		width: 710rpx;
		height: 100%;
		border-radius: 10rpx;
	}
	.bar_btn{
		width: 580rpx;
		height: 84rpx;
		border-radius: 30px;
		margin-right: 20rpx;
	}
	.bar_btn2{
		width: 580rpx;
		height: 84rpx;
		border-radius: 30px;
	}
	.bootli{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 140rpx;
		background-color: none;
		border: none;
	}
	.bootvie{
		width: 750rpx;
		height: 100rpx;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 9;
		border-top: 1rpx solid #F0F0F0;
	}
	.zhanwei{
		width: 710rpx;
		height: 100rpx;
	}
</style>
