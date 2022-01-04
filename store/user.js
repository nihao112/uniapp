export default{
	// 开启命名空间
	namespaced:true,
	// 数据
	state:()=>({
		address:JSON.parse(uni.getStorageSync("address") || "{}")
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