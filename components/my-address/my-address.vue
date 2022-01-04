<template>
	<view>
		<!-- 收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" @click="chooseAddress" size="mini" class="btnChooseAddress">请选择收货地址 +</button>
		</view>
		<!-- 渲染收货地址的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：{{ address.userName }}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{ address.telNumber }}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{ addstr }}</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="../../static/cart_border@2x.png" class="addres-border"></image>
	</view>
</template>

<script>
import { mapState, mapMutations,mapGetters  } from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
			};
		},
		methods:{
			...mapMutations("m_user",["updateAddress"]),
			 async chooseAddress(){ 
				 // 获取用户的收获地址
				const [err,succ]=await uni.chooseAddress().catch(err=>err)
				if(err===null&&succ.errMsg==="chooseAddress:ok"){
					this.updateAddress(succ)
				}
				// 用户授权 无论苹果或安卓都能进入到授权页面
				if(err&&(err.errMsg==="chooseAddress:fail auth deny"||err.errMsg==="chooseAddress:fail authorize no response")){
				// 通过调用这个方法,让用户重新授权
					this.reAuth()
				}
			},
			// 让用户重新授权
			 async reAuth(){
				// 提示用户对地址进行授权
				const [err2,confirmResult]=await uni.showModal({
					content:"检测到你没打开地址授权，是否设置打开？",
					confirmText:"确定",
					confirmText:"取消"
				})
				// 如果弹窗异常,则直接退出
				if(err2) return
				如果用户点击了取消,则提示用户你取消了地址授权
				 if(confirmResult.cancel) return uni.$showMsg("你取消了地址授权","error")
				 // 如果用户点击了确认则调用uni.openSetting方法进入授权页面,让用户重新进行授权
				 if(confirmResult.confirm) return uni.openSetting({
                    // 授权结束,需要对授权的结果做进一步的判断
                   success:(settingResult)=>{
						if(settingResult.authSetting["scope.address"]) return uni.$showMsg("授权成功！请选择地址","success")
							// 地址授权等于false提示用户 "你取消了地址授权"
					     if(!settingResult.authSetting["scope.address"]) return uni.$showMsg("你去取消了授权","error")
					}
				 })
			}
		},
		computed:{
			// 调用vuex的收货地址
		 ...mapState('m_user', ['address']),
		 // 将vuex中的addstr映射到组件中
		  ...mapGetters("m_user",["addstr"])
		}
	}
</script>

<style lang="scss">
.address-choose-box {
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.addres-border {
	display: block;
	width: 100%;
	height: 5px;
}
.address-info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0px 5px;
	.row1 {
		display: flex;
		justify-content: space-between;

		.row1-right {
			display: flex;
			justify-content: space-between;
		}
	}
	.row2 {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
