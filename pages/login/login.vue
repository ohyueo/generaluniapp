<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<view class="top"></view>
		<view class="content" v-if="iswx==1">
			<view class="title">欢迎登录</view>
			<view class="u-flex u-row-between u-col-center">
				<input class="u-border-bottom" style="width:430rpx;font-size: 28rpx;" type="number" v-model="tel" placeholder="请输入手机号" />
				<view class="" @tap="submit">
					<text :class="status?'u-color-balck3':'u-color-balck6'">{{sendtit}}</text>
				</view>
			</view>
			<view class="tips">未注册的手机号验证后自动创建账号</view>
			<input class="u-border-bottom" type="number" v-model="code" placeholder="请输入验证码" style="margin-bottom: 30rpx;font-size: 28rpx;"/>
			<button :style="[inputStyle]" class="getCaptcha" @click="regbtn">立即登录</button>
			<view class="alternative" v-if="1==2">
				<view class="password">密码登录</view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
		<view class="content" v-if="iswx==2">
			<view class="title">欢迎登录</view>
		</view>
		<view class="buttom u-margin-top-20">
			<view class="loginType u-flex u-row-center u-col-center">
				
				<view class="wechat item" @click="loginwx" v-if="iswx==2">
					<i class="icon u-color-balck6" style="color: #53C240;font-size: 68rpx;">&#xe617;</i>
					<text class="u-margin-top-10" style="color: #53C240;">微信登录</text>
				</view>
				<!-- <view class="QQ item">
					<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
					QQ
				</view> -->
			</view>
			<view class="hint">
				登录代表同意
				<text class="link" @click="tiao('../texter/text_xieyi?id=1')">用户协议、</text>
				<text class="link" @click="tiao('../texter/text_xieyi?id=2')">隐私政策，</text>
				并授权使用您的账号信息（如昵称、头像）以便您统一管理
			</view>
		</view>
		<!--#endif-->
		<!-- #ifdef MP-WEIXIN -->
		<block v-if="isCanUse">
			<view v-if="yz==1">
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的手机号信息</text>
				</view>
				<button class='bottom' open-type="getPhoneNumber" v-if="yz==1" @getphonenumber="onGetPhoneNumber">获取手机号</button>  
			</view>
			<view v-if="yz==2">
				<form @submit="formSubmit">
				<view class='content' v-if="yz==2">
					<view>请完善个人信息</view>
					<text>填写个人信息(昵称，头像等)</text>
				</view>
				<view class="u-flex-col u-col-center u-row-center">
					<input type="nickname" class="u-border-bottom-1" name="nick" placeholder="请输入用户昵称" style="width:600rpx;font-size: 28rpx;height:70rpx;"/>
				</view>
				
				<view class="header u-flex-col u-row-center u-col-center">
					<text class="u-font-26 u-color-balck9">点击上传头像</text>
					<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" style="background-color: #ffffff;border: none;outline: none;margin-top: 20rpx;">
						<image :src="avatarUrl" style="border-radius: 50%;"></image>
					</button> 
				</view>
					
				<button class='bottom' v-if="yz==2" form-type='submit'>
					提交信息
				</button>
				</form>
			</view>
		</block>
		<!-- #endif -->
	</view>
</template>

