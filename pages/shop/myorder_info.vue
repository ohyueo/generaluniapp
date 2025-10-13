<template>
	<view>
		
		<div class="u-padding-20">
			<div class="u-flex-col u-bg-white" style="padding: 0 10px;">
				<div class="u-flex u-col-center" style="line-height: 40px;border-bottom: 1px solid #F6F6F6;font-size: 14px;color: #333333;">
					<i class="icon zhuti_color u-font-40">&#xe75c;</i>
					<span class="u-margin-left-20">商品信息</span>
				</div>
				<view class="">
					<view class="u-flex border-bootom-1" style="padding: 20rpx 0;" v-for="(item,index) in list.res" :key="index">
						<image :src="item.img" style="width: 100rpx;height: 100rpx;border-radius: 20rpx;" mode=""></image>
						<view class="u-flex-col u-margin-left-20">
							<view class="u-flex">
								<text class="u-font-26 u-color-balck3 u-margin-left-8 u-font-dan-sheng" style="width: 540rpx;height: 40rpx;line-height: 40rpx;">{{item.title}}</text>
							</view>
							<view class="u-flex u-row-between">
								<text class="u-font-26 u-margin-top-20" style="color: #2979ff;">￥{{item.money}}</text>
								<text class="u-font-26 u-margin-top-20 u-color-balck6">x{{item.no}}</text>
							</view>
						</view>
					</view>
					<view class="u-flex-col u-margin-top-10">
						<view class="u-flex txtli u-row-between">
							<text class="u-font-24 u-color-balck6">商品总额</text>
							<text class="u-font-24 u-color-balck3">￥{{list.money}}</text>
						</view>
						<view class="u-flex txtli u-row-between">
							<text class="u-font-24 u-color-balck6"></text>
							<view class="u-flex">
								<text class="u-font-24 u-color-balck3">订单状态：</text>
								<text class="u-font-24 u-color-balck3">{{list.star}}</text>
							</view>
						</view>
						<view class="u-flex txtli u-row-between">
							<text class="u-font-24 u-color-balck6"></text>
							<view class="u-flex">
								<text class="u-font-24 u-color-balck3">实付款：</text>
								<text class="u-font-28 zhuti_color_hong u-font-bold">￥{{list.paymo}}</text>
							</view>
						</view>
					</view>
				</view>
			</div>
		</div>
		
		<div class="" style="padding: 0rpx 20rpx;">
			<div class="u-flex-col u-bg-white" style="padding: 0 10px;">
				<div style="line-height: 40px;border-bottom: 1px solid #F6F6F6;font-size: 14px;color: #333333;">
					<i class="icon zhuti_color u-font-40">&#xe75c;</i>
					<span class="u-margin-left-20">订单信息</span>
				</div>
				<div style="line-height: 30px;color: #666666;font-size: 12px;">取货人 ： {{list.name}}</div>
				<div style="line-height: 30px;color: #666666;font-size: 12px;">手机号 ： {{list.mobile}}</div>
				<div style="line-height: 30px;color: #666666;font-size: 12px;">收货地址 ： {{list.address}}</div>
				<div style="line-height: 30px;color: #666666;font-size: 12px;">订单备注 ： {{list.message}}</div>
				<div style="line-height: 30px;color: #666666;font-size: 12px;">订单编号 ： {{list.id}}</div>
				<div style="line-height: 30px;color: #666666;font-size: 12px;">创建时间 ： {{list.addtime}}</div>
				
			</div>
		</div>
		
		
		<view class="" style="padding: 0rpx 20rpx;margin-top: 20rpx;">
			<view class="u-flex-col u-bg-white" style="padding: 0 10px;">
				<view class="u-flex" style="line-height: 40px;border-bottom: 1px solid #F6F6F6;font-size: 14px;color: #333333;">
					<text class="icon zhuti_color u-font-40">&#xe75c;</text>
					<text class="u-margin-left-20">支付及发货</text>
				</view>
				<view style="line-height: 60rpx;color: #666666;font-size: 22rpx;" v-if="list.status>1 && list.status<6">支付订单 ： {{list.pay_order}}</view>
				<view style="line-height: 60rpx;color: #666666;font-size: 22rpx;" v-if="list.status>1 && list.status<6">后台备注 ： {{list.texter}}</view>
			</view>
		</view>
		
		<!--底部-->
		<!--未付款-->
		<view style="height: 100rpx;" v-if="list.status==1"></view>
		<view class="myorderboot u-bg-white u-flex u-row-between" v-if="list.status==1">
			<view @click="qxyu()" class="u-flex u-row-center u-col-center zhuti_border zhuti_color u-margin-left-20" style="width: 300rpx;height: 70rpx;border-radius: 35rpx;">取消订单</view>
			<view @click="getpay(list.id)" class="u-flex u-row-center u-col-center zhuti_bg u-color-white" style="width: 300rpx;height: 70rpx;border-radius: 35rpx;margin-right: 20rpx;">立即支付</view>
		</view>
		
		<view style="height: 100rpx;" v-if="list.status==3"></view>
		<view class="myorderboot u-bg-white u-flex u-row-center" v-if="list.status==3">
			<!-- <view @click="qxyu()" class="u-flex u-row-center u-col-center zhuti_border zhuti_color" style="width: 160rpx;height: 70rpx;border-radius: 35rpx;">
				<text class="u-font-26">核销码</text>
			</view> -->
			<view @click="querenorder(list.id)" class="u-flex u-row-center u-col-center zhuti_bg u-color-white" style="width: 460rpx;height: 70rpx;border-radius: 35rpx;margin-right: 20rpx;">确认收货</view>
		</view>
		
	</view>
