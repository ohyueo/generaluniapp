<template>
	<view class="content">
		
		
	
			<view class="u-flex class_list" v-if="classlist && classlist.length>0">
				<view class="class_left">
					<scroll-view scroll-y="true" class="scroll-Y">
					<view v-for="(item,index) in classlist" :key="index" :class="navtop==index?'u-bg-white':''" class="left_li u-flex u-row-center u-col-center" @click="setnavtop(index,item.id)">
						<view class="xiaoli zhuti_bg" v-if="navtop==index"></view>
						<text class="u-font-26 u-color-balck u-margin-left-20 u-font-dan-sheng" style="width: 200rpx;">{{item.title}}</text>
					</view>
					<view style="height: 200rpx;"></view>
					</scroll-view>
				</view>
				<view style="width: 200rpx;"></view>
				<view class="class_right">
					<view class="class_rightli u-flex u-col-center" v-for="(item,index) in list" :key="index"  @click="tiaoinfo(item.id,item.opst)">
						<view class="u-flex u-padding-20">
							<image :src="item.img" style="width: 150rpx;height: 100rpx;" mode=""></image>
							<view class="u-flex-col u-margin-left-10" style="width: 350rpx;">
								<text class="u-font-26 u-color-balck3 u-margin-top-5">{{item.title}}</text>
								<text class="u-font-24 zhuti_color u-margin-top-10" style="color: #19be6b;">{{item.recommended?item.recommended:item.address}}</text>
								<view class="u-flex u-col-center u-row-between u-margin-top-5">
									<text class="u-font-24 u-color-balck6">预约:{{item.bao}}人</text>
									<view class="u-flex yuebtn u-row-center u-col-center">
										<text class="u-font-26 u-color-white">预约</text>
									</view>
									<!-- <view class="u-flex u-row-center u-col-center u-rela">
										<text class="u-font-24 u-color-white u-abso" style="z-index: 2;margin-top: -4rpx;">咨询</text>
										<image src="../../static/img/yuyue/btn.png" style="width: 120rpx;height: 80rpx;" mode=""></image>
									</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="u-flex-col gxcent" v-if="!classlist || classlist.length<1">
				<view v-for="(item,index) in list" :key="index" class="u-padding-20 u-margin-top-20 u-border-ra20 u-bg-white u-flex border-bootom-1" @click="tiaoinfo(item.id,item.opst)">
					<image :src="item.img" style="width: 200rpx;height: 140rpx;border-radius: 20rpx;" mode=""></image>
					<view class="u-flex-col u-margin-left-20 clix u-row-between">
						<view class="u-flex u-row-between">
							<text class="u-font-28 u-color-balck3">{{item.title}}</text>
							<view class="u-flex" v-if="item.val!=0">
								<i class="icon u-color-balck9 u-font-26">&#xe640;</i>
								<text class="u-font-26 u-color-balck9 u-margin-left-10">{{item.val}}</text>
							</view>
						</view>
						<view class="u-flex u-row-between" v-if="item.recommended">
							<text class="u-font-24 zhuti_color" style="color: #19be6b;">{{item.recommended}}</text>
							<view class="lxbtn">
								<text class="u-font-24 zhuti_color" style="color: #19be6b;">立即预约</text>
							</view>
						</view>
						<text class="u-font-24 u-color-balck6 u-margin-top-10">{{item.address}}</text>
						<view class="u-flex u-row-between" v-if="!item.recommended">
							<text class="u-font-24 zhuti_color" style="color: #19be6b;">电话:{{item.mobile}}</text>
							<view class="lxbtn">
								<text class="u-font-24 zhuti_color" style="color: #19be6b;">立即预约</text>
							</view>
						</view>
					</view>
				</view>
			</view>
	
		
	</view>
</template>

