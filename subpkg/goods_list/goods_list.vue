<template>
	<view>
		<view class="goods-list">
			<view class="goods-item" v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
					<my-goods  :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 这是请求参数对象
			queryObj: {
				// 搜索关键词
				query: '',
				// 商品分类id
				cid: '',
				// 页码值
				pagenum: 1,
				// 每页显示多少条数据
				pagesize: 15
			},
			// 商品列表数据
			goodsList: [],
			// 总页数,实现分页
			total: '',
			// 节流阀是否再在请求数据
			isloading:false
			
		};
	},
	onLoad(options) {
		// 将页面参数赋值到queryobj中
		this.queryObj.query = options.query || '';
		this.queryObj.cid = options.cid || '';
		// 调用商品列表数据的方法
		this.getGoodsList();
		
	},
	methods: {
		async getGoodsList(cb) {
			// 打开节流阀
			this.isloading=true
			// 获取商品列表数据的方法
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
		    if (res.meta.status !== 200) return uni.$showMsg("商品请求错误",'error')
			// 关闭节流阀
			this.isloading=false
			// 关闭当前数据用回调函数关闭下拉刷新
			cb&&cb()
			this.goodsList =[...this.goodsList,...res.message.goods] 
			this.total = res.message.total;
		},
		gotoDetail(item){
			uni.navigateTo({
				url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
			})
		}
	},
	// 当下拉接触到底部时候触发
	onReachBottom() {
		// 当前页码乘以每页的值判断数据加载
		if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕！')
		if(this.isloading) return
			// 让页码值自增+1
			this.queryObj.pagenum++
			// 然后调用接口方法
			this.getGoodsList()	
	},
	// 下拉刷新
	onPullDownRefresh() {
	  // 重置关键函数
		  this.queryObj.pagenum=1
		  this.total=0
		  this.isloading=false
		  this.goodsList=[]
		  // 重新发起数据请求
		  this.getGoodsList(()=>{uni.stopPullDownRefresh()})
	}
};
</script>

<style lang="scss">

</style>
