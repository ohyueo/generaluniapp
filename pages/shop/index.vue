<template>
	<view class="content">
		
		<view class="srce u-margin-top-20">
			<input type="text" v-model="inputValue" confirm-type="search" @confirm="sousuo()" placeholder="输入要搜索的商品" class="srceiput"/>
			<!-- <text class="srceiput" @click="tiao('./search')">输入要搜索的商品</text> -->
			<text class="icon" style="margin-right: 30rpx;color: #666666;" @click="sousuo()">&#xe633;</text>
		</view>
		
		<view class="u-flex u-col-center u-row-between" v-if="lunbo && lunbo.length>0">
			<view class="imglist">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true">
					<swiper-item v-for="(item,index) in lunbo" :key="index"  @click="turl(item.style,item.url)">
						<image :src="item.img" mode="" class="swiimg"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!--小按钮-->
		<view class="u-yinyin">
			<scroll-view v-if="kuai && kuai.length>0" :scroll-x="true" class="interest-scroll bg-white" :show-scrollbar="false">
				<view class="interest-box">
					<view class="interest-list" @click="setnav(0)">
						<view class="list-img li1 u-flex u-row-center u-col-center" v-if="istu">
							<image src="../../static/img/shop/qb.png" style="width: 50rpx;height: 50rpx;"></image>
						</view>
						<text class="u-font-26" :class="navst==0?'zhuti_color':'u-color-balck6'">全部分类</text>
					</view>
					<view class="interest-list" v-for="(p_item, p_index) in kuai" :key="p_item.id" @click="setnav(p_item.id)">
						<image :src="p_item.img" class="list-img" mode="aspectFill" v-if="istu"></image>
						<text class="u-font-26" :class="navst==p_item.id?'zhuti_color':'u-color-balck6'">{{p_item.title}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- <view v-if="kuai && kuai.length>0" class="u-flex u-flex-wrap" style="padding-top: 1rpx;width:710rpx;background-color: #FFFFFF;border-radius: 20rpx;">
			<view class="u-flex-1 u-flex-col u-col-center u-margin-bottom-20 u-margin-top-10" v-for="(item,index) in kuai" :key="index" @click="turl(item.style,item.url)">
				<image :src="item.img" style="width: 90rpx;height:90rpx"></image>
				<span class="u-font-26 u-color-balck3 u-margin-top-5">{{item.title}}</span>
			</view>
		</view> -->
		
		
		<!--广告-->
		<view v-if="guang && guang.length>0" style="width: 710rpx;margin-bottom: 10rpx;" v-for="(item,index) in guang" :key="index" @click="turl(item.style,item.url)">
			<image :src="item.img" mode="widthFix" style="width: 710rpx;"></image>
		</view>
		<view class="jianju-5"></view>
		<!--商品-->
		<view style="padding-top: 20rpx;width: 710rpx;" class="u-flex u-row-between">
			<view class="u-flex">
				<text class="icon zhuti_color">&#xe6be;</text>
				<text class="u-font-26 u-color-balck3 u-font-bold u-margin-left-10">热门推荐</text>
			</view>
			<!-- <text class="icon" style="color: #666666;font-size: 26rpx;">&#xe623;</text> -->
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
				inputValue:'',
				title: 'Hello',
				lunbo:[],
				guang:[],
				kuai:[],
				navst:0,
				istu:0,
				list:[],
				status: 'loadmore',
				page:1,
				count: 10,
				res_count:0,
			}
		},
		onLoad() {
			//清空购物车
			uni.removeStorageSync('cartvalue');
			uni.removeStorageSync('classvalue');
			
			this.getData();
			this.getlist();
		},
		onPullDownRefresh() {
			this.list=[];
			this.page=1;
			this.status='loadmore';
			this.getData();
			this.getlist();
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
				this.getlist();
			}, 2000)
		},
		methods: {
			sousuo(){
				var va=this.inputValue;
				if(!va){
					uni.showToast({
						title: '请输入搜索内容',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				uni.navigateTo({
					url:'search?tit='+va
				})
			},
			setnav(id){
				this.navst=id;
				this.status = 'loading';
				this.page=1;
				this.list=[];
				this.getlist();
			},
			getData(){
				this.loading = true
				this.$api.shoplistindex().then((res)=>{
					this.loading = false;
					this.lunbo=res.data.data.lunbo;
					this.kuai=res.data.data.kuai;
					this.guang=res.data.data.guang;
					this.istu=res.data.data.istu;
				}).catch((err)=>{
					this.loading = false;
				})
			},
			getlist(){
				var _this=this;
				this.$api.getshop({page:this.page,id:this.navst}).then((res)=>{
					//_this.list=res.data.data.list;
					res.data.data.list.forEach(item=>{
						_this.list.push(item);
					});
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
				return false;
			},
			tiao(url){
				uni.navigateTo({
					url:url
				})
			},
			turl(st,url){
				if(st==1){
					uni.navigateTo({
						url:'weburl?url='+url
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
	page{
		background-color: #FFFFFF;
	}
	
	.srceiput{
		width: 640rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 26rpx;
		color: #666666;
		text-indent: 30rpx;
	}
	.srce{
		width: 710rpx;
		height: 70rpx;
		background-color: #F6F6F6;
		border-radius: 40rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.tuix{
		width: 710rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
	.xiaoli{
		width: 6rpx;
		height: 36rpx;
	}
	.yue_btn{
		width: 200rpx;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		text-align: center;
	}
	.yuyue_btn{
		width: 140rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
	}
	.yue_li{
		border-bottom: 1rpx solid #F6F6F6;
	}
	
	.leili{
		width: 250rpx;
	}
	.noticent{
		width: 580rpx;
		height: 60rpx;
	}
	.notilist{
		width: 710rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.an_li{
		width: 177.5rpx;
	}
	.imglist{
		width: 750rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 14rpx;
	}
	.swiimg{
		width: 710rpx;
		height: 300rpx;
		margin-left: 20rpx;
		border-radius: 10rpx;
	}
	.swiper{
		height: 300rpx;
	}
	
	.interest-scroll {
		width: 750rpx;
		margin-bottom: 10rpx;
	}
	.list-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-bottom: 10rpx;
	}
	.interest-list {
		display: flex;
		flex-direction: column;
		width: 200rpx;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		padding: 20rpx 0;
	}
	.interest-box {
		display: flex;
		white-space: nowrap;
	}
</style>
