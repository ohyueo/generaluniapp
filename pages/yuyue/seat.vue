<template>
	<view>
		
		<view class="u-flex u-row-center u-padding-20 u-margin-top-10">
			<view class="u-flex">
				<view class="btn1 bg1"></view>
				<text class="u-font-26 u-color-balck3 u-margin-left-10">可选</text>
			</view>
			<view class="u-flex u-margin-left-30">
				<view class="btn1 bg2"></view>
				<text class="u-font-26 u-color-balck3 u-margin-left-10">不可选</text>
			</view>
			<view class="u-flex u-margin-left-30">
				<view class="btn1 bg3"></view>
				<text class="u-font-26 u-color-balck3 u-margin-left-10">已选</text>
			</view>
		</view>
		
		<view class="u-flex-col" style="padding: 10rpx 8rpx;">
			<view class="u-flex u-row-center" v-for="(item,index) in list" :key="index">
				<block v-for="(itex,index2) in item.list" :key="index2">
					<view v-if="itex.status==1" @click="navst(itex.biao,itex.title,itex.status,itex.id)" :class="itex.biao==biao?'bg3 u-color-white':'bg1 u-color-balck3'" class="kuaibtn u-margin-left-12 u-margin-top-14 u-flex u-row-center u-col-center">
						<text class="u-font-20">{{itex.title}}</text>
					</view>
					<view v-if="itex.status==2" @click="navst(itex.biao,itex.title,itex.status,itex.id)" class="kuaibtn u-margin-left-12 bg2 u-margin-top-14 u-flex u-row-center u-col-center">
						<text class="u-font-20 u-color-balck3">{{itex.title}}</text>
					</view>
					<view v-if="itex.status==3" class="kuaibtn u-margin-left-12 u-margin-top-14 u-flex u-row-center u-col-center">
						
					</view>
				</block>
			</view>
		</view>
		
		<view class="u-flex-col u-padding-20 u-row-center u-col-center u-margin-top-20 botboot u-bg-white">
			<view class="u-flex-col u-col-top u-margin-bottom-20" style="width: 710rpx;">
				<text class="u-font-28 u-color-balck3 u-font-bold">选择：{{title?title:'请选择'}}</text>
				<text class="u-font-26 u-color-balck6 u-margin-top-10" v-if="riqi && time">时间：{{riqi}} {{time}}</text>
			</view>
			<view class="bootben u-flex u-row-center u-col-center bg3 u-border-ra20" @click="tiaourl(1)">
				<text class="u-font-28 u-color-white">我选好了</text>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				list:[],
				id:0,
				token:'',
				time:'',
				riqi:'',
				wek:'',
				timeid:0,
				biao:'',
				biaoid:0
			}
		},
		onLoad(e) {
			if(e.id){
				this.id=e.id;
			}
			if(e.time){
				this.time=e.time;
			}
			if(e.riqi){
				this.riqi=e.riqi;
			}
			if(e.wek){
				this.wek=e.wek;
			}
			if(e.timeid){
				this.timeid=e.timeid;
			}
			this.GetToken();
		},
		methods: {
			navst(biao,title,st,id){
				if(st==2){
					uni.showToast({
						title: '预约已满，请重新选择',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				this.biaoid=id;
				this.biao=biao;
				this.title=title;
			},
			getData(){
				var _this=this;
				this.$api.seatlist({id:this.id,
					token:this.token,
					y_time:this.time,
					y_data:this.riqi
				}).then((res)=>{
					if('list' in res.data.data){
						_this.list=res.data.data.list;
					}else{
						_this.list=res.data.data;
					}
				})
			},
			GetToken(){
				var _this=this;
				uni.getStorage({
				    key: 'userData',
					success:function (res) {
						_this.token=res.data.vuex_token;
						_this.getData();
					},fail() {
						//清理本地
						uni.removeStorage({
							key: 'userData'
						});
						uni.navigateTo({
							url:'/pages/login/login'
						})
						return false;
					}
				});
			},
			tiaourl(st){
				if(!this.biao || !this.biaoid){
					uni.showToast({
						title: '请选择座位',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				if(st==1){
					var url="order?id="+this.id+'&riqi='+this.riqi+"&time="+this.time+'&wek='+this.wek+'&timeid='+this.timeid+'&biao='+this.biao+'&title='+this.title+'&biaoid='+this.biaoid;
					this.tiao(url);
				}else if(st==2){
					uni.showToast({
						title: '预约已满，请重新选择',
						icon:"none",
						duration: 2000
					});
				}
				return false;
			},
			tiao(url){
				uni.redirectTo({
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
	.botboot{
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 9;
	}
	.bootben{
		width: 690rpx;
		height: 80rpx;
	}
	.bg1{
		border: 2rpx solid #19be6b;
	}
	.bg2{
		border: 2rpx solid #cccccc;
	}
	.bg3{
		background-color: #19be6b;
		border: 2rpx solid #19be6b;
	}
	.kuaibtn{
		width: 58rpx;
		height: 58rpx;
		border-radius: 10rpx;
	}
	.btn1{
		width: 40rpx;
		height: 40rpx;
		border-radius: 10rpx;
	}
	.u-margin-left-12{
		margin-left: 12rpx;
	}
	.u-margin-top-14{
		margin-top: 14rpx;
	}
</style>