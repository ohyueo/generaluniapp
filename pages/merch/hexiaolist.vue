<template>
	<view>
		
		<view class="u-padding-10 u-bg-white u-margin-top-10 u-flex u-row-between">
			<view class="u-flex">
				<text class="u-font-28">NO:</text>
				<input type="text" v-model="sval" placeholder="请输入预约订单核销码" style="height:56rpx;width:100%;text-indent:20rpx;font-size:28rpx;border:none;border-bottom:2rpx solid #f0f0f0;"/>
			</view>
			<view class="u-flex">
				<view class="zhuti_bg u-margin-left-10 u-flex u-row-center u-col-center" style="padding:10rpx 20rpx;" @click="hexiao()">
					<text class="u-font-28 u-color-white">核 销</text>
				</view>
				<view class="zhuti_bg u-margin-left-10 u-flex u-row-center u-col-center" style="padding:10rpx 20rpx;" @click="saoma()">
					<text class="u-font-28 u-color-white">扫码核销</text>
				</view>
			</view>
		</view>
		
		<!--管理-->
		<view class="u-flex-col u-bg-white u-padding-10 u-margin-top-10">
			<view class="u-flex u-flex-wrap">
				<view class="fklist" @click="tiao('./yuelist')">
					<text class="icon u-color-balck6" style="font-size: 58rpx;">&#xe6a6;</text>
					<text class="u-font-28 u-color-balck6 u-margin-top-5">预约订单</text>
				</view>
				<view class="fklist" @click="tiao('./board')">
					<text class="icon u-color-balck6" style="font-size: 48rpx;">&#xe60c;</text>
					<text class="u-font-28 u-color-balck6 u-margin-top-10">预约看板</text>
				</view>
			</view>
		</view>
		
		<!--核销数据-->
		<div class="u-flex-col u-bg-white u-padding-20 u-margin-top-20">
			<div class="u-flex">
				<div class="leftkuai zhubg"></div>
				<span class="u-font-28 u-color-balck3 u-font-bold u-margin-left-20">核销数据</span>
			</div>
			<div class="u-flex u-flex-wrap">
				<div class="fklist" @click="tiao('./yuelist?type=3')">
					<span class="u-font-28 u-color-balck u-font-bold" id="yno">{{whyes}}</span>
					<span class="u-font-28 u-color-balck6 u-margin-top-10">已核销</span>
				</div>
				<div class="lexian"></div>
				<div class="fklist" @click="tiao('./yuelist?type=2')">
					<span class="u-font-28 u-color-balck u-font-bold" id="wno">{{whno}}</span>
					<span class="u-font-28 u-color-balck6 u-margin-top-10">未核销</span>
				</div>
			</div>
		</div>
		
		
		
	</view>
</template>

<script>
	//#ifdef H5
	var jweixin = require('@/components/jweixin-module/index.js');
	//#endif
	export default {
		data() {
			return {
				id:0,
				name:'',
				headimg:'',
				token:'',
				vipno:0,
				whno:0,
				whyes:0,
				sval:'',
			}
		},
		onLoad() {
			this.iswx=this.$iswx;
			var that=this;
			//#ifdef H5
			if(this.iswx==2){
				var apiUrl = location.href.split("#")[0];
				uni.request({
					url: that.$puburl+'resource/Wxlogin/getSignPackage',
					data: {
						url: encodeURIComponent(apiUrl),//当前页面的域名
						api: ['scanQRCode','checkJsApi'],//调用的方法去接口列表里找
					},
					success: function(res) {
						var wxData = res.data.data.data;
						console.log(wxData);
						that.wx_sanCode(wxData)
					}
				})
			}
			//#endif
		},
		onShow() {
			this.GetToken();
		},
		methods: {
			saoma(){
				if(!this.token){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return false;
				}
				if(this.xiao==0){
					uni.showToast({
						title: '没有权限',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				//#ifdef H5
				if(this.iswx==2){
					jweixin.scanQRCode({
						needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
						success: function (res) {
							console.log(res);
							console.log('扫码成功')
						}
					});
				}else{
					uni.showToast({
						title: '请使用微信扫码',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				//#endif
				//#ifdef MP-WEIXIN
				// 只允许通过相机扫码
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
						console.log('条码内容：' + res.result);
						var str=res.result;
						//拆分id和type出来 跳转
						let arr = str.split('&');
						var id=arr[0];
						if(arr[1]==1){
							uni.navigateTo({
								url:'../user/hexiao?id='+id
							})
						}
				    }
				});
				//#endif
				
			},
			hexiao(){
				var va=this.sval;
				var str=va.slice(0,2);
				console.log(str);
				var id=va.slice(2);
				if(str=='NO'){
					uni.navigateTo({
						url:'../user/hexiao?id='+id
					})
				}else{
					uni.showToast({
						title: '请确认你输入的核销码是否正确',
						icon:"none",
						duration: 2000
					});
					return false;
				}
			},
			//扫码
			wx_sanCode: function(wxData) {
				if(wxData==0){
					return false;
				}
				console.log(wxData.appId);
				jweixin.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: wxData.appId, // 必填，公众号的唯一标识
					timestamp: wxData.timestamp, // 必填，生成签名的时间戳
					nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
					signature: wxData.signature, // 必填，签名
					jsApiList: [
						"checkJsApi",
						"onMenushareTimeline",
						"onMenushareAppMessage",
						"scanQRCode"
					], // 必填，需要使用的JS接口列表
				})
				jweixin.ready(function() {
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					jweixin.checkJsApi({
						jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
						success: function(res) {
							console.log('返回信息')
							console.log(res)
							// 以键值对的形式返回，可用的api值true，不可用为false
							// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
						}
					});
				});
				jweixin.error(function(res){
				  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				console.log(res,'接口验证失败')
				});
			},
			GetToken(){
				var _this=this;
				uni.getStorage({
				    key: 'userData',
					success:function (res) {
						_this.id=res.data.vuex_user.id;
						_this.name=res.data.vuex_user.name;
						_this.headimg=res.data.vuex_user.headimg;
						_this.token=res.data.vuex_token;
						_this.getData();
						_this.getData2();
					}
				});
			},
			getData() {
				var _this=this;
				this.$api.user_info({token: this.token}).then(res => {
					
				})
			},
			getData2() {
				var _this=this;
				this.$api.merlist({token: this.token}).then(res => {
					_this.whno=res.data.data.whno;
					_this.whyes=res.data.data.whyes;
				})
			},
			tiao(url){
				if(!this.token){
					//清理本地
					uni.removeStorage({
						key: 'userData'
					});
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return false;
				}
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f6f6f6;
	}
	.fklist{
		display: flex;
		flex: 1;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 30rpx;
	}
	.leftkuai{
		width: 6rpx;
		height: 40rpx;
	}
	.lexian{
	    height: 60rpx;
	    width: 2rpx;
	    background: #f0f0f0;
	}
</style>