<script>
	//#ifdef H5
	var jweixin = require('@/components/jweixin-module/index.js');
	//#endif
	export default {
		data() {
			return {
				name:'',
				mobile:'',
				title: 'Hello',
				lunbo:[],
				kuai:[],
				token:'',
				list:[],
				textlist:[],
				classlist:[],
				noti:[],
				guang:[],
				classr:[],
				navtop:0,
				status: 'loadmore',
				page:1,
				count: 10,
				res_count:0,
				wxcode:'',
				appid:'',
				kfurl:'',
				iswx:1,
				uuid:'',
				index:0,
				sharedata:[],
				stores:[],
				identity:[],
				fenxiang:{
					path:'/pages/index/index'
				},
				longitude:'',
				latitude:''
			}
		},
		onLoad(option) {
			//推广者  绑定上级id
			if (option.scene) {
				var scene = decodeURIComponent(option.scene);
				var scene = scene.split("&");
				if(scene){
					var data=scene[0];
					var va=data.split("=");
					if(va){
						var uid=va[1];//推荐人id
						//缓存师傅id
						uni.setStorage({
							key: 'invitation',
							data: {
								'uid' :uid
							}
						});
					}
				}
			}
			if(option.uid){
				var uid=option.uid;
				console.log(uid);
				//缓存师傅id
				uni.setStorage({
					key: 'invitation',
					data: {
						'uid' :uid
					}
				});
			}
			
			//#ifdef H5
			//微信公众号登录
			let href = window.location.href;
			if (href.includes("cn/?code")) {  //url包括 com/?code 证明为从微信跳转回来的
				var url = href.substring(0, href.length - 2); //vue自动在末尾加了 #/ 符号，截取去掉
				var jingPosit = url.indexOf("cn/") + 3; //获取域名结束的位置
				var urlLeft = url.substring(0, jingPosit);//url左侧部分
				var urlRight = url.substring(jingPosit, url.length); //url右侧部分
				var url=urlLeft + "#/" + urlRight;
				window.location = url;//拼接跳转
				console.log(url);return false;
			}
			if (href.includes("com/?code")) {  //url包括 com/?code 证明为从微信跳转回来的
				var url = href.substring(0, href.length - 2); //vue自动在末尾加了 #/ 符号，截取去掉
				var jingPosit = url.indexOf("com/") + 4; //获取域名结束的位置
				var urlLeft = url.substring(0, jingPosit);//url左侧部分
				var urlRight = url.substring(jingPosit, url.length); //url右侧部分
				var url=urlLeft + "#/" + urlRight;
				window.location = url;//拼接跳转
				console.log(url);return false;
			}
			if (href.includes("net/?code")) {  //url包括 net/?code 证明为从微信跳转回来的
				var url = href.substring(0, href.length - 2); //vue自动在末尾加了 #/ 符号，截取去掉
				var jingPosit = url.indexOf("net/") + 4; //获取域名结束的位置
				var urlLeft = url.substring(0, jingPosit);//url左侧部分
				var urlRight = url.substring(jingPosit, url.length); //url右侧部分
				var url=urlLeft + "#/" + urlRight;
				window.location = url;//拼接跳转
				console.log(url);return false;
			}
			if(option.code){
				this.wxcode = option.code;
				this.getopenid();
				return false;
			}
			//end
			//#endif
			
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
						that.wx_sanCode(wxData)
					}
				})
			}
			//#endif
			
			this.getData();
			this.getData2();
			this.iswx=this.$iswx;//1网页 2微信
			this.GetToken();
			
		},
		onPullDownRefresh() {
			this.list=[];
			this.page=1;
			this.status='loadmore';
			this.getData();
			setTimeout(function () {
			    uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			wxParseImgLoad(e) {
				console.log(e);
			},
			//扫码
			//#ifdef H5
			wx_sanCode: function(wxData) {
				var _this=this;
				console.log(wxData.appId);
				jweixin.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: wxData.appId, // 必填，公众号的唯一标识
					timestamp: wxData.timestamp, // 必填，生成签名的时间戳
					nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
					signature: wxData.signature, // 必填，签名
					jsApiList: [
						"checkJsApi",
						"updateAppMessageShareData",
						"updateTimelineShareData",
						"openLocation"
					], // 必填，需要使用的JS接口列表
				})
				var apiUrl = window.location.href;
				console.log(apiUrl);
				jweixin.ready(()=> {
					jweixin.updateAppMessageShareData({
						title:_this.sharedata.title, // 分享标题
						desc: _this.sharedata.desc, // 分享描述
						link: apiUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl:_this.sharedata.imgUrl, // 分享图标									
						success:function(data){
						  // 设置成功
							console.log('updateAppMessageShareData success:', data);
						},
						fail: function(error) {
							console.log('updateAppMessageShareData error:', error);
						}
					});
					jweixin.updateTimelineShareData({
						title: _this.sharedata.title, // 分享标题
						desc: _this.sharedata.desc, // 分享描述
						link: apiUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: _this.sharedata.imgUrl, // 分享图标
					})
					jweixin.getLocation({
						success: function (res) {
							var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
							var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
							_this.latitude=latitude;
							_this.longitude=longitude;
							_this.getjuli();
						},
						cancel: function (res) {
							console.log('用户拒绝授权获取地理位置');
						}
					});
				});
				jweixin.error(function(res){
				  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				console.log(res,'接口验证失败')
				});
			},
			//#endif
			bindPickerChange: function(e) {
				this.index = e.detail.value
			},
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			botel(tel){
				uni.makePhoneCall({
				    phoneNumber: tel
				});
			},
			openditu(){
				//#ifdef H5 || MP-WEIXIN
				if(this.iswx==2){
					var latitude=parseFloat(this.stores.lat);
					var longitude=parseFloat(this.stores.lng);
					var company=this.stores.title;
					var address=this.stores.address;
					//微信公众号则需要
					jweixin.openLocation({
						latitude: latitude,//目的地latitude
						longitude: longitude,//目的地longitude
						name: company,
						address: address,
						scale: 15//地图缩放大小，可根据情况具体调整
					});
					return false;
				}
				var latitude=parseFloat(this.stores.lat);
				var longitude=parseFloat(this.stores.lng);
				var company=this.stores.title;
				var address=this.stores.address;
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					address: address,
					name: company
				});
				//#endif
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
			//#ifndef H5
			GetToken(){
				var _this=this;
				uni.getStorage({
				    key: 'userData',
					success:function (res) {
						_this.token=res.data.vuex_token;
						_this.uid=res.data.vuex_user.id;
						_this.fenxiang.path='/pages/index/index?uid='+_this.uid;
					}
				});
				//获取地理位置  小程序不让用
				// uni.getLocation({
				// 	type: 'wgs84',
				// 	success: function (res) {
				// 		if(res.longitude){
				// 			_this.longitude=res.longitude;
				// 		}
				// 		if(res.latitude){
				// 			_this.latitude=res.latitude;
				// 		}
				// 		_this.getjuli();
				// 		console.log('当前位置的经度：' + res.longitude);
				// 		console.log('当前位置的纬度：' + res.latitude);
				// 	}
				// });
			},
			//#endif
			//#ifdef H5
			GetToken(){
				var _this=this;
				uni.getStorage({
				    key: 'userData',
					success:function (res) {
						_this.token=res.data.vuex_token;
						_this.uid=res.data.vuex_user.id;
						_this.fenxiang.path='/pages/index/index?uid='+_this.uid;
						uni.getLocation({
							type: 'wgs84',
							success: function (res) {
								if(res.longitude){
									_this.longitude=res.longitude;
								}
								if(res.latitude){
									_this.latitude=res.latitude;
								}
								_this.getjuli();
								console.log('当前位置的经度：' + res.longitude);
								console.log('当前位置的纬度：' + res.latitude);
							}
						});
					},
					fail() {
						if(_this.iswx==2){
							_this.getUserInfo();
						}
					}
				});
			},
			// 点击授权方法
			getUserInfo() {
				if(this.$wxurl){
					var xurl=this.$wxurl+'?type=2';
				}else{
					var xurl=this.$puburl;
				}
				var url=encodeURI('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$wxappid+'&redirect_uri='+xurl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
				window.location.href = url;
				if(this.code){
					//将onLoad中的获取token方法放进来即可
				} else {
					//没有code就去获取code
				}
			},
			getopenid(){
				var _this=this;
				if(this.wxcode){
					uni.showLoading({
						title: '登录中...'
					});
					var uid=0;
					//获取师傅id
					const value = uni.getStorageSync('invitation');
					if (value) {
						if(value.uid){
							uid=value.uid;
						}
					}
					uni.request({
						url: _this.$puburl+'resource/wxh5register',
					    data: {
					        code: this.wxcode,
							uid:uid
					    },
					    method: 'GET',
					    header: {
					        'content-type': 'application/json'
					    },
					    success: (res) => {
							console.log(JSON.stringify(res));
							if(res.data.code==1){
								_this.token=res.data.data.token;
								var token=res.data.data.token;
								var userlist=res.data.data.userlist;
								//console.log('uu==='+userlist);
								//登录成功  跳转到首页
								uni.setStorage({
									key: 'userData',
									data: {
										'vuex_token' :token,
										'vuex_user' : userlist
									},
									success: function () {
										console.log('success');
									}
								});
								window.location = _this.$puburl;//跳转
								//_this.getData();
								//_this.wxGetUserInfo(); //需要手动确认
							}else{
								uni.showToast({
									title: res.data.message,
									icon:"none",
									duration: 2000
								});
							}
					        //openId、或SessionKdy存储//隐藏loading
					        uni.hideLoading();
					    },fail(e) {
							console.log(e);
					    	uni.hideLoading();
					    }
					});
				} else {
					uni.showToast({
						icon:'none',
						title:'请先登录'
					})
					//没有code在走一次流程去获取code
				}
			},
			//#endif
			getData(){
				console.log('xxxx');
				this.$api.indeximg().then((res)=>{
					this.lunbo=res.data.data.lunbo;
					this.kuai=res.data.data.kuai;
					//this.list=res.data.data.list;
					this.textlist=res.data.data.textlist;
					this.noti=res.data.data.noti;
					this.guang=res.data.data.guang;
					this.appid=res.data.data.appid;
					this.kfurl=res.data.data.kfurl;
					this.sharedata=res.data.data.sharedata;
					this.stores=res.data.data.stores;
					//this.getjuli();
					if(res.data.data.sharedata && res.data.data.sharedata.title){
						uni.setNavigationBarTitle({
						    title: res.data.data.sharedata.title
						});
					}
				})
			},
			getData2(){
				this.$api.yuelist({id:this.classid,st:this.st}).then((res)=>{
					this.list=res.data.data.list;
					this.classlist=res.data.data.classlist;
					this.getjuli();
				})
			},
			getjuli(){
				var _this=this;
				var lat=this.latitude;//30.131540754516642
				var lng=this.longitude;//104.09644683593751
				if(lat && lng){
					var list=this.list;
					var from='';
					for(var i=0;i<list.length;i++){
						from+=list[i].lat+','+list[i].lng;
						if(i<list.length-1){
							from+=';';
						}
					}
					this.$api.mapdistance({
						latitude:lat,longitude:lng,from:from
					}).then((res)=>{
						if(res.data.code==200){
							var va=res.data.data;
							if(va){
								for(var i=0;i<va.length;i++){
									var distance=va[i].distance;
									if(distance<500){
										distance='<500m';
									}else if(distance>1000){
										distance=distance/1000;
										distance=distance.toFixed(2);
										distance=distance+'km';
									}
									_this.list[i].val=distance;
								}
							}
						}
					})
				}
			},
			tiao(url){
				uni.navigateTo({
					url:url
				})
			},
			tiaoinfo(id,opst){
				const value = uni.getStorageSync('userData');
				if (!value) {
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return false;
				}
				if(opst==1){
					this.tiao('../yuyue/info?id='+id);
				}else if(opst==2){
					this.tiao('../yuyue/time?id='+id);
				}else if(opst==3){
					this.tiao('../yuyue/order?id='+id);
				}else if(opst==4){
					this.tiao('../yuyue/seat?id='+id);
				}else if(opst==5){
					this.tiao('../yuyue/person?id='+id);
				}
			},
			setnavtop(ind,id){
				this.navtop=ind;
				this.classid=id;
				this.list=[];
				this.classlist=[];
				this.getData2();
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
	
	.yuebtn{
		width: 90rpx;
		height: 42rpx;
		background: #13DCB2;
		border-radius: 20rpx;
	}
	.gxcent{
		width: 710rpx;
	}
	.lxbtn{
		width: 140rpx;
		height: 48rpx;
		border: 1rpx solid #19be6b;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
	}
	.clix{
		width: 490rpx;
		height: 130rpx;
	}
	
	/**第二种方式end**/
	.class_list{
		
	}
	.scroll-Y{
		width: 200rpx;
		white-space: nowrap;
		height: 100%;
	}
	.class_left{
		width: 200rpx;
		position: fixed;
		top: var(--window-top);
		height: 100%;
		background-color: #F6F6F6;
		z-index: 3;
	}
	.left_li{
		height: 80rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid #F6F6F6;
	}
	.xiaoli{
		width: 6rpx;
		height: 60rpx;
	}
	.class_right{
		width: 550rpx;
		height: 100%;
	}
	.class_rightli{
		width: 570rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #F6F6F6;
	}
	
	
	.kefuvie{
		position:fixed;
		right:40rpx;
		bottom:200rpx;
		width:78rpx;
		height:78rpx;background:#ffffff;
		border-radius:40rpx;z-index:9;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.faguang{
	    box-shadow: 0px 0px 16rpx #cccccc;
	    border-radius: 40rpx;
	}
	.putx{
		width: 500rpx;
		height: 70rpx;
		background-color: #F0F0F0;
		margin-bottom: 15rpx;
		margin-top: 8rpx;
		text-indent: 20rpx;
		font-size: 28rpx;
	}
	.popbox{
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.clix{
		width: 490rpx;
		height: 130rpx;
	}
	.lxbtn{
		width: 140rpx;
		height: 48rpx;
		border: 1rpx solid #19be6b;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
	}
	.gxcent{
		width: 710rpx;
	}
	.xiaoli{
		width: 8rpx;
		height: 36rpx;
	}
	.noticent{
		width: 620rpx;
		height: 40rpx;
	}
	.notilist{
		width: 710rpx;
		background-color: #FFFFFF;
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
		width: 710rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.swiimg{
		width: 710rpx;
		height: 300rpx;
	}
	
	
</style>
