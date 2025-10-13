<template>
	<view style="padding: 0 30rpx;">
		
		<view class="u-flex-col u-bg-white u-margin-top-20" style="border-radius: 20rpx;">
			<!-- <view  class="u-padding-20 u-flex u-col-center" style="border-bottom: 1rpx solid #F4F5F7;">
				<view class="" style="width: 150rpx;">
					<text class="u-font-28 u-color-balck3">姓名</text>
				</view>
				<view class="u-margin-left-20" style="width: 300rpx;">
					<input type="text" class="u-font-28 u-color-balck3" placeholder="请输入您的姓名"/>
				</view>
				<view class="" style="width: 150rpx;">
					
				</view>
			</view> -->
			<view v-for="(item,index) in form" :key="index" >
				
				<!--文本框-->
				<view class="u-flex-col border-bootom" style="padding: 0 20rpx;">
					<view class="u-flex border-bottom-1" style="padding: 30rpx 0;" v-if="item.type==1">
						<view class="u-flex u-row-left u-col-center" style="width: 160rpx;">
							<text class="u-font-26 u-color-balck">{{item.name}}</text>
							<text class="u-font-24 zhuti_color_hong u-margin-left-5" v-if="item.mandatory==1">*</text>
						</view>
						<view class="u-flex u-row-left u-col-center u-margin-left-20" style="width: 410rpx;">
							<input type="text" v-model="item.value" :placeholder="item.title" class="u-font-26" style="width: 440rpx;"/>
						</view>
						<!--#ifdef H5-->
						<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" v-if="iswx==1">
							<text class="icon zhuti_color_hui u-font-32" v-if="item.value" @click="item.value=''">&#xe66f;</text>
						</view>
						<block v-if="iswx==2">
							<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" v-if="isgx==0">
								<text class="icon zhuti_color_hui u-font-32" v-if="item.value" @click="item.value=''">&#xe66f;</text>
							</view>
							<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" v-if="isgx==1" @click="huoqu()">
								<text class="u-font-24 zhuti_color">获取</text>
							</view>
						</block>
						<!--#endif-->
						
						<!--#ifndef H5-->
						<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" v-if="isgx==0">
							<text class="icon zhuti_color_hui u-font-32" v-if="item.value" @click="item.value=''">&#xe66f;</text>
						</view>
						<view class="u-flex u-row-right u-col-center" style="width: 100rpx;" v-if="isgx==1" @click="huoqu()">
							<text class="u-font-24 zhuti_color">获取</text>
						</view>
						<!--#endif-->
					</view>
				</view>
				<!--文本域-->
				<view class="u-flex-col border-bootom" style="padding: 0 20rpx;" v-if="item.type==2">
					<view class="u-flex u-row-between" style="padding: 30rpx 0;">
						<view class="u-flex">
							<text class="u-font-26 u-color-balck">{{item.name}}：</text>
							<text class="u-font-24 zhuti_color_hong u-margin-left-5" v-if="item.mandatory==1">*</text>
						</view>
					</view>
					<view class="u-flex border-bottom-1" style="padding: 30rpx 0;">
						<view class="u-flex u-row-left u-col-center" style="width: 640rpx;">
							<textarea v-model="item.value" :placeholder="item.title" class="u-font-28" style="width: 640rpx;height: 130rpx;" />
						</view>
					</view>
				</view>
				<!--单选-->
				<view class="u-flex-col border-bootom" style="padding: 0 20rpx;" v-if="item.type==3">
					<view class="u-flex border-bottom-1" style="padding: 30rpx 0;">
						<view class="u-flex" style="width: 160rpx;">
							<text class="u-font-28 u-color-balck u-margin-left-5">{{item.name}}</text>
							<text class="u-font-24 zhuti_color_hong u-margin-left-5" v-if="item.mandatory==1">*</text>
						</view>
						<view class="u-flex u-margin-right-20 u-margin-top-10" v-for="(ite,index2) in item.arr" :key="index2">
							<text class="u-font-28 u-margin-right-5">{{ite}}</text>
							<text class="icon zhuti_color_lan u-font-36" v-if="item.value!=ite" @click="danxuanval(ite,index,index2)">&#xe8bb;</text>
							<text class="icon zhuti_color_lan u-font-36" v-if="item.value==ite">&#xe6c5;</text>
						</view>
					</view>
				</view>
				<!--多选-->
				<view class="u-flex-col border-bootom" style="padding: 0 20rpx;" v-if="item.type==4">
					<view class="u-flex border-bottom-1" style="padding: 30rpx 0;">
						<view class="u-flex" style="width: 160rpx;">
							<text class="u-font-28 u-color-balck u-margin-left-5">{{item.name}}</text>
							<text class="u-font-24 zhuti_color_hong u-margin-left-5" v-if="item.mandatory==1">*</text>
						</view>
						<view class="u-flex u-flex-wrap u-margin-left-20">
							<checkbox-group class="u-flex u-flex-wrap" @change="checkboxChange" id="25" style="width: 500rpx;">
								<label class="u-flex u-flex-wrap u-margin-top-10" v-for="(ite,index2) in item.arr" :key="index2">
									<view>
										<checkbox :value="index+'|'+ite"/>
									</view>
									<view>{{ite}}</view>
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				
				<!--单选下拉框-->
				<view class="u-flex-col border-bootom" style="padding: 0 20rpx;" v-if="item.type==6">
					<view class="u-flex border-bottom-1  u-row-between" style="padding: 30rpx 0;">
						<view class="u-flex" style="width: 170rpx;">
							<text class="u-font-26 u-color-balck u-margin-left-5">{{item.name}}</text>
							<text class="u-font-24 zhuti_color_hong u-margin-left-5" v-if="item.mandatory==1">*</text>
						</view>
						<picker @change="bindPickerChange" :id="index" :value="indexx" :range="item.arr">
						    <view class="u-flex u-row-between" style="width: 500rpx;">
						    	<view class="u-font-28 u-color-balck3">{{item.arr[indexx]}}</view>
								<text class="icon zhuti_color_hui u-font-28 u-margin-left-20">&#xe623;</text>
						    </view>
						</picker>
					</view>
				</view>
				
				<!--选择时间  单选下拉框-->
				<view class="u-flex-col border-bootom" style="padding: 0 20rpx;" v-if="item.type==7">
					<view class="u-flex border-bottom-1  u-row-between" style="padding: 30rpx 0;">
						<view class="u-flex" style="width: 190rpx;">
							<text class="u-font-26 u-color-balck u-margin-left-5">{{item.name}}</text>
							<text class="u-font-24 zhuti_color_hong u-margin-left-5" v-if="item.mandatory==1">*</text>
						</view>
						<view class="u-flex u-row-between" style="width: 480rpx;" @click="openDatetimePicker(index)">
						    <view class="u-font-28 u-color-balck3">{{birthday?birthday:'请选择'}}</view>
							<text class="icon zhuti_color_hui u-font-28 u-margin-left-20">&#xe623;</text>
						</view>
					</view>
				</view>
				
				
				<!--图片上传-->
				<view class="u-flex-col border-bootom" style="padding: 0 20rpx;" v-if="item.type==5">
					<view class="u-flex u-row-between" style="padding: 30rpx 0;">
						<view class="u-flex">
							<text class="u-font-26 u-color-balck">{{item.name}}：</text>
							<text class="u-font-24 zhuti_color_hong u-margin-left-5" v-if="item.mandatory==1">*</text>
						</view>
					</view>
					<view class="u-flex border-bottom-1" style="padding: 20rpx 0;">
						<view v-for="(itex,index3) in item.imageList" :key="index3" style="margin-right: 10rpx;">
							<image :src="itex" mode="" style="width: 100rpx;height: 100rpx;border-radius: 10rpx;"></image>
						</view>
						<view class="u-flex u-row-center u-col-center upbtn" @click="uploadimg(index)">
							<text class="icon zhuti_color_hui u-font-42">&#xe620;</text>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="u-padding-20 u-flex u-col-center u-row-between" style="border-bottom: 1rpx solid #F4F5F7;">
				<view class="" style="width: 150rpx;">
					<text class="u-font-28 u-color-balck3">性别</text>
				</view>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<text class="u-font-28 u-color-balck3">{{array[index]}}</text>
					<text class="icon u-color-balck9 u-font-26" style="margin-left: 430rpx;">&#xe623;</text>
				</picker>
			</view> -->
			<!-- <view class="u-padding-20 u-flex u-col-center" style="border-bottom: 1rpx solid #F4F5F7;">
				<view class="" style="width: 150rpx;">
					<text class="u-font-28 u-color-balck3">手机</text>
				</view>
				<view class="u-margin-left-20" style="width: 300rpx;">
					<input type="text" class="u-font-28 u-color-balck3" placeholder="请输入您的手机号"/>
				</view>
				<view class="" style="width: 150rpx;text-align: right;">
				</view>
			</view> -->
		</view>
		
		<view class="u-flex-col u-bg-white u-margin-top-20" style="border-radius: 20rpx;">
			<view class="u-padding-20 u-flex u-col-center u-row-between" style="border-bottom: 1rpx solid #F4F5F7;">
				<view>
					<text class="u-font-28 u-color-balck u-font-bold">已选择预约</text>
				</view>
			</view>
			<view class="u-padding-20 u-flex u-col-top">
				<image :src="list.img" style="width: 80rpx;height: 80rpx;" mode=""></image>
				<view class="u-flex-col u-margin-left-20" style="width: 580rpx;">
					<view class="u-flex u-row-between u-col-center">
						<text class="u-font-28 u-color-balck3 u-font-bold">{{list.title?list.title:''}}</text>
						<text class="u-font-28 u-color-balck6" v-if="money>0">￥{{money?money:'0'}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="u-flex-col u-bg-white u-margin-top-20" style="border-radius: 20rpx;">
			<view class="u-padding-20 u-flex u-col-center u-row-between" style="border-bottom: 1rpx solid #F4F5F7;" v-if="riqi && time">
				<view class="" style="width: 150rpx;">
					<text class="u-font-28 u-color-balck3">到店时间</text>
				</view>
				<view class="u-flex u-row-right" style="width: 440rpx;">
					<text class="u-font-26 u-color-balck6">{{riqi}}</text>
					<text class="u-font-26 u-color-balck6 u-margin-left-10" v-if="wek">{{wek}}</text>
					<text class="u-font-26 u-color-balck6 u-margin-left-10">{{time}}</text>
				</view>
			</view>
			<view v-if="biao" class="u-padding-20 u-flex u-col-center u-row-between" style="border-bottom: 1rpx solid #F4F5F7;">
				<view class="" style="width: 150rpx;">
					<text class="u-font-28 u-color-balck3">选择座位</text>
				</view>
				<view class="u-flex u-row-right" style="width: 440rpx;">
					<text class="u-font-26 u-color-balck6">{{title}}</text>
				</view>
			</view>
			<view v-if="ptit" class="u-padding-20 u-flex u-col-center u-row-between" style="border-bottom: 1rpx solid #F4F5F7;">
				<view class="" style="width: 150rpx;">
					<text class="u-font-28 u-color-balck3">选择人员</text>
				</view>
				<view class="u-flex u-row-right" style="width: 440rpx;">
					<text class="u-font-26 u-color-balck6">{{ptit}}</text>
				</view>
			</view>
			<view v-if="spec && spec.id" class="u-padding-20 u-flex u-col-center u-row-between" style="border-bottom: 1rpx solid #F4F5F7;">
				<view class="" style="width: 150rpx;">
					<text class="u-font-28 u-color-balck3">选择规格</text>
				</view>
				<view class="u-flex u-row-right" style="width: 440rpx;">
					<text class="u-font-26 u-color-balck6">{{spec.title}}</text>
				</view>
			</view>
		</view>
		
		<view class="u-flex-col u-bg-white u-margin-top-20" style="border-radius: 20rpx;">
		<view class="u-flex u-row-between" style="padding-bottom: 20rpx;padding: 20rpx 20rpx;">
			<view class="u-flex">
				<text class="u-font-30 u-color-balck3 u-font-bold">预约人数</text>
			</view>
			<view class="u-flex-col u-row-right u-col-bottom">
				<view class="u-flex">
					<view class="ybtnx" @click="jsno()">
						<text class="u-color-balck3" style="font-size: 48rpx;">-</text>
					</view>
					<view class="u-margin-left-30">
						<text class="u-font-26 u-color-balck6">{{yno}}</text>
					</view>
					<view class="ybtnx u-margin-left-30" @click="zjno()">
						<text class="u-color-balck3" style="font-size: 48rpx;">+</text>
					</view>
				</view>
			</view>
		</view>
		</view>
		
		<view style="height: 110rpx;"></view>
		<view class="bootbtn u-flex u-row-between" v-if="zmo>0">
			<view class="u-flex-col u-margin-left-20">
				<view class="u-flex">
					<text class="u-font-28 u-font-bold u-color-balck6">立即付款：</text>
					<text class="u-font-28 u-font-bold" style="color: #FF8244;">￥{{zmo?zmo:'0'}}</text>
				</view>
				<text class="u-font-24 u-color-balck6 u-margin-top-10">订单总价：￥{{zmo?zmo:'0'}}</text>
			</view>
			<view @click="add_order()" class="ribtn zhuti_bg u-flex u-row-center u-col-center u-margin-right-20">
				<text class="u-font-28 u-color-white">去支付</text>
			</view>
		</view>
		<view class="bootbtn u-flex u-row-center u-col-center" v-if="zmo==0">
			<view v-if="isbtn" @click="add_order()" class="ribtn zhuti_bg u-flex u-row-center u-col-center" style="width: 600rpx;">
				<text class="u-font-28 u-color-white">立即预约</text>
			</view>
			<view v-if="!isbtn" class="ribtn u-flex u-row-center u-col-center" style="width: 600rpx;background-color: #CCCCCC;">
				<text class="u-font-28 u-color-white">立即预约</text>
			</view>
		</view>
		
		<SimpleDateTimePicker
		      ref="myPicker"
		      @submit="handleSubmit"
		      :start-year="2022"
		      :end-year="2030"
		    />
		
	</view>
</template>
 
<script>
	//#ifdef H5
	var jweixin = require('@/components/jweixin-module/index.js');
	//#endif
	import SimpleDateTimePicker from "uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";
	export default { 
		components: {
		    SimpleDateTimePicker,
		  },
		data() {
			return {
				isbtn:true,//点击
				form:[],
				list:[],
				spec:[],
				isgx:0,
				token:'',
				riqi:'',
				time:'',
				wek:'',
				timeid:0,
				indexx:0,
				biao:'',
				biaoid:0,
				id:0,
				title:'',
				ptit:'',
				birthday:'',
				pid:0,
				indexs:-1,
				iswx:1,
				cid:0,
				
				yno:1,
				syno:0,//剩余数量
				zmo:0,
				money:0,
			}
		},
		onLoad(e) {
			if(e.id){
				this.id=e.id;
			}
			if(e.pid){
				this.pid=e.pid;
			}
			if(e.riqi){
				this.riqi=e.riqi;
			}
			if(e.time){
				this.time=e.time;
			}
			if(e.wek){
				this.wek=e.wek;
			}
			if(e.timeid){
				this.timeid=e.timeid;
			}
			if(e.biao){
				this.biao=e.biao;
			}
			if(e.ptit){
				this.ptit=e.ptit;
			}
			if(e.title){
				this.title=e.title;
			}
			if(e.biaoid){
				this.biaoid=e.biaoid;
			}
			if(e.cid){//规格id
				this.cid=e.cid;
			}
			
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
			
			this.GetToken();
		},
		onPullDownRefresh() {
			this.getData();
			setTimeout(function () {
			    uni.stopPullDownRefresh();
			}, 1000);
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
			zjno(){
				if(this.yno+1>this.syno){
					uni.showToast({
						title: '当前订单最多可预约'+this.syno+'人',
						icon:"none",
						duration: 2000
					});
					//return false;
				}
				this.yno++
				var zmo=this.money*this.yno;
				this.zmo=zmo.toFixed(2);
			},
			jsno(){
				var minno=1;
				if(minno<1){
					minno=1;
				}
				if(this.yno>minno){
					this.yno--
					var zmo=this.money*this.yno;
					this.zmo=zmo.toFixed(2);
				}else{
					uni.showToast({
						title: '预约人数不能少于'+minno,
						icon:"none",
						duration: 2000
					});
				}
			},
			// 打开picker
			openDatetimePicker(index) {
				this.indexs=index;
				this.$refs.myPicker.show();
			},
			handleSubmit(e) {
			  console.log(e);
			  this.birthday = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			  this.form[this.indexs].value=this.birthday;
			},
			danxuanval(val,index1,index2){
				this.form[index1].value=val;
			},
			bindPickerChange: function(e) {
				var ind=e.target.id;
				var va=this.form[ind].arr[e.target.value];
				this.form[ind].value=va;
				this.indexx = e.target.value;
			},
			checkboxChange: function (e) {
				var val=e.target.value;
				var ind=0;
				var str='';
				for (var i = 0, lenI = val.length; i < lenI; ++i) {
					var list=val[i];
					var strs=list.split("|");
					ind=strs[0];
					str+=strs[1];
					if(i<lenI-1){
						str+=',';
					}
				}
				this.form[ind].value=str;
			},
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
						if(list){
							for(var i=0;i<list.length;i++){
								if(list[i].validate==1){
									list[i].value=userName;
								}
								if(list[i].validate==2){
									list[i].value=telNumber;
								}
								if(list[i].validate==4){
									list[i].value=address;
								}
							}
						}
						_this.form=list;
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
					console.log(res);
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
				    if(list){
				    	for(var i=0;i<list.length;i++){
				    		if(list[i].validate==1){
				    			list[i].value=userName;
				    		}
				    		if(list[i].validate==2){
				    			list[i].value=telNumber;
				    		}
				    		if(list[i].validate==4){
				    			list[i].value=address;
				    		}
				    	}
				    }
					console.log(list);
				    _this.form=list;
				  },
				  fail(e){
				  	console.log(JSON.stringify(e));
				  }
				})
				//#endif
			},
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
			uploadimg(index){
				var th = this;
				if(th.form[index].imageList.length>=5){
					uni.showToast({
						title: '最多只能上传5张图片',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				uni.chooseImage({
					count:1,
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
									var va=th.form[index].value;
									if(va){
										va=va+','+res.img;
										
									}else{
										va=res.img;
									}
									th.form[index].value=va;
									th.form[index].imageList = th.form[index].imageList.concat(res.savename);
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
			getData(){
				var _this=this;
				this.$api.getyuyue({id:this.id,token:this.token,cid:this.cid,timeid:this.timeid}).then((res)=>{
					_this.list=res.data.data.arr;
					_this.isgx=res.data.data.isgx;
					_this.form=res.data.data.form;
					_this.spec=res.data.data.spec;
					_this.money=res.data.data.money;
					_this.zmo=res.data.data.money;
					_this.syno=res.data.data.syno;
				})
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
				
				//提交遮罩
				uni.showLoading({
					title: '请耐心等待！'
				});
				
				var _this=this;
				this.$api.add_yuyue({
					id:this.id,
					pid:this.pid,
					riqi:this.riqi,
					time:this.time,
					timeid:this.timeid,
					biaoid:this.biaoid,
					biao:this.biao,
					biaotit:this.title,
					number:this.yno,
					cid:this.cid,
					zmo:this.zmo,
					list:encodeURI(JSON.stringify(this.form)),
					token:this.token
				}).then((res)=>{
					uni.hideLoading();
					if(res.data.code==200){
						var id=res.data.data.id;
						_this.getpay(id);
					}else if(res.data.code==300){
						var id=res.data.data.id;
						var money=res.data.data.money;
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
						setTimeout(() => {
							// 此为uView的方法，详见路由相关文档
							uni.redirectTo({
								url: '../pay/payok?id='+id+'&money='+money
							});
						},1500)
					}else if(res.data.code==500){
						uni.showToast({
							title: res.data.message,
							icon:"none",
							duration: 2000
						});
						setTimeout(() => {
							// 此为uView的方法，详见路由相关文档
							uni.redirectTo({
								url: '../user/defaultlist'
							});
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
			onBridgeReady(id){
				var _this=this;
				uni.request({
					url: _this.$puburl+'resource/Payco/wxh5',
				    data: {
				        id: id,
						st:1,
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
								uni.redirectTo({
									url:'../pay/payok?id='+id+'&money='+_this.zmo
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
				this.onBridgeReady(id);
				return false;
				//#endif
				var _this=this;
				//#ifdef MP-WEIXIN
				uni.request({
					url: _this.$puburl+'resource/Payco/wxxcx',
				    data: {
				        id: id,
						st:1,
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
									uni.redirectTo({
										url:'../pay/payok?id='+id+'&money='+_this.zmo
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
			tiao(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #EEEEEF;
}
.bootbtn{
	width: 750rpx;
	height: 100rpx;
	background-color: #FFFFFF;
	position: fixed;
	bottom: 0rpx;
	left: 0rpx;
}
.border-bootom{
	border-bottom: 1rpx solid #F4F5F7;
}
.upbtn{
		width: 100rpx;
		height: 100rpx;
		border: 1rpx solid #E0E0E0;
		border-radius: 10rpx;
	}
.ribtn{
	width: 300rpx;
	height: 80rpx;
	border-radius: 40rpx;
}

/**数量**/
	.rixbtn{
		width: 200rpx;
		height: 100rpx;
	}
	.ybtn{
		width: 750rpx;
		height: 100rpx;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
	}
	.ybtnx2{
		width: 40rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1rpx solid #DDDDDD;
	}
	.ybtnx{
		width: 50rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4rpx;
		background-color: #F5F6FA;
	}
</style>
