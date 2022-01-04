export default{
	// 开启命名空间
	namespaced:true,
	// 数据
	state:()=>({
		address:JSON.parse(uni.getStorageSync("address") || "{}"),
		token:uni.getStorageSync("token") || "",
		// 用户信息对象
		userinfo:JSON.parse( uni.getStorageSync("userinfo") || "{}"),
		// 重定向的object对象
		redirectInfo:null
	}),
	// 方法
	mutations:{
		updateAddress(state,address){
			state.address=address
			// 通过comit调用方法
			this.commit("m_user/saveSddressTostorage")
		},
	// 将收货地址存储永久化
	saveSddressTostorage(state){
		uni.setStorageSync("address",JSON.stringify(state.address))
	},
	// 用户信息
	updateUserInfo(state,userinfo){
		 // 把用户信息对象赋值给state中
		state.userinfo=userinfo
		this.commit("m_user/saveUserInfoToStorage")
	},
	saveUserInfoToStorage(state){
		uni.setStorageSync("userinfo",JSON.stringify(state.userinfo))
	},
	updateToken(state,token){
	// 给token赋值
		state.token=token
		this.commit("m_user/saveTokenToStorage")
	},
	// 存储token值
	saveTokenToStorage(state){
		uni.setStorageSync("token",state.token)
	},
	updateRedirectInfo(state,info){
		state.redirectInfo=info
		console.log(state.redirectInfo)
	}
	},
		// 数据包装包
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ""
		  return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}