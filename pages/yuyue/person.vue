<template>
	<view>
		
		<view class="topvie" v-if="list && list.length>0">
			<scroll-view scroll-x="true" class="scroll-Y" scroll-left="0">
				<view class="listtopli" v-for="(item,index) in list" :key="index" :class="index==ind?'zhuti_bg u-color-white':'u-bg-white u-color-balck3'" @click="setweek(index,item.wek)">
					<view class="u-font-24 u-margin-top-10">{{item.week}}</view>
					<view class="u-font-24 u-margin-top-5">{{item.time}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="centx" v-if="cent && cent.length>0">
			<view class="centli u-flex-col" v-for="(item,index) in cent" :key="index" @click="yuetime(item.id,item.use_no,item.total,item.title)">
				<view class="u-flex" style="padding: 20rpx 20rpx 0 20rpx;">
					<image v-if="item.img" :src="item.img" style="width: 80rpx;height: 80rpx;border-radius: 40rpx;" mode=""></image>
					<view class="centlicc">
						<text class="u-font-26 u-color-balck3">{{item.title}}</text>
						<text class="u-font-24 u-color-balck6 u-margin-top-10" v-if="item.Intro">{{item.Intro}}</text>
					</view>
					<view class="rivie">
						<text class="u-font-28 u-font-bold zhuti_color_hong" v-if="item.money>0">￥{{item.money}}</text>
					</view>
				</view>
				<view class="u-flex u-padding-20 u-row-between">
					<view class="u-flex">
						<text class="u-font-26 u-color-balck3">{{riqi}}</text>
					</view>
					<view class="u-flex u-row-center u-col-center u-border-ra10" v-if="item.use_no<item.total">
						<text class="u-font-24 u-color-balck3">剩余：</text>
						<text class="u-font-24 u-color-balck3">{{item.total-item.use_no}}</text>
					</view>
					<view class="u-padding-10 zhuti_bg u-flex u-row-center u-col-center u-border-ra10" v-if="item.use_no<item.total">
						<text class="u-font-24 u-color-white">立即预约</text>
					</view>
					<view class="u-padding-10 zhuti_bg u-flex u-row-center u-col-center u-border-ra10" v-else style="background-color: #CCCCCC;">
						<text class="u-font-24 u-color-white">当日约满</text>
					</view>
				</view>
			</view>
		</view>
		<view class="centx" style="text-align: center;" v-else>
			<text class="icon u-color-balck9" style="font-size: 82rpx;margin-top: 40rpx;">&#xe643;</text>
			<text class="u-font-28 u-color-balck9 u-margin-top-30">暂无排班</text>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="popbox" v-if="timelist && timelist.length>30">
				<view style="height: 76rpx;width: 750rpx;text-align: center;line-height: 76rpx;border-bottom: 1rpx solid #CCCCCC;margin-bottom: 10rpx;"><text class="u-font-26 u-color-balck3">{{timetit}}</text></view>
				<scroll-view scroll-y="true" class="scroll-Yx" >
				<view class="popcent">
					<block v-for="(itemx,index) in timelist" :key="index">
						<view class="centxx" v-for="(item,inde) in itemx.list" :key="inde" @click="settimenav(item.no,item.time,item.sno,itemx.id)">
							<view class="centlis" :class="timenav==item.no?'zhuti_color zhuti_border2':'u-color-balck9 centbor'">
								<text class="u-font-24">{{item.time}}</text>
								<text class="u-font-24">{{item.title}}</text>
							</view>
						</view>
					</block>
				</view>
				</scroll-view>
				<view class="popboot" :class="timenav>0?'zhuti_bg':'bootbg'" @click="openorder()">
					<text class="u-font-32 u-color-white">立即预约</text>
				</view>
			</view>
			<view class="popbox" v-else>
				<view style="height: 76rpx;width: 750rpx;text-align: center;line-height: 76rpx;border-bottom: 1rpx solid #CCCCCC;margin-bottom: 10rpx;"><text class="u-font-26 u-color-balck3">{{timetit}}</text></view>
				<view class="popcent">
					<block v-for="(itemx,index) in timelist" :key="index">
						<view class="centxx" v-for="(item,inde) in itemx.list" :key="inde" @click="settimenav(item.no,item.time,item.sno,itemx.id)">
							<view class="centlis" :class="timenav==item.no?'zhuti_color zhuti_border2':'u-color-balck9 centbor'">
								<text class="u-font-24">{{item.time}}</text>
								<text class="u-font-24">{{item.title}}</text>
							</view>
						</view>
					</block>
					
				</view>
				<view class="popboot" :class="timenav>0?'zhuti_bg':'bootbg'" @click="openorder()">
					<text class="u-font-32 u-color-white">立即预约</text>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tit:'',
				title: '',
				list:[],
				cent:[],
				timelist:[],
				id:0,
				pid:0,
				ind:0,
				token:'',
				wek:0,
				timetit:'',
				timenav:0,//时间选择
				time:'',
				timeid:0,
				day:'',
				riqi:'',//日期
				docid:0,//医生id
			}
		},
		onLoad(e) {
			var _this=this;
			if(e.tit){
				uni.setNavigationBarTitle({
				    title: e.tit
				});
				this.tit=e.tit;
			}
			if(e.id){
				this.id=e.id;
			}
			uni.setStorage({
				key: 'pathData',
				data: {
					'path' :'/pages/class/list?tit='+_this.tit+'&id='+_this.id
				},
				success: function () {
					console.log('success');
				}
			});
			this.GetToken();
			this.getweek();
		},
		methods: {
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			settimenav(no,time,st,id){
				if(st>0){
					this.timenav=no;
					this.time=time;
					this.timeid=id;
				}else if(st<1){
					uni.showToast({
						title: '该时间段已经被预约了',
						icon:"none",
						duration: 2000
					});
					this.timenav=0;
					this.time='';
					this.timeid='';
				}
			},
			openorder(){
				var riqi=this.list[this.ind]['riqi'];
				var no=this.timenav;
				var id=this.id;
				var time=this.time;
				var timeid=this.timeid;
				var pid=this.pid;
				if(!riqi){
					uni.showToast({
						title: '请选择日期',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				if(no<1 || !time){
					uni.showToast({
						title: '请选择时间',
						icon:"none",
						duration: 2000
					});
					return false;
				}
				const value = uni.getStorageSync('userData');
				if (!value) {
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
					url:'../yuyue/order?id='+id+'&riqi='+riqi+'&no='+no+'&time='+time+'&timeid='+timeid+'&ptit='+this.title+'&pid='+this.pid
				})
			},
			yuetime(id,no1,no2,title){
				if(no1==no2){
					return false;
				}
				this.open();
				this.timenav=0;
				var _this=this;
				this.title=title;
				this.pid=id;
				//this.timeid=id;
				var riqi=this.list[this.ind]['riqi'];
				this.$api.getytimelist({'id':this.id,'pid':id,'riqi':riqi}).then((res)=>{
					_this.timelist=res.data.data;
				})
				this.timetit="预约日期："+this.list[this.ind]['riqi'];
			},
			setweek(ins,wek){
				this.ind=ins;
				this.wek=wek;
				var riqi=this.list[ins].riqi;
				this.riqi=riqi;
				this.getlist(riqi);
			},
			GetToken(){
				var _this=this;
				uni.getStorage({
				    key: 'userData',
				    success: function (res) {
						
				    }
				});
			},
			getlist(riqi){
				var _this=this;
				this.$api.getperson({'id':this.id,'wek':this.wek,'riqi':riqi}).then((res)=>{
					_this.cent=res.data.data.list;
				})
			},
			getweek(){
				var _this=this;
				this.$api.getydate({'token':this.token,id:this.id}).then((res)=>{
					console.log(res.data.data.date);
					_this.list=res.data.data.date;
					_this.wek=res.data.data.date[0]['wek'];
					_this.setweek(0,_this.wek);
				})
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
	.scroll-Yx{
		width: 750rpx;
		white-space: nowrap;
		height: 900rpx;
	}
	.ribtn{
		width: 70rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6rpx;
	}
	.rivie{
		width: 100rpx;
		height: 90rpx;
		display: flex;
		justify-content: flex-end;
	}
	.centlicc{
		width: 520rpx;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.centli{
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	.centx{
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
	.listtopli{
		display: inline-block;
		width: 150rpx;
		height: 90rpx;
		text-align: center;
		margin-left: 20rpx;
		border-radius: 10rpx;
	}
	.topvie{
		width: 750rpx;
		height: 90rpx;
		margin-top: 20rpx;
	}
	.listcent{
		display: flex;
		flex-direction: row;
	}
	.scroll-Y{
		height: 90rpx;
		white-space: nowrap;
		width: 750rpx;
	}
	
	/**底部**/
	.centlis{
		width: 164rpx;
		height: 84rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	.centbor{
		border:1rpx solid #999999;
	}
	.centxx{
		width: 177.5rpx;
	}
	.popcent{
		width: 710rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}

	.popboot{
		width: 690rpx;
		height: 90rpx;
		margin-bottom: 10rpx;
		margin-top: 10rpx;
		margin-left: 30rpx;
		border-radius: 45rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bootbg{
		background-color: #909399;
	}
	.popbox{
		background-color: #FFFFFF;
		overflow: hidden;
	}
</style>