</template>

<script>
	import uQRCode from '@/components/uqrcode/common/uqrcode.js'
	export default {
		data() {
			return {
				id:0,
				navst:0,
				list:[],
				title: 'Hello',
				token:'',
				status: 'loadmore',
				type:0,
				count: 10,
				res_count:0,
				page: 1,
				iswx:1,//网页
				money:0,
			}
		},
		onLoad(e) {
			if(e.id){
				this.id=e.id;
			}
			this.iswx=this.$iswx;
			this.GetToken();
		},
		onPullDownRefresh() {
			this.getData();
			setTimeout(function () {
			    uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.GetToken();
		},
		//#ifdef H5
		mounted() {
			if(this.iswx==2){
				if (window.location.href.indexOf("?#") < 0) {
				  window.location.href = window.location.href.replace("#", "?#");
				}
			}
		},
		//#endif
		methods: {
			getData(){
				var _this=this;
				this.$api.shopordinfo({'token':this.token,id:this.id}).then((res)=>{
					_this.list=res.data.data;
					_this.money=res.data.data.money;
					uni.setNavigationBarTitle({
					    title: res.data.data.star
					});
				})
			},
			istui(id){
				var _this=this;
				uni.showModal({
					content: "你正在进行退款操作，确定退款吗？",
					confirmText: "确定",
					cancelText: "取消",
					cancelColor:"#71ADF5",
					confirmColor:"#71ADF5",
						success: function (res) {
							if (res.confirm) {
								_this.tuikuan(id);
							}
						}
				})
			},
			open() {
				var textxx=this.id;
				uQRCode.make({
				    canvasId: 'qrcode',
				    componentInstance: this,
				    size: 180,
				    margin: 10,
				    text: textxx,
				    backgroundColor: '#ffffff',
				    foregroundColor: '#333333',
				    fileType: 'png',
				    errorCorrectLevel: uQRCode.errorCorrectLevel.H
				})
				.then(res => {
				    console.log(res)
				})
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close()
			},
			// tuikuan(id){
			// 	var _this=this;
			// 	var st=3;
			// 	//#ifdef H5
			// 	if(this.iswx==2){
			// 		var st=1;
			// 	}else{
			// 		var st=2;
			// 	}
			// 	//#endif
			// 	uni.request({
			// 		url: _this.$puburl+'resource/Payco/h5refund',
			// 	    data: {
			// 	        id: id,
			// 			st:st,
			// 			token:_this.token
			// 	    },
			// 	    method: 'GET',
			// 	    header: {
			// 	        'content-type': 'application/json'
			// 	    },
			// 	    success: (res) => {
			// 			if(res.data.code==200){
			// 				uni.showToast({
			// 				    title: res.data.message,
			// 					icon:'none',
			// 				    duration: 2000
			// 				});
			// 				_this.getData();
			// 			}else{
			// 				uni.showToast({
			// 				    title: res.data.message,
			// 					icon:'none',
			// 				    duration: 2000
			// 				});
			// 			}
			// 		}
			// 	})
			// },
			querenorder(){
				var _this=this;
				this.$api.querenorder({id:this.id,token:this.token}).then(res => {
					if(res.data.code==200){
						uni.showToast({
						    title: res.data.message,
							icon:'none',
						    duration: 2000
						});
						_this.getData();
					}else{
						uni.showToast({
						    title: res.data.message,
							icon:'none',
						    duration: 2000
						});
					}
				})
			},
			onBridgeReady(id){
				var _this=this;
				uni.request({
					url: _this.$puburl+'resource/Payco/wxh5',
				    data: {
				        id: id,
						st:3,
						token:_this.token
				    },
				    method: 'GET',
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						var data=res.data;
						WeixinJSBridge.invoke(
						   'getBrandWCPayRequest', data,
						   function(res){
							console.log('xsssss='+JSON.stringify(res));
						   if(res.err_msg == "get_brand_wcpay_request:ok" ){
						   // 使用以上方式判断前端返回,微信团队郑重提示：
							   uni.showToast({
								title: '支付成功',
								icon:"none",
								duration: 2000
							   });
							   setTimeout(() => {
								uni.navigateTo({
									url:'../pay/payok?id='+id+'&money='+_this.money
								})
							   },1000)
						         //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						   }else{
							   uni.showToast({
							   	title: '支付失败',
							   	icon:"none",
							   	duration: 2000
							   });
						   }
						});
				    }
				});
			},
			getpay(id){
				//#ifdef H5
				if(this.iswx==2){
					this.onBridgeReady(id);
				}else{
					//网页
					uni.navigateTo({
						url:'../pay/h5pay?id='+id+'&st=3'
					})
				}
				return false;
				//#endif
				var _this=this;
				//#ifdef MP-WEIXIN
				uni.request({
					url: _this.$puburl+'resource/Payco/wxxcx',
				    data: {
				        id: id,
						token:_this.token,
						st:3
				    },
				    method: 'GET',
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						var nonceStr=res.data.data.nonceStr;
						var packages=res.data.data.package;
						var paySign=res.data.data.paySign;
						var timeStamp=res.data.data.timeStamp;
						uni.requestPayment({
						    provider: 'wxpay',
						    timeStamp:timeStamp,
						    nonceStr: nonceStr,
						    package: packages,
						    signType: 'MD5',
						    paySign: paySign,
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								uni.showToast({
									title: '支付成功',
									icon:"none",
									duration: 2000
								});
								_this.getData();
						    },
						    fail: function (err) {
								uni.showToast({
									title: '支付失败',
									icon:"none",
									duration: 2000
								});
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
						//console.log(JSON.stringify(res));
						
				    }
				});
				//#endif
			},
			GetToken(){
				var _this=this;
				uni.getStorage({
				    key: 'userData',
				    success: function (res) {
						_this.token=res.data.vuex_token;
						_this.list=[];
						_this.getData();
				    }
				});
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
	.erlist{
		width: 540rpx;
		height: 400rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.topvix{
		padding: 20rpx;
		border-bottom: 2rpx dashed #CCCCCC;
	}
	.popbox{
		width: 600rpx;
		background-color: #F7F7F7;
	}
	
	.txtli{
		line-height: 40rpx;
		margin-top: 10rpx;
	}
	.myorderboot{
		height: 100rpx;
		width: 100%;
		position: fixed;
		bottom: 0px;
		left: 0px;
		border-top: 1rpx solid #F6F6F6;
	}
	.mobg{
		background-color: #999999;
	}
</style>
