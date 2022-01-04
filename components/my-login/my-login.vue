<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUseInfo">一键登录</button>
		<text class="tips-text">登陆后尽显更多优惠</text>
	</view>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default {
	name: 'my-login',
	data() {
		return {};
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken',"updateRedirectInfo"]),
		// 用户授权之后	获取用户的基本信息
		getUseInfo(e) {
			// 判断用户是否授权
			if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('你取消了登录授权 ！', 'error');
			this.updateUserInfo(e.detail.userInfo);
			this.getToken(e.detail);
		},

		// 调用登录接口,换取永久的token
		async getToken(info) {
			// 获取code对应的值 调用微信设备的登录接口
			const [err, res] = await uni.login().catch(err => err);
			// 判断是否wx.login() //调用失败
			if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！',"error");

			// 准备参数
			const query = {
				code: res.code,
				encryptedData: info.encryptedData,
				iv: info.iv,
				rawData: info.rawData,
				signature: info.signature
			};
			// 换取token
			const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin',query);			console.log(loginResult,"123231")
			if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！',"error");

			// 直接把token保存到vuex中
			this.updateToken(loginResult.message.token);
			this.navigateBack()
		},
		navigateBack(){
			if(this.redirectInfo&&this.redirectInfo.openType==="seitchTab"){
				uni.switchTab({
					url:this.redirectInfo.from,
					complete: () => {
						this.updateRedirectInfo(null)
					}
				})
			}
		}
	},
	computed:{
		...mapState("m_user",["redirectInfo"])
	}
};
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	&::after {
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0px;
		left: 0px;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0px;
		background-color: #c00000;
	}
	.tips-text {
		font-size: 12px;
		color: gray;
	}
}
</style>