<script>
//var jweixin = require('@/components/jweixin-module/index.js');
const defaultAvatarUrl = '/static/img/user/mo.png'
export default {
	data() {
		return {
			yz:2, //1获取手机号  2登录
			tel: '',
			sendtit:'发送验证码',
			code:'',
			time1:false,
			second:60,
			status:true,
			isCanUse: false,//默认为true
			wxcode:'',
			token:'',
			encryptedData:'',
			iswx:1,//1网页  2微信
			avatarUrl:defaultAvatarUrl,//头像
			img:''
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.tel && this.code) {
				style.color = "#fff";
				style.backgroundColor = '#fa3534';
			}
			return style; 
		}
	},
	onLoad(option) {
		
		//#ifdef H5
		let href = window.location.href;
		if (href.includes("cn/?code")) {  //url包括 cn/?code 证明为从微信跳转回来的
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
		if (href.includes("vip/?code")) {  //url包括 com/?code 证明为从微信跳转回来的
			var url = href.substring(0, href.length - 2); //vue自动在末尾加了 #/ 符号，截取去掉
			var jingPosit = url.indexOf("vip/") + 4; //获取域名结束的位置
			var urlLeft = url.substring(0, jingPosit);//url左侧部分
			var urlRight = url.substring(jingPosit, url.length); //url右侧部分
			var url=urlLeft + "#/" + urlRight;
			window.location = url;//拼接跳转
			console.log(url);return false;
		}
		if (href.includes("cloud/?code")) {  //url包括 com/?code 证明为从微信跳转回来的
			var url = href.substring(0, href.length - 2); //vue自动在末尾加了 #/ 符号，截取去掉
			var jingPosit = url.indexOf("cloud/") + 6; //获取域名结束的位置
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
		this.iswx=this.$iswx;
		this.GetToken();
		//#endif
		//#ifdef MP-WEIXIN
		this.login();
		//#endif
		console.log(option);
	},
	onUnload() {
		clearInterval(this.time1);
	},
	methods: {
		onGetPhoneNumber(e) {
			var iv=e.detail.iv;
			var encryptedData=e.detail.encryptedData;
			let _this = this;
			uni.request({
			    url:_this.$puburl+'resource/getphone',//服务器端地址
			    data: {
			        encryptedData:encryptedData,
			        iv: iv,
					token:_this.token
			    },
			    method: 'POST',
			    header: {
			        'content-type': 'application/json'
			    },
			    success: (res) => {
			        if (res.data.code == "200") {
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
						setTimeout(() => {
							// 此为uView的方法，详见路由相关文档
							uni.reLaunch({//信息更新成功后跳转到小程序首页
								url: '/pages/index/index'
							});
						},300)
					}else{
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
					}
			    }
			});
		},
		formSubmit(e){
			var va=e.detail.value;
			var nick=va.nick;
			var img=this.img;
			this.updateUserInfo(nick,img);
		},
		onChooseAvatar(e) {
			const { avatarUrl } = e.detail;
			this.avatarUrl=avatarUrl;
			this.upload(avatarUrl);
		},
		upload(path){
			var th=this;
			uni.uploadFile({
				url: th.$puburl+'resource/img_upload', //仅为示例，非真实的接口地址
				filePath: path,
				name: 'file',
				fileType:"image",
				formData: {
					token: th.token,
					type:1
				}, 
				success: (res) => {
					var res = JSON.parse(res.data);
					console.log(res.code);
					if(res.code==200){
						th.img=res.img;
					}else{
						uni.showToast({
						    title: res.message,
							icon:'none',
						    duration: 2000
						});
					}
				}
			});
		},
		GetToken(){
			var _this=this;
			uni.getStorage({
			    key: 'userData',
				success:function (res) {
					_this.token=res.data.vuex_token;
				},
				fail() {
					if(_this.iswx==2){
						_this.getUserInfo();
					}
				}
			});
		},
		loginwx(){
			//#ifdef H5
			this.getUserInfo();
			//#endif
			//#ifdef MP-WEIXIN
			this.wxGetUserInfo();
			//#endif
		},
		//第一授权获取用户信息===》按钮触发
		wxGetUserInfo() {
			let _this = this;
				console.log('xxxx');
				uni.getUserProfile({
					desc: '获取用户信息用于登录',
					lang:'zh_CN',
					success: function(infoRes) {
						_this.encryptedData = infoRes.encryptedData; 
						_this.iv = infoRes.iv;
					console.log(JSON.stringify(infoRes));
		            uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
		            _this.updateUserInfo();
		           },
		           fail(res) {
						console.log(JSON.stringify(res));
					}
		       });
			},　　　　　　//登录
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				var merid=this.$merid;
				// 1.wx获取登录用户code
		       uni.login({
		           provider: 'weixin',
		           success: function(loginRes) {
						console.log(loginRes);
		               let code = loginRes.code;
		    //            if (!_this.isCanUse) {
		    //                //非第一次授权获取用户信息
		    //                uni.getUserProfile({
		    //                    desc: '获取用户信息用于登录',
		    //                    lang:'zh_CN',
		    //                    success: function(infoRes) { 　　　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
		    //                       console.log(JSON.stringify(infoRes));
						// 				_this.encryptedData = infoRes.encryptedData;
						// 				_this.iv = infoRes.iv;
						// 				_this.updateUserInfo();//调用更新信息方法
		    //                    }
						// 	});
						// }	
						var uid=0;
						//获取师傅id
						const value = uni.getStorageSync('invitation');
						if (value) {
							if(value.uid){
								uid=value.uid;
							}
						}
		               //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
		               uni.request({
							url: _this.$puburl+'resource/wxregister',
		                   data: {
		                       code: code,
							   merid:merid,
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
									_this.isCanUse=true;
									//_this.wxGetUserInfo(); //需要手动确认
								}else if(res.data.code==2){ //获取登录手机号
									_this.token=res.data.data.token;
									_this.isCanUse=true;
									_this.yz=1;
								}else if (res.data.code == "200") {
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
									setTimeout(() => {
										// 此为uView的方法，详见路由相关文档
										uni.reLaunch({//信息更新成功后跳转到小程序首页
											url: '/pages/index/index'
										});
									},300)
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
		           },
		       });
		   },
		//向后台更新信息
	   updateUserInfo(nick,img) {
		   let _this = this;
		   uni.request({
			   url:_this.$puburl+'resource/getuserinfo',//服务器端地址
			   data: {
				   nick: nick,
				   img: _this.img,
				  token:_this.token
			   },
			   method: 'POST',
			   header: {
				   'content-type': 'application/json'
			   },
			   success: (res) => {
				   if (res.data.code == "200") {
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
						setTimeout(() => {
							// 此为uView的方法，详见路由相关文档
							uni.reLaunch({//信息更新成功后跳转到小程序首页
								url: '/pages/index/index'
							});
						},300)
				   }else if(res.data.code == 2){
					   _this.token=res.data.data.token;
					   _this.isCanUse=true;
					   _this.yz=1;
				   }else{
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
					}
			   }
			  
		   });
	   },
		wxh5login(){
			jweixin.ready(function(){  
			    // TODO  
				
			});
		},
		// 点击授权方法
		getUserInfo() {
			if(this.$wxurl){
				var xurl=this.$wxurl+'?type=3&merid='+this.$merid;
				xurl=encodeURI(xurl);
			}else{
				var xurl=this.$puburl+'?merid='+this.$merid;
				xurl=encodeURI(xurl);
			}
			window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$wxappid+'&redirect_uri='+xurl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
			console.log(this.code);
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
					url: _this.$puburl+'resource/wxregister',
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
		tiao(url){
			uni.navigateTo({
				url:url
			})
		},
		appLoginWx(){
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    console.log(loginRes);
			  }
			});
			
		},
		codest(){
			var _this=this;
			this.sendtit='倒计时60s';
			this.time1 = setInterval(() => {
				let times = --_this.second;
				_this.sendtit='倒计时'+times+'s';
				console.log(times);
				if(times<1){
					clearInterval(_this.time1);
					_this.status=true;
					_this.sendtit='发送验证码';
				}
			}, 1000)
		},
		regbtn(){
			var _this=this;
			if(!this.tel){
				uni.showToast({
				    title: '请输入手机号',
					icon:'none',
				    duration: 2000
				});
				return false;
			}
			if(!this.code){
				uni.showToast({
				    title: '请输入验证码',
					icon:'none',
				    duration: 2000
				});
				return false;
			}
			var uid=0;
			//获取师傅id
			const value = uni.getStorageSync('invitation');
			if (value) {
				if(value.uid){
					uid=value.uid;
				}
			}
			this.$api.phonelogin({mobile:this.tel,code:this.code,uid:uid}).then(res => {
				if(res.data.code==200){
					uni.showToast({
					    title: res.data.message,
						icon:'none',
					    duration: 2000
					});
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
					setTimeout(() => {
						// 此为uView的方法，详见路由相关文档
						uni.switchTab({
							url: '/pages/index/index',
						});
					},1200)
				}else{
					uni.showToast({
					    title: res.data.message,
						icon:'none',
					    duration: 2000
					});
				}
			})
			
		},
		submit() {
			var _this=this;
			if(!this.status){
				uni.showToast({
				    title: '请不要频繁发送',
					icon:'none',
				    duration: 2000
				});
				return false;
			}
			if(!this.tel){
				uni.showToast({
				    title: '请输入手机号',
					icon:'none',
				    duration: 2000
				});
				return false;
			}
			// 调用getInfo接口
			this.$api.smssend({mobile: this.tel,'type':'login'}).then(res => {
				//console.log(JSON.stringify(res));
				if(res.data.code==200){
					uni.showToast({
					    title: res.data.message,
						icon:'none',
					    duration: 2000
					});
					_this.codest();
					_this.status=false;
				}else{
					uni.showToast({
					    title: res.data.message,
						icon:'none',
					    duration: 2000
					});
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	/**授权样式**/
	/*#ifdef MP-WEIXIN*/
	.u-border-bottom-1{
		border-bottom: 1rpx solid #ccc;
	}
	button::after{
	  border: none;
	}
	.header {
		margin: 20rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
	}
	.header image {
		width: 200rpx;
		height: 200rpx;
	}
	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}
	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}
	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
	/*#endif*/
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: #666666;
			margin-bottom: 30rpx;
			margin-top: 18rpx;
			font-size: 24rpx;
		}
		.getCaptcha {
			background-color: #4486f6;
			color: #FFFFFF;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: #FF7474;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 80rpx 80rpx 80rpx 80rpx;
			justify-content:center;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #FF7474;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 24rpx;
			color: #444444;
			
			.link {
				color: #007AFF;
			}
		}
	}
}
</style>
