<template>
	<view>
		<view class="navs u-flex">
			<view class="u-flex-1 u-flex u-row-center u-col-center">
				<view class="navli zhuti_color_hong zhuti_border_bottom-1">
					<text>商品详情</text>
				</view>
			</view>
		</view>
		<view class="u-flex" style="background-color: #F6F6F6;padding: 20rpx;background-color: #FFFFFF;border-bottom: 1rpx solid #F6F6F6;" v-for="(item,index) in reslist" :key="index">
			<image :src="item.img" mode="" style="width: 80rpx;height: 80rpx;"></image>
			<view class="u-flex-1">
				<view style="width: 490rpx;margin-left: 20rpx;">
					<text class="u-font-26">{{item.title}}</text>
				</view>
				<view class="u-flex-col" style="width: 120rpx;text-align: right;font-size: 26rpx;">
					<text>￥{{item.money}}</text>
					<text>x{{item.no}}</text>
				</view>
			</view>
		</view>
		
		
		<view class="jianju-5"></view>
		<view class="navs u-flex">
			<!-- <view class="u-flex-1 u-flex u-row-center u-col-center">
				<view class="navli zhuti_color_hong zhuti_border_bottom-1">
					<text>店铺配送</text>
				</view>
			</view> -->
			<view class="u-flex-1 u-flex u-row-center u-col-center">
				<view class="navli zhuti_color_hong zhuti_border_bottom-1">
					<text>平台配送</text>
				</view>
			</view>
		</view>
		<!-- <view class="u-flex u-padding-20 u-bg-white u-row-between">
			<image src="../../static/logo.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
			<view class="u-flex-col u-margin-left-20" style="width: 540rpx;">
				<text class="u-font-24 u-color-balck3">{{list.name}}</text>
				<text class="u-font-24 u-color-balck3 u-margin-top-5">{{list.address}}</text>
				<text class="u-font-24 zhuti_color_hong u-margin-top-5">下单后请到以上店铺地址取货</text>
			</view>
			<view class="u-flex u-margin-left-20" @click="openditu()">
				<i class="icon u-font-36 zhuti_color">&#xe611;</i>
			</view>
		</view>
		<view class="jianju-5"></view> -->
		<view class="u-padding-20 u-bg-white u-flex" style="border-bottom: 1rpx solid #F6F6F6;">
			<view style="width: 130rpx;">
				<text class="u-font-26 u-color-balck3">收货人</text>
			</view>
			<view class="u-flex u-row-left u-col-center" style="width: 480rpx;">
				<input type="text" style="font-size: 24rpx;color: #333333;width: 450rpx;" v-model="name" placeholder="请输入姓名"/>
			</view>
			<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" @click="huoqu()" v-if="isgx==1">
				<text class="u-font-24 zhuti_color">获取</text>
			</view>
		</view>
		<view class="u-padding-20 u-bg-white u-flex" style="border-bottom: 1rpx solid #F6F6F6;">
			<view style="width: 130rpx;">
				<text class="u-font-26 u-color-balck3">联系电话</text>
			</view>
			<view class="u-flex u-row-left u-col-center" style="width: 480rpx;">
				<input type="text" style="font-size: 24rpx;color: #333333;width: 450rpx;" v-model="mobile" placeholder="请输入手机号"/>
			</view>
			<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" @click="huoqu()" v-if="isgx==1">
				<text class="u-font-24 zhuti_color">获取</text>
			</view>
		</view>
		<view class="u-padding-20 u-bg-white u-flex" style="border-bottom: 1rpx solid #F6F6F6;">
			<view style="width: 130rpx;">
				<text class="u-font-26 u-color-balck3">收货地址</text>
			</view>
			<view class="u-flex u-row-left u-col-center" style="width: 480rpx;">
				<input type="text" style="font-size: 24rpx;color: #333333;width: 450rpx;" v-model="address" placeholder="请输入收货地址"/>
			</view>
			<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" @click="huoqu()" v-if="isgx==1">
				<text class="u-font-24 zhuti_color">获取</text>
			</view>
		</view>
		
		
		<view class="msgs u-padding-20 u-bg-white">
			<input type="text" style="font-size: 26rpx;color: #333333;" v-model="message" placeholder="给商家留言"/>
		</view>
		
		<view class="jianju-5"></view>
		<view class="u-padding-20 u-bg-white u-flex" style="border-bottom: 1rpx solid #F0F0F0;">
			<view style="width: 130rpx;">
				<text class="u-font-24 u-color-balck6">付款方式</text>
			</view>
		</view>
		<view class="u-padding-20 u-bg-white u-flex">
			<view style="width: 60rpx;">
				<i class="icon u-font-42 zhuti_color">&#xe617;</i>
			</view>
			<view style="width: 620rpx;">
				<text class="u-font-26 u-color-balck3">微信支付</text>
			</view>
			<view style="width: 40rpx;">
				<i class="icon u-font-36 zhuti_color">&#xe661;</i>
			</view>
		</view>
		<view class="jianju-5"></view>
		<view style="padding: 0 20rpx;background-color: #FFFFFF;">
			<view style="width: 710rpx;display: flex;flex-direction: row;justify-content: space-between;padding: 20rpx 0;border-bottom: 1rpx solid #F6F6F6;">
				<text class="u-color-balck3 u-font-28">订单总额</text>
				<text class="u-color-balck3 u-font-28">￥{{money}}</text>
			</view>
			<!-- <view v-if="cid==0 || huimo==0" class="u-flex u-row-between" style="padding: 20rpx 0;width: 710rpx;" @click="tiao('../marketing/mycoupon?st=2')">
				<text class="u-color-balck3 u-font-28">优惠券</text>
				<view class="u-flex">
					<text class="u-font-28 u-color-balck6">最大可选{{maxmo}}元优惠券</text>
					<text class="icon u-color-balck9 u-margin-left-10">&#xe605;</text>
				</view>
			</view>
			<view v-if="cid>0 && huimo>0" style="width: 710rpx;display: flex;flex-direction: row;justify-content: space-between;padding: 20rpx 0;">
				<text class="u-color-balck3 u-font-28">优惠券</text>
				<text class="zhuti_color_hong">-￥{{huimo}}</text>
			</view> -->
		</view>
		
		<view class="zhanwei"></view>
		<view class="bootvie u-flex u-col-center u-bg-white u-row-between"  v-if="appid">
			<view class="u-flex">
				<view @click="openwxkf()" class="bootli u-flex-col" style="background: none;border: none;height: 80rpx;line-height: 40rpx;outline:none;">
					<i class="icon u-color-balck9 u-font-40 u-margin-top-10">&#xe617;</i>
					<text class="u-font-24 u-color-balck3 u-margin-top-5">客服</text>
				</view>
			</view>
			<div class="bar_btn zhuti_bg u-flex u-row-center u-col-center" @click="addshop()">
				<span class="u-font-32 u-color-white u-font-bold">确认支付￥{{zmo | numFilter}}</span>
			</div>
		</view>
		<view class="bootvie u-flex u-col-center u-bg-white u-row-center"  v-if="!appid">
			<div class="bar_btn2 zhuti_bg u-flex u-row-center u-col-center" @click="addshop()">
				<span class="u-font-32 u-color-white u-font-bold">确认支付￥{{zmo | numFilter}}</span>
			</div>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				no:0,
				huimo:0,//优惠金额
				money:0,
				zmo:0,
				maxmo:0,//最大可优惠金额
				reslist:[],
				list:[],
				longitude:'',
				longitude:'',
				name:'',
				mobile:'',
				message:'',
				token:'',
				kfurl:'',
				appid:'',
				address:'',
				orderdata:'',
				iswx:1,
				cid:0,//优惠券id
				isgx:0
			}
		},
		onLoad(e) {
			uni.removeStorageSync('couponData');
			if(e.id){
				this.id=e.id;
			}
			this.iswx=this.$iswx;
			this.GetToken();
		},
		onShow() {
			//获取优惠券金额和id
			const value = uni.getStorageSync('couponData');
			if (value) {
				this.cid=value.id;
				this.huocoupon();
			}
		},
		methods: {
			huoqu(){
				var _this=this;
				//#ifdef H5
				//微信公众号则需要
				jweixin.openAddress({
					success: function (res) {
						var userName = res.userName; // 收货人姓名
						var postalCode = res.postalCode; // 邮编
						var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
						var cityName = res.cityName; // 国标收货地址第二级地址（市）
						//var countryName = res.countryName; // 国标收货地址第三级地址（国家）
						var detailInfo = res.detailInfo; // 详细收货地址信息
						//var nationalCode = res.nationalCode; // 收货地址国家码
						var telNumber = res.telNumber; // 收货人手机号码
						var address=provinceName+cityName+detailInfo;
						//查询  姓名  手机号  和地址 赋值
						var list=_this.form;
						_this.name=userName;
						_this.mobile=telNumber;
						_this.address=address;
					},
					fail(e){
						console.log(JSON.stringify(e));
					}
				});
				return false;
				//#endif
				
				//#ifdef MP-WEIXIN
				uni.chooseAddress({
				  success(res) {
				    var userName = res.userName; // 收货人姓名
				    var postalCode = res.postalCode; // 邮编
				    var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
				    var cityName = res.cityName; // 国标收货地址第二级地址（市）
				    //var countryName = res.countryName; // 国标收货地址第三级地址（国家）
				    var detailInfo = res.detailInfo; // 详细收货地址信息
				    //var nationalCode = res.nationalCode; // 收货地址国家码
				    var telNumber = res.telNumber; // 收货人手机号码
				    var address=provinceName+cityName+detailInfo;
				    //查询  姓名  手机号  和地址 赋值
				    _this.name=userName;
				    _this.mobile=telNumber;
				    _this.address=address;
				  },
				  fail(e){
				  	console.log(JSON.stringify(e));
				  }
				})
				//#endif
			},
			huocoupon(){
				var _this=this;
				this.$api.huocoupon({'token':this.token,id:this.id,cid:this.cid,money:this.zmo}).then((res)=>{
					if(res.data.code==200){
						_this.huimo=res.data.data.coupon_money;
						this.zmo=parseFloat(this.money)-parseFloat(this.huimo);
					}else{
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
					}
				})
			},
			GetToken(){
				var _this=this;
				//console.log('login');
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
				var orderdata='';
				var value = uni.getStorageSync('cartvalue');
				if(value){
					this.reslist=value;
					var money=0;
					for(var i=0;i<value.length;i++){
						orderdata+=value[i].id+'-'+value[i].no;
						if(i<value.length-1){
							orderdata+='_';
						}
						money+=value[i].money*value[i].no;
					}
					this.money=money;
					this.zmo=money;
				}
				this.orderdata=orderdata;
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
			getData(){
				var _this=this;
				this.$api.shoporder({id:this.id,token:this.token}).then((res)=>{
					//_this.list=res.data.data.list;
					//_this.latitude=res.data.data.list.latitude;
					//_this.longitude=res.data.data.list.longitude;
					_this.name=res.data.data.name;
					_this.mobile=res.data.data.mobile;
					_this.appid=res.data.data.appid;
					_this.kfurl=res.data.data.kfurl;
					_this.isgx=res.data.data.isgx;
				})
			},
			addshop(){
				var _this=this;
				if(!this.name){
					uni.showToast({
						title:'收货人姓名不能为空',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				if(!this.mobile){
					uni.showToast({
						title:'收货人联系方式不能为空',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				if(!this.address){
					uni.showToast({
						title:'收货人地址不能为空',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				this.$api.addshop({id:this.id,name:this.name,mobile:this.mobile,message:this.message,
				cid:this.cid,
				address:this.address,token:this.token,orderdata:this.orderdata}).then((res)=>{
					if(res.data.code==200){
						var id=res.data.data.id;
						_this.getpay(id);
					}else{
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
					}
				})
			},
			getpay(id){
				//#ifdef H5
				if(this.iswx==2){
					this.onBridgeReady(id);
				}else{
					uni.showToast({
						title:'请在微信打开',
						icon:"none",
						duration: 2000
					});
					return false;
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
						st:3,
						token:_this.token
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
								setTimeout(() => {
									uni.navigateTo({
										url:'payok?id='+id
									})
								},1000)
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
									url:'./payok?id='+id+'&money='+_this.money
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
			tiao(url){
				uni.navigateTo({
					url:url
				})
			},
			openditu(){
				var latitude=parseFloat(this.latitude);
				var longitude=parseFloat(this.longitude);
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function () {
						console.log('success');
					},
					fail(e) {
						console.log(JSON.stringify(e));
					}
				});
			},
			tindex(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		},
		filters: {
		  numFilter (value) {
		    // 截取当前数据到小数点后两位
		    if(value){
				let realVal = parseFloat(value).toFixed(2)
				return realVal
			}
		  }
		}
	}
</script>

<style>
	page{
		background-color: #F6F6F6;
	}
	uni-button:after{
		border: none!important;
	}
	.bar_btn{
		width: 600rpx;
		height: 90rpx;
	}
	.bar_btn2{
		width: 750rpx;
		height: 90rpx;
	}
	.bootli{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150rpx;
	}
	.bootvie{
		width: 750rpx;
		height: 90rpx;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 9;
		border-top: 1rpx solid #F0F0F0;
	}
	.zhanwei{
		width: 750rpx;
		height: 100rpx;
	}
	.navli{
		width: 200rpx;
		height: 90rpx;
		color: #333333;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.jianju-5{
		width: 750rpx;
		height: 16rpx;
		background-color: #F6F6F6;
	}
	.navs{
		height: 90rpx;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #F0F0F0;
	}
</style>
