<template>
	<view>
		<view class="my-userinfo-container">
			<!-- 同部和昵称区域 -->
			<view class="top-box">
				<image :src="userinfo.avatarUrl" class="avatar"></image>
				<view class="nickname">
					{{userinfo.nickName}}
				</view>
			</view>
		</view>
		<!-- 面版区域 -->
		<view class="panel-list">
		<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>3</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>2</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>3</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>3</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					 <view class="panel-item">
					 	<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					 </view>
					 <view class="panel-item">
					 	<image src="/static/my-icons/icon2.png" class="icon"></image>
					 	<text>待收货</text>
					 </view>
					 <view class="panel-item">
					 	<image src="/static/my-icons/icon3.png" class="icon"></image>
					 	<text>退款/退货</text>
					 </view>
					 <view class="panel-item">
					 	<image src="/static/my-icons/icon4.png" class="icon"></image>
					 	<text>全部订单</text>
					 </view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		name:"my-userInfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState("m_user",["userinfo"])
		},
		methods:{
			...mapMutations("m_user",["updateUserInfo","updateAddress","updateToken"]),
			// 退出登录
		async logout(){
			const [err,succ]= await uni.showModal({
					title:"提示",
					content:"确定退出登录吗?"
				}).catch(err=>err)
				if(succ && succ.confirm){
					this.updateUserInfo({})
					this.updateAddress({})
					this.updateToken("")
				}
			}
		}
	}
</script>

<style lang="scss">
	
.my-userinfo-container{
	background-color: #F4F4F4;
	height: 100%;
	.top-box{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.avatar{
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #FFF;
			box-shadow: 0 1px 5px black;
		}
		.nickname{
			font-size: 16px;
			color: #fff;
			margin-top: 10px;
		}
	}
}
.panel-list{
	padding: 0px 10px;
	position: relative;
	top: -10px;
	.panel{
		background-color: white;
		border-radius: 3px;
		margin-bottom:8px;
		.panel-title{
			line-height: 45px;
			padding-left: 10px;
			font-size: 15px;
			border-bottom: 1px solid #F4F4F4;
		}
		.panel-list-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 15px;
			 padding: 0px 10px;
			 line-height: 45px;
		}
		.panel-body{
			display: flex;
           justify-content: space-between;
			.panel-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				padding: 10px 10px;
				font-size: 13px;
				.icon{
					width: 35px;
					height: 35px;
				}
			}
		}
	}
}
</style>
