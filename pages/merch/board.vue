<template>
	<view>
		
		<view class="u-padding-20 u-flex" style="border-top: 1rpx solid #F6F6F6;">
			<i class="icon u-color-balck6" style="font-size: 32rpx;">&#xe699;</i>
			<text class="u-font-26 u-color-balck3 u-margin-left-10">选择预约项目</text>
		</view>
		<scroll-view  :scroll-x="true" class="interest-scroll bg-white" :show-scrollbar="false">
			<view class="u-flex interest-box" style="padding: 0 20rpx;">
				<view class="u-flex-col swipde u-col-center u-row-center" :class="listid==item.id?'u-color-white zhuti_bg':'navs'" v-for="(item,index) in venues" :key="index" @click="setvenues(item.id)">
					<text class="u-font-24">{{item.title}}</text>
					<text class="u-font-24 u-margin-top-10">{{item.week}}</text>
				</view>
			</view>
		</scroll-view>
		
		<view class="u-padding-20 u-flex" style="border-top: 1rpx solid #F6F6F6;">
			<i class="icon u-color-balck6" style="font-size: 32rpx;">&#xe75c;</i>
			<text class="u-font-26 u-color-balck3 u-margin-left-10">请选择预定日期</text>
		</view>
		<scroll-view  :scroll-x="true" class="interest-scroll bg-white" :show-scrollbar="false">
			<view class="u-flex interest-box" style="padding: 0 20rpx;">
				<view class="u-flex-col swipde u-col-center u-row-center" :class="snav==item.riqi?'u-color-white zhuti_bg':'navs'" v-for="(item,index) in date" :key="index" @click="gettime(item.riqi,item.week)">
					<text class="u-font-24">{{item.time}}</text>
					<text class="u-font-24 u-margin-top-10">{{item.week}}</text>
				</view>
			</view>
		</scroll-view>
		
		<block v-if="classx && classx.length>0">
			<view class="u-padding-20 u-flex u-row-between">
				<view class="u-flex">
					<i class="icon u-font-36 u-color-balck6">&#xe75c;</i>
					<text class="u-font-26 u-color-balck3 u-margin-left-10">请选择规格</text>
				</view>
				<view class="u-flex">
					<view class="yuekuai1"></view>
					<text class="u-font-20 u-color-balck3 u-margin-left-10">未完成</text>
					<view class="yuekuai2 u-margin-left-20 zhuti_bg"></view>
					<text class="u-font-20 u-color-balck3 u-margin-left-10">已完成</text>
				</view>
			</view>
			<scroll-view  :scroll-x="true" class="interest-scroll bg-white" :show-scrollbar="false">
				<view class="u-flex interest-box" style="padding: 0 20rpx 0rpx 20rpx;">
					<view class="u-flex-col swipde u-col-center u-row-center u-border-ra10" :class="classxid==item.id?'u-color-white zhuti_bg':'navs'" v-for="(item,index) in classx" :key="index" @click="settype(item.id)">
						<text class="u-font-24">{{item.title}}</text>
					</view>
				</view>
			</scroll-view>
		</block>
		
		<!--核销看板-->
		<view class="u-flex u-flex-wrap" style="padding: 20rpx 0;">
			<block v-for="(item,index) in list" :key="index" v-if="item.status==3">
				<view class="boardli u-flex-col u-row-center u-col-center u-margin-bottom-10" :class="item.status==3?'zhuti_bg u-color-white':'u-color-balck6'" @click="tiao('../user/hexiao?id='+item.id)">
					<view class="u-flex">
						<text class="u-font-26">{{item.name}}</text>
					</view>
					<text class="u-font-24 u-margin-top-5">{{item.mobile}}</text>
				</view>
			</block>
			<block v-for="(item,index) in list" :key="index" v-if="item.status==2">
				<view class="boardli u-flex-col u-row-center u-col-center u-margin-bottom-10 u-color-balck6" @click="tiao('../user/hexiao?id='+item.id)">
					<view class="u-flex">
						<text class="u-font-26" v-if="item.heno==0">{{item.name}}</text>
						<text class="u-font-26 zhuti_color_huang" v-if="item.heno==1">{{item.name}}</text>
						<text class="u-font-26 zhuti_color" v-if="item.heno==2">{{item.name}}</text>
						<text class="u-font-26 zhuti_color_lan" v-if="item.heno==3">{{item.name}}</text>
					</view>
					<text class="u-font-24 u-margin-top-5" v-if="item.heno==0">{{item.mobile}}</text>
					<text class="u-font-24 u-margin-top-5 zhuti_color_huang" v-if="item.heno==1">{{item.mobile}}</text>
					<text class="u-font-24 u-margin-top-5 zhuti_color" v-if="item.heno==2">{{item.mobile}}</text>
					<text class="u-font-24 u-margin-top-5 zhuti_color_lan" v-if="item.heno==3">{{item.mobile}}</text>
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				snav:'',
				navst:0,
				list:[],
				venues:[],
				date:[],
				token:'',
				listid:0,
				snoarr:[],
				timesarr:[],
				classtit:[],
				classid:[],
				classx:[],
				riqi:'',
				wek:'',
				st:1,
				classxid:'',
				
				fir:0,
			}
		},
		onLoad(){
			this.GetToken();
		},
		onShow() {
			if(this.fir==0){
				this.fir=1;
			}else{
				this.list=[];
				this.gettime(this.riqi,this.wek);
			}
		},
		methods: {
			setvenues(id){
				this.listid=id;
				this.st=1;
				this.classxid='';
				this.getData();
			},
			settype(id){
				this.classxid=id;
				this.gettime(this.riqi,this.wek);
			},
			getData(){
				var _this=this;
				this.$api.platelist({'token':this.token,listid:this.listid}).then((res)=>{
					_this.venues=res.data.data.venues;
					_this.listid=res.data.data.listid;
					_this.date=res.data.data.date;
					_this.riqi=res.data.data.riqi;
					_this.wek=res.data.data.wek;
					_this.classx=res.data.data.speclist;
					if(res.data.data.speclist && res.data.data.speclist.length>0){
						_this.classxid=res.data.data.speclist[0].id;
					}
					_this.gettime(_this.riqi,_this.wek);
				})
			},
			gettime(riqi,wek){
				uni.showLoading({
					title: '请耐心等待！'
				});
				var _this=this;
				this.snav=riqi;
				this.riqi=riqi;
				this.wek=wek;
				this.moneyarr=[];//清空金额
				this.classtit=[];//清空分类标题
				this.classid=[];//清空分类id
				this.biaoarr=[];//清空下标
				this.timesarr=[];//清空时间
				this.zmo=0;//清空总金额
				this.$api.platetime({listid:this.listid,st:this.st,riqi:riqi,classxid:this.classxid,token:this.token}).then((res)=>{
					uni.hideLoading();
					_this.list=res.data.data.orderlist;
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
	/**选择场地**/
	.yuekuai1{
		width: 45rpx;
		height: 45rpx;
		background-color: #FFFFFF;
		border: 1rpx solid #DDDDDD;
	}
	.yuekuai2{
		width: 45rpx;
		height: 45rpx;
	}
	.boardli{
		width: 170rpx;
		height: 80rpx;
		border:1rpx solid #DDDDDD;
		margin-left: 14rpx;
	}
	.interest-scroll {
		width: 750rpx;
	}
	.interest-box {
		display: flex;
		white-space: nowrap;
	}
	.swipde{
		/* width: 150rpx; */
		padding: 10rpx 20rpx;
		margin-right: 15rpx;
	}
	.navs{
		background-color: #FFFFFF;
		border: 1rpx solid #DDDDDD;
	}
</style>