<template>
	<view>
		
		<view v-if="lun && lun.length>0">
			<div class="u-flex u-col-center u-row-between">
				<div class="imglist">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true">
						<swiper-item v-for="(item,index) in lun" :key="index" @click="turl(item.style,item.url)">
							<image :src="item.img" mode="" class="swiimg"></image>
						</swiper-item>
					</swiper>
				</div>
			</div>
			<view class="jianju-5"></view>
		</view>
		
		<view style="height: 1rpx;background-color: #F6F6F6;"></view>
		<!-- <view class="u-flex">
			<view class="navli" :class="type==2?'impbor':''" @click="getnav(2)">
				<text class="u-font-26" :class="type==2?'zhuti_color':'u-color-balck3'">最新</text>
			</view>
			<view class="navli" :class="type==1?'impbor':''" @click="getnav(1)">
				<text class="u-font-26" :class="type==1?'zhuti_color':'u-color-balck3'">人气</text>
			</view>
		</view> -->
		
		<view class="u-flex u-padding-20 u-border-bottom-1" v-for="(item,index) in list" :key="index" @click="tiao('texter_info?id='+item.id)">
			<view class="u-flex u-row-between u-flex-1">
				<view class="u-flex-col" style="width: 560rpx;">
					<text class="u-color-balck3 u-font-28 u-font-bold">{{item.title}}</text>
					<text class="u-color-balck6 u-font-24 u-margin-top-10">{{item.texter}}</text>
					<text class="u-color-balck6 u-font-24 u-margin-top-10">{{item.addtime}}</text>
				</view>
				<view class="u-flex">
					<img :src="item.img" style="width: 120rpx;height: 120rpx;">
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
				title: 'Hello',
				headimg:'https://img1.baidu.com/it/u=2681504758,1624692466&fm=26&fmt=auto&gp=0.jpg',
				name:'小糊涂',
				id:10,
				list:[],
				status: 'loadmore',
				page:1,
				count: 10,
				res_count:0,
				type:2,
				classid:0,
				lun:[]
			}
		},
		onLoad(e) {
			if(e.classid){
				this.classid=e.classid;
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
		onPullDownRefresh() {
			this.list=[];
			this.page=1;
			this.status='loadmore';
			this.getlist();
			setTimeout(function () {
			    uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getnav(st){
				this.type=st;
				this.list=[];
				this.page=1;
				this.status='loadmore';
				this.getlist();
			},
			getlist(){
				var _this=this;
				this.$api.texterlist({page:this.page,type:this.type,classid:this.classid}).then((res)=>{
					_this.list=res.data.data.list;
					_this.lun=res.data.data.lun;
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
			turl(st,url){
				if(st==1){
					uni.navigateTo({
						url:'../index/weburl?url='+url
					})
				}else if(st==2){
					//#ifdef APP-PLUS
					plus.runtime.openURL(url);
					//#endif
					//#ifdef H5
					window.open(url);
					//#endif
				}else if(st==4){
					uni.navigateTo({
						url:url
					})
				}else if(st==5){
					uni.switchTab({
						url:url
					})
				}
			}
		}
	}
</script>

<style>
	.navli{
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		height: 70rpx;
		border-bottom: 2rpx solid #F6F6F6;
	}
	.impcolor{
		color: #19be6b;
	}
	.impbor{
		border-bottom: 2rpx solid #19be6b;
	}
	.imglist{
		width: 750rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.swiper{
		height: 300rpx;
	}
	.swiimg{
		width: 750rpx;
		height: 300rpx;
	}
</style>
