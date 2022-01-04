export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart:JSON.parse(uni.getStorageSync("cart") || "[]" ),
  }),

  // 模块的 mutations 方法
  mutations: {
	  // 加入购物城
	  addToCart(state,goods){
		  // 根据提交的商品id，查询购物城中是否存在这件商品
		  // 如果不存在，则返回undefined，否则为查询的商品加入购物城
		const findResult=state.cart.find(item=>item.goods_id===goods.goods_id)
		
		if(!findResult){
			// 如果购物城没有这件商铺，则直接push
			state.cart.push(goods)
		}else{
			// 如果购物城有这件商品则直接让他的数量++
			findResult.goods_count++
		}
		  this.commit("m_cart/saveToStorage")
	  },
	  // 存储数据
	  saveToStorage(state){
		  uni.setStorageSync("cart",JSON.stringify(state.cart))
	  },
	  // 更新购物车中选中状态
	  updateGoodsState(state,goods){
		const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
		if(findResult){			
			findResult.goods_state=goods.goods_state
			this.commit("m_cart/saveToStorage")
		}
	  },
	  // 更新购物车中的商品的数量
	  updateGoodsCount(state,goods){
		  const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
		  
		  if(findResult){
		  	findResult.goods_count=goods.goods_count
		  	this.commit("m_cart/saveToStorage")
		  }
	  },
	  // 根据id从购物车中删除对应的商品信息
	  removeGoodsById(state,goods_id){
		  // 调用数组的filter方法进行过滤
		  state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
		  this.commit("m_cart/saveToStorage")
	  },
	  // 更新所有的商品勾选状态
	  updateAllGoodsState(state,newState){
		  state.cart.forEach(x=>x.goods_state=newState)
		  this.commit("m_cart/saveToStorage")
	  }
  },

  // 模块的 getters 属性
  getters: {
	  // 统计购物城商品总数量
	  total(state){
		return  state.cart.reduce((total,item)=>total+=item.goods_count,0)
	  },
	  // 渲染勾选商品的总数量
	  checkedCount(state){
		return  state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
	  },
	  // 渲染已勾选商品的总价格
	  checkedGoodsAmount(state){
		 return state.cart.filter(x => x.goods_state)
                   .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
                   .toFixed(2)
	  }
  }
}