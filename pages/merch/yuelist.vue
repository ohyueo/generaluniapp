<template>
	<view>
		
		<!-- <view class="topvie u-flex u-bg-white">
			<view class="topli u-flex u-flex-1 u-row-center u-col-center u-font-28" :class="type==0?'zhuti_border_bottom-1 zhuti_color':'u-color-balck3'" @click="setnav(0)">全部</view>
			<view class="topli u-flex u-flex-1 u-row-center u-col-center u-font-28" :class="type==1?'zhuti_border_bottom-1 zhuti_color':'u-color-balck3'" @click="setnav(1)">未审核</view>
			<view class="topli u-flex u-flex-1 u-row-center u-col-center u-font-28" :class="type==2?'zhuti_border_bottom-1 zhuti_color':'u-color-balck3'" @click="setnav(2)">待核销</view>
			<view class="topli u-flex u-flex-1 u-row-center u-col-center u-font-28" :class="type==3?'zhuti_border_bottom-1 zhuti_color':'u-color-balck3'" @click="setnav(3)">已核销</view>
			<view class="topli u-flex u-flex-1 u-row-center u-col-center u-font-28" :class="type==4?'zhuti_border_bottom-1 zhuti_color':'u-color-balck3'" @click="setnav(4)">取消/退款</view>
		</view> -->
		
		<div class="xiding" style="background:#F6F6F6;">
			<div class="u-padding-20 u-bg-white u-margin-top-20 u-flex u-row-between">
				<div class="u-flex" style="width: 100%;">
					<view class="" style="height:36px;width:40%;font-size:28rpx;border:none;border-bottom:1px solid #f0f0f0;line-height: 36px;padding-left: 10rpx;">
						<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange">
							<text class="u-font-28 u-color-balck9">{{date1}}</text>
						</picker>
					</view>
					<!-- <input type="text" placeholder="请选择开始时间" style="height:36px;width:38%;text-indent:20rpx;font-size:28rpx;border:none;border-bottom:1px solid #f0f0f0;"/> -->
					<div style="width:8%;text-align:center">
						<span style="font-size:28rpx;color:#333333;">到</span>
					</div>
					<view style="height:36px;width:40%;font-size:28rpx;border:none;border-bottom:1px solid #f0f0f0;line-height: 36px;padding-left: 10rpx;">
						<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
							<text class="u-font-28 u-color-balck9">{{date2}}</text>
						</picker>
					</view>
					<!-- <input type="text" placeholder="请选择结束时间" style="height:36px;width:38%;text-indent:10px;font-size:28rpx;border:none;border-bottom:1px solid #f0f0f0;"/> -->
				</div>
				<div class="zhuti_bg" style="width:80px;height:36px;text-align:center;line-height:36px;" @click="sousuo()">
					<span class="u-font-28 u-color-white">搜 索</span>
				</div>
			</div>
			
			<div class="u-bg-white u-flex" style="padding:0 10px;margin-top:10px;">
				<div class="topli u-flex u-row-center" :class="type==2?'zhuti_border_bottom-1 zhuti_color':'u-color-balck6'" style="flex:1;height:40px;" @click="setnav(2)">
					<span class="u-font-28">未核销</span>
				</div>
				<div class="topli u-flex u-row-center" :class="type==3?'zhuti_border_bottom-1 zhuti_color':'u-color-balck6'" style="flex:1;height:40px;" @click="setnav(3)">
					<span class="u-font-28">已核销</span>
				</div>
			</div>
		</div>
		
		<view class="u-bg-white u-margin-top-20 u-font-26">
			<view class="u-padding-20 u-color-balck6 u-font-26 u-color-balck3" style="border-bottom:2rpx solid #F0F0F0;line-height:50rpx;" v-for="(item,index) in list" :key="index">
				<view class="u-flex u-row-between" @click="tiao('../user/hexiao?id='+item.id)">
					<text>订单ID:{{item.id}}</text>
					<view class="u-flex u-row-center u-col-center">
						<image :src="item.img" mode="" style="width: 40rpx;height: 40rpx;border-radius: 20rpx;"></image>
						<text class="u-margin-left-8">{{item.nick}}</text>
					</view>
				</view>
				<view class="u-flex u-row-between" v-if="item.name && item.mobile" @click="tiao('../user/hexiao?id='+item.id)">
					<text>姓名：{{item.name}}</text>
					<text>联系电话：{{item.mobile}}</text>
				</view>
				<view class="u-flex u-row-between" @click="tiao('../user/hexiao?id='+item.id)">
					<text>付款金额：￥{{item.paymo}}</text>
					<text>提交时间：{{item.addtime}}</text>
				</view>
				<view class="u-flex u-row-between" @click="tiao('../user/hexiao?id='+item.id)">
					<text style="width: 300rpx;">预约日期：{{item.y_data}}</text>
					<text class="u-flex u-row-right u-font-dan-sheng zhuti_color" style="width: 400rpx;">预约项目：{{item.title}}</text>
				</view>
				<view class="u-flex u-row-between" @click="tiao('../user/hexiao?id='+item.id)">
					<text style="width: 400rpx;">预约时间：{{item.y_time}}</text>
					<text class="u-flex u-row-right u-font-dan-sheng zhuti_color_huang" style="width: 300rpx;" v-if="item.status==0">状态：待审核</text>
					<text class="u-flex u-row-right u-font-dan-sheng zhuti_color_huang" style="width: 300rpx;" v-if="item.status==1">状态：待付款</text>
					<text class="u-flex u-row-right u-font-dan-sheng zhuti_color_huang" style="width: 300rpx;" v-if="item.status==2">状态：待核销</text>
					<text class="u-flex u-row-right u-font-dan-sheng zhuti_color_huang" style="width: 300rpx;" v-if="item.status==3">状态：已完成</text>
					<text class="u-flex u-row-right u-font-dan-sheng zhuti_color_huang" style="width: 300rpx;" v-if="item.status==4">状态：已取消</text>
					<text class="u-flex u-row-right u-font-dan-sheng zhuti_color_huang" style="width: 300rpx;" v-if="item.status==5">状态：已退款</text>
				</view>
				<view class="u-bg-white u-flex u-row-center" style="padding-top: 20rpx;border-top: 1rpx solid #F6F6F6;margin-top: 10rpx;" v-if="item.status==0 && audit==1">
					<view class="u-flex u-row-center u-col-center u-color-white zhuti_bg" style="width: 300rpx;height: 70rpx;border-radius: 35rpx;" @click="isjie('确定通过该订单？',1,item.id)">审核通过</view>
					<view class="u-flex u-row-center u-col-center u-color-white li2 u-margin-left-20 u-font-28 barbtn" v-if="item.paymo<=0" @click="open3(2,item.id)">取消订单</view>
					<view class="u-flex u-row-center u-col-center u-color-white li2 u-margin-left-20 u-font-28 barbtn" v-if="item.paymo>0" @click="open3(3,item.id)">订单退款</view>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="status"></uni-load-more>
		
		<uni-popup ref="popup3" type="center">
		    <view class="popbox">
				<view class="topvix2 u-flex u-row-center u-col-center">
					<text class="u-font-28 u-color-balck3">填写信息</text>
				</view>
				<view class="topvix2 u-flex u-row-between u-col-center border-bottom-1"  v-if="btnst==1">
					<text class="u-font-28 u-color-balck3">取消理由</text>
					<view class="u-flex">
						<input type="text" placeholder="请输入取消原因" v-model="bomsg" style="width: 400rpx;font-size: 28rpx;text-align: right;" />
					</view>
				</view>
				<view class="topvix2 u-flex u-row-between u-col-center border-bottom-1"  v-if="btnst==2">
					<text class="u-font-28 u-color-balck3">退款理由</text>
					<view class="u-flex">
						<input type="text" placeholder="请输入退款原因" v-model="bomsg" style="width: 400rpx;font-size: 28rpx;text-align: right;" />
					</view>
				</view>
				<view class="u-flex">
					<view @click="close3()" class="u-flex u-row-center u-col-center u-flex-1 qxbtn" style="border-right: 1rpx solid #F6F6F6;">
						<text class="u-font-28 u-color-balck3">取消</text>
					</view>
					<view @click="yanshou()" class="u-flex u-row-center u-col-center u-flex-1 qxbtn">
						<text class="u-font-28 zhuti_color">立即提交</text>
					</view>
				</view>
		    </view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				id:0,
				navst:0,
				list:[],
				title: 'Hello',
				token:'',
				status: 'loadmore',
				type:2,
				count: 10,
				res_count:0,
				page: 1,
				btnst:1,
				audit:1,
				bomsg:'',
				
				date1: '请选择开始时间',
				date2: '请选择结束时间',
			}
		},
		onLoad(e){
			if(e.type){
				this.type=e.type;
			}
			this.GetToken();
		},
		onPullDownRefresh() {
			this.getData();
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
				this.getData();
			}, 500)
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date1 = e.detail.value
			},
			bindDateChange2: function(e) {
				this.date2 = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			isjie(tit,st,id){
				this.btnst=st;
				this.id=id;
				var _this=this;
				uni.showModal({
					content: tit,
					confirmText: "确定",
					cancelText: "取消",
					cancelColor:"#71ADF5",
					confirmColor:"#71ADF5",
					success: function (res) {
						if (res.confirm) {
							_this.yanshou(st,id);
						}
					}
				})
			},
			yanshou(){
				var _this=this;
				var st=this.btnst;
				this.$api.setorder({id:this.id,token:this.token,st:this.btnst,msg:this.bomsg}).then(res => {
					if(res.data.code==200){
						uni.showToast({
						    title: res.data.message,
							icon:'none',
						    duration: 2000
						});
						_this.status = 'loading';
						_this.page = 1;
						_this.list=[];
						_this.getData();
						if(st>1){
							_this.close3();
						}
					}else{
						uni.showToast({
						    title: res.data.message,
							icon:'none',
						    duration: 2000
						});
					}
				})
			},
			open3(st,id){
				this.btnst=st;
				this.id=id;
				this.$refs.popup3.open();
			},
			close3() {
				this.$refs.popup3.close()
			},
			sousuo(){
				this.list=[];
				this.status = 'loading';
				this.page=0;
				this.getData();
			},
			setnav(st){
				this.list=[];
				this.status = 'loading';
				this.navst=st;
				this.type=st;
				this.page=0;
				this.getData();
			},
			getData(){
				var _this=this;
				this.$api.merorderlist({'token':this.token,type:this.type,page:this.page,'str':this.date1,'end':this.date2}).then((res)=>{
					if(res.data.data.tit){
						uni.setNavigationBarTitle({
						    title: res.data.data.tit
						});
					}
					_this.audit=res.data.data.audit;
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
				uni.getStorage({
				    key: 'userData',
				    success: function (res) {
						_this.token=res.data.vuex_token;
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
	page{
		background-color: #F6F6F6;
	}
	.qxbtn{
		height: 80rpx;
		border-radius: 20rpx;
	}
	.topvix2{
		padding: 20rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}
	.popbox{
		width: 600rpx;
		background-color: #FFFFFF;
	}
	
	.barbtn{
		width: 300rpx;
		height: 70rpx;
		border-radius: 35rpx;
	}
	.topvie{
		width: 750rpx;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		height: 80rpx;
	}
	.topli{
		height: 80rpx;
	}
</style>