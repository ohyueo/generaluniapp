<template>
	<view>
		
		<view v-if="status==2" class="u-flex u-padding-20 u-row-center u-col-center" style="background:#FF9466;">
			<text class="u-font-28 u-color-white">审核拒绝：{{msg}}</text>
		</view>
		
		
		<view class="u-flex u-row-center u-col-center" style="height: 90rpx;background-color: #F2F1F6;" v-if="type==2">
			<view class="u-flex" style="width: 660rpx;">
				<view class="u-flex u-flex-1 u-row-center u-col-center" v-if="type==1">
					<view class="buquan u-flex u-row-center u-col-center" :class="navst==1?'zhuti_bg':'zhuti_bg_hui2'">
						<text class="u-font-26 u-color-white">1</text>
					</view>
					<text class="u-font-26 u-margin-left-10"  :class="navst==1?'u-color-balck3':'u-color-balck9'">个人认证</text>
				</view>
				<view class="buxian" v-if="type==1"></view>
				<view class="u-flex u-flex-1 u-row-center u-col-center">
					<view class="buquan u-flex u-row-center u-col-center"  :class="navst==2?'zhuti_bg':'zhuti_bg_hui2'">
						<text class="u-font-26 u-color-white">1</text>
					</view>
					<text class="u-font-26 u-margin-left-10" :class="navst==2?'u-color-balck3':'u-color-balck9'">从业信息</text>
				</view>
				<view class="buxian"></view>
				<view class="u-flex u-flex-1 u-row-center u-col-center">
					<view class="buquan u-flex u-row-center u-col-center"  :class="navst==3?'zhuti_bg':'zhuti_bg_hui2'">
						<text class="u-font-26 u-color-white">2</text>
					</view>
					<text class="u-font-26 u-margin-left-10" :class="navst==3?'u-color-balck3':'u-color-balck9'">车辆信息</text>
				</view>
			</view>
		</view>
		
		<block v-if="navst==1">
		<view class="u-flex-col">
			<view class="u-flex" style="border-bottom:1px solid #f0f0f0;padding:10px 20px;"  :style="type==1?'border-top:1rpx solid #f0f0f0':''">
				<view style="width:23%;">
					<text class="u-font-28 u-color-balck6">姓名</text>
				</view>
				<view style="width:75%;">
					<input type="text" v-model="name" class="u-font-26" style="width:100%;margin-left:10px;height:60rpx;border:none;" placeholder="请输入姓名"/>
				</view>
			</view>
			<view class="u-flex" style="border-bottom:1px solid #f0f0f0;padding:10px 20px;">
				<view style="width:23%;">
					<text class="u-font-28 u-color-balck6">手机号</text>
				</view>
				<view style="width:75%;">
					<input type="text" v-model="mobile" class="u-font-26" style="width:100%;margin-left:10px;height:60rpx;border:none;" placeholder="请输入手机号"/>
				</view>
			</view>
			<view class="u-flex" style="border-bottom:1px solid #f0f0f0;padding:10px 20px;">
				<view style="width:23%;">
					<text class="u-font-28 u-color-balck6">身份证号</text>
				</view>
				<view style="width:75%;">
					<input type="text" v-model="company" class="u-font-26" style="width:100%;margin-left:10px;height:60rpx;border:none;" placeholder="请输入身份证号"/>
				</view>
			</view>
			
		</view>
		<view class="u-flex-col" style="margin-top: 20rpx;">
			<view class="u-flex u-margin-top-20">
				<text class="u-font-28 u-color-balck6 u-margin-left-30">请拍摄并上传照片</text>
			</view>
			<view class="u-flex u-margin-top-20 u-row-between" style="padding:0 20px;" v-if="status!=1">
				<view @click="uploadimg(2)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga2" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga2" class="u-font-24 u-color-balck3 u-margin-top-20">身份证正面</text>
					<image v-if="imga2" :src="imga2" mode="" style="width:100%;"></image>
				</view>
				<view @click="uploadimg(3)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga3" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga3" class="u-font-24 u-color-balck3 u-margin-top-20">身份证反面</text>
					<image v-if="imga3" :src="imga3" mode="" style="width:100%;"></image>
				</view>
			</view>
			<view class="u-flex u-row-center u-col-center u-margin-top-20">
				<text class="u-font-24 u-color-balck9">请上传身份证正反面图片用于认证审核。</text>
			</view>
		</view>
		</block>
		
		<block v-if="navst==2">
		<view class="u-flex-col" style="margin-top: 20rpx;">
			<view class="u-flex u-margin-top-20">
				<text class="u-font-28 u-color-balck6 u-margin-left-30">驾驶证照片</text>
			</view>
			<view class="u-flex u-margin-top-20 u-row-between" style="padding:0 20px;" v-if="status!=1">
				<view @click="uploadimg(4)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga4" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga4" class="u-font-24 u-color-balck3 u-margin-top-20">驾驶证正面</text>
					<image v-if="imga4" :src="imga4" mode="" style="width:100%;"></image>
				</view>
				<view @click="uploadimg(5)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga5" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga5" class="u-font-24 u-color-balck3 u-margin-top-20">驾驶证副本</text>
					<image v-if="imga5" :src="imga5" mode="" style="width:100%;"></image>
				</view>
			</view>
			<view class="u-flex u-row-center u-col-center u-margin-top-20">
				<text class="u-font-24 u-color-balck9">请上传驾驶证证明和副本用于认证审核。</text>
			</view>
		</view>
		<view class="u-flex-col" style="margin-top: 20rpx;">
			<view class="u-flex u-margin-top-20">
				<text class="u-font-28 u-color-balck6 u-margin-left-30">从业证照片</text>
			</view>
			<view class="u-flex u-margin-top-20 u-row-between" style="padding:0 20px;" v-if="status!=1">
				<view @click="uploadimg(6)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga6" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga6" class="u-font-24 u-color-balck3 u-margin-top-20">从业证</text>
					<image v-if="imga6" :src="imga6" mode="" style="width:100%;"></image>
				</view>
			</view>
			<view class="u-flex u-col-center u-margin-top-20">
				<text class="u-font-24 u-color-balck9 u-margin-left-20">请上传从业资格证用于认证审核。</text>
			</view>
		</view>
		</block>
		
		<block v-if="navst==3">
			<view class="u-flex-col">
				<view class="u-flex" style="border-bottom:1px solid #f0f0f0;padding:10px 20px;">
					<view style="width:23%;">
						<text class="u-font-28 u-color-balck6">车牌号</text>
					</view>
					<view style="width:75%;">
						<input type="text" v-model="carno" class="u-font-26" style="width:100%;margin-left:10px;height:60rpx;border:none;" placeholder="请输入车牌号"/>
					</view>
				</view>
				<view class="u-flex" style="border-bottom:1px solid #f0f0f0;padding:10px 20px;">
					<view style="width:23%;">
						<text class="u-font-28 u-color-balck6">车型</text>
					</view>
					<view style="width:75%;">
						<picker @change="bindPickerChange" :id="index" :value="index" :range="typelist" :range-key="'title'">
							<view class="u-flex">
								<view class="u-font-28 u-color-balck3" v-if="typelist && typelist.length>0 && typelist[index].title">{{typelist[index].title}}</view>
								<text class="icon zhuti_color_hui u-font-28 u-margin-left-20">&#xe605;</text>
							</view>
						</picker>
					</view>
				</view>
				<view class="u-flex" style="border-bottom:1px solid #f0f0f0;padding:10px 20px;">
					<view style="width:23%;">
						<text class="u-font-28 u-color-balck6">车长</text>
					</view>
					<view style="width:75%;">
						<picker @change="bindPickerChange2" :id="index2" :value="index2" :range="carlength" :range-key="'title'">
							<view class="u-flex">
								<view class="u-font-28 u-color-balck3" v-if="carlength && carlength.length>0 && carlength[index2].title">{{carlength[index2].title}}</view>
								<text class="icon zhuti_color_hui u-font-28 u-margin-left-20">&#xe605;</text>
							</view>
						</picker>
					</view>
				</view>
			</view>
		<view class="u-flex-col" style="margin-top: 20rpx;">
			<view class="u-flex u-margin-top-20">
				<text class="u-font-28 u-color-balck6 u-margin-left-30">行驶证</text>
			</view>
			<view class="u-flex u-margin-top-20 u-row-between" style="padding:0 20px;" v-if="status!=1">
				<view @click="uploadimg(7)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga7" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga7" class="u-font-24 u-color-balck3 u-margin-top-20">行驶证正面</text>
					<image v-if="imga7" :src="imga7" mode="" style="width:100%;"></image>
				</view>
				<view @click="uploadimg(8)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga8" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga8" class="u-font-24 u-color-balck3 u-margin-top-20">行驶证背面</text>
					<image v-if="imga8" :src="imga8" mode="" style="width:100%;"></image>
				</view>
			</view>
			<view class="u-flex u-row-center u-col-center u-margin-top-20">
				<text class="u-font-24 u-color-balck9">请上传行驶证正面和背面用于认证审核。</text>
			</view>
		</view>
		<view class="u-flex-col" style="margin-top: 20rpx;">
			<view class="u-flex u-margin-top-20">
				<text class="u-font-28 u-color-balck6 u-margin-left-30">道路运输许可证</text>
			</view>
			<view class="u-flex u-margin-top-20 u-row-between" style="padding:0 20px;" v-if="status!=1">
				<view @click="uploadimg(9)" class="u-padding-10 u-flex-col u-row-center u-col-center" style="width:42%;height:80px;border-radius:10px;background:#F6F6F6;">
					<text v-if="!imga9" class="icon u-color-balck3" style="font-size: 44rpx;">&#xe61e;</text>
					<text v-if="!imga9" class="u-font-24 u-color-balck3 u-margin-top-20">道路运输许可证</text>
					<image v-if="imga9" :src="imga9" mode="" style="width:100%;"></image>
				</view>
			</view>
			<view class="u-flex u-col-center u-margin-top-20">
				<text class="u-font-24 u-color-balck9 u-margin-left-20">请上传道路运输许可证用于认证审核。</text>
			</view>
		</view>
		</block>
		
		
		
		
		<view class="u-flex boobtn u-padding-20" v-if="status!=1">
			<view style="width:710rpx;height:90rpx;border-radius:20rpx;" v-if="type==1 && isbtn && (status==-1 || status==2)" class="zhuti_bg u-flex u-row-center u-col-center" @click="add_order()">
				<text class="u-font-28 u-color-white">提交认证</text>
			</view>
			<view style="width:710rpx;height:90rpx;border-radius:20rpx;background-color: #CCCCCC;" v-if="type==1 && !isbtn && (status==-1 || status==2)" class="u-flex u-row-center u-col-center" @click="add_order()">
				<text class="u-font-28 u-color-white">提交认证</text>
			</view>
			<view v-if="status==0" class="u-flex u-row-center u-col-center" style="width:710rpx;height:90rpx;border-radius:20rpx;background:#CCCCCC;">
				<text class="u-font-28 u-color-white">待审核</text>
			</view>
			<view style="width:710rpx;height:90rpx;border-radius:20rpx;" v-if="type==2 && isbtn && (status==-1 || status==2)" class="zhuti_bg u-flex u-row-center u-col-center" @click="add_order2()">
				<text class="u-font-28 u-color-white" v-if="navst==2">下一步</text>
				<text class="u-font-28 u-color-white" v-if="navst==3">提交认证</text>
			</view>
			<view style="width:710rpx;height:90rpx;border-radius:20rpx;background-color: #CCCCCC;" v-if="type==2 && !isbtn && (status==-1 || status==2)" class="zhuti_bg u-flex u-row-center u-col-center" @click="add_order2()">
				<text class="u-font-28 u-color-white" v-if="navst==2">下一步</text>
				<text class="u-font-28 u-color-white" v-if="navst==3">提交认证</text>
			</view>
		</view>
		<view style="height:130rpx;"></view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isbtn:true,//点击
				token:'',
				authst:1,
				name:'',
				mobile:'',
				company:'',
				comimg:'',//营业执照图片
				quaimg1:'',//许可证1
				quaimg2:'',//许可证2
				quaimg3:'',//许可证3
				imga1:'',
				imga2:'',
				imga3:'',
				imga4:'',
				
				carno:'',
				imga5:'',
				imga6:'',
				imga7:'',
				imga8:'',
				imga9:'',
				img:'',
				img1:'',
				img2:'',
				img3:'',
				img4:'',
				img5:'',
				img6:'',
				
				status:1,
				msg:'',
				carst:1,
				
				navst:1,
				type:2,
				typelist:[],
				carlength:[],
				index:0,
				index2:0,
				cartypeid:0,
				carlengthid:0,
			}
		},
		onLoad(e) {
			if(e.type){
				this.type=e.type;
				this.navst=e.type;
				if(e.type==2){
					uni.setNavigationBarTitle({
					    title: '车主认证'
					});
				}
			}
			//this.GetToken()
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.cartypeid=this.typelist[this.index].id;
			},
			bindPickerChange2: function(e) {
				this.index2 = e.target.value;
				this.carlengthid=this.carlength[this.index2].id;
			},
			carstnav(st){
				this.carst=st;
			},
			proimg(url){
				var cout=1;
				var urls=[url];
				// 预览图片
				uni.previewImage({
					current:cout,
					urls: urls
				});
			},
			setauthx(st){
				if(this.status!=-1){
					return false;
				}
				this.authst=st;
			},
			getData(){
				var _this=this;
				this.$api.getauth({token:this.token,type:this.type}).then((res)=>{
					if(res.data.data){
						_this.status=res.data.data.status;
						_this.authst=res.data.data.isauth;
						_this.msg=res.data.data.msg;
						var resx=res.data.data.res;
						if(_this.type==1){ //实名认证
							_this.name=resx.name;
							_this.mobile=resx.mobile;
							_this.company=resx.company;
							_this.comimg=resx.comimg;
							_this.quaimg1=resx.quaimg1;
							if(resx.img1){
								_this.imga1=resx.img1;
							}
							_this.quaimg2=resx.quaimg2;
							if(resx.img2){
								_this.imga2=resx.img2;
							}
							_this.quaimg3=resx.quaimg3;
							if(resx.img3){
								_this.imga3=resx.img3;
							}
						}else if(_this.type==2){ //车主
							_this.typelist=res.data.data.typelist;
							if(_this.typelist){
								_this.cartypeid=_this.typelist[0].id;
							}
							_this.carlength=res.data.data.carlength;
							if(_this.carlength){
								_this.carlengthid=_this.carlength[0].id;
							}
							_this.carno=resx.carno;
							_this.img1=resx.img1;
							_this.img2=resx.img2;
							_this.img3=resx.img3;
							_this.img4=resx.img4;
							_this.img5=resx.img5;
							_this.img6=resx.img6;
							if(resx.img1x){
								_this.imga4=resx.img1x;
							}
							if(resx.img2x){
								_this.imga5=resx.img2x;
							}
							if(resx.img3x){
								_this.imga6=resx.img3x;
							}
							if(resx.img4x){
								_this.imga7=resx.img4x;
							}
							if(resx.img5x){
								_this.imga8=resx.img5x;
							}
							if(resx.img6x){
								_this.imga9=resx.img6x;
							}
						}
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
					},
					fail() {
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
			add_order(){
				//防止重复点击
				if(!this.isbtn){
					return false;
				}
				this.isbtn=false;
				setTimeout(()=> {
					this.isbtn= true;
				}, 2000);//2秒后可点击
				
				uni.showLoading({
					title: '加载中'
				});
				
				var _this=this;
				this.$api.demandauth({
					name:this.name,
					mobile:this.mobile,
					company:this.company,
					quaimg1:this.quaimg1,
					quaimg2:this.quaimg2,
					token:this.token
				}).then((res)=>{
					uni.hideLoading();
					if(res.data.code==200){
						_this.status=0;
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
						setTimeout(() => {
							_this.getData();
						},1500)
					}else{
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
					}
				})
			},
			add_order2(){
				//如果type=2并且navst也等于2 那么navst=3
				if(this.type==2 && this.navst==2){
					this.navst=3;
					return false;
				}
				//防止重复点击
				if(!this.isbtn){
					return false;
				}
				this.isbtn=false;
				setTimeout(()=> {
					this.isbtn= true;
				}, 2000);//2秒后可点击
				
				uni.showLoading({
					title: '加载中'
				});
				
				var _this=this;
				//第二步车主认证
				this.$api.driverauth({
					carno:this.carno,
					cartype:this.cartypeid,
					carlength:this.carlengthid,
					img1:this.img1,
					img2:this.img2,
					img3:this.img3,
					img4:this.img4,
					img5:this.img5,
					img6:this.img6,
					token:this.token,
				}).then((res)=>{
					uni.hideLoading();
					if(res.data.code==200){
						_this.status=0;
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
						setTimeout(() => {
							_this.getData();
						},1500)
					}else{
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
					}
				})
			},
			uploadimg(st){
				var th = this;
				uni.chooseImage({
					count:1,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有 'original', 'compressed'
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: th.$puburl+'resource/formupload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							fileType:"image",
							formData: {
								token: th.token
							}, 
							success: (res) => {
								var res = JSON.parse(res.data);
								if(res.code==200){
									if(st==1){
										th.comimg=res.img;
										th.imga1=tempFilePaths[0];
									}else if(st==2){
										th.quaimg1=res.img;
										th.imga2=tempFilePaths[0];
									}else if(st==3){
										th.quaimg2=res.img;
										th.imga3=tempFilePaths[0];
									}
									
									else if(st==4){
										th.img1=res.img;
										th.imga4=tempFilePaths[0];
									}else if(st==5){
										th.img2=res.img;
										th.imga5=tempFilePaths[0];
									}else if(st==6){
										th.img3=res.img;
										th.imga6=tempFilePaths[0];
									}else if(st==7){
										th.img4=res.img;
										th.imga7=tempFilePaths[0];
									}else if(st==8){
										th.img5=res.img;
										th.imga8=tempFilePaths[0];
									}else if(st==9){
										th.img6=res.img;
										th.imga9=tempFilePaths[0];
									}
									uni.showToast({
									    title: res.message,
										icon:'none',
									    duration: 2000
									});
								}else{
									uni.showToast({
									    title: res.message,
										icon:'none',
									    duration: 2000
									});
								}
							}
						});
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
	.ufvie{
		height: 80rpx;
		border-radius: 20rpx;
	}
	.boobtn{
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 9;
		background-color: #FFFFFF;
		border-top: 1rpx solid #F0F0F0;
	}
	.buquan{
		width: 40rpx;
		height: 40rpx;
		border-radius: 30rpx;
	}
	.buxian{
		width: 60rpx;
		border: 1rpx dashed #CCCED2;
	}
</style>
