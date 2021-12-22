<template>
	<view >
		<view class="search-box">
			<!-- 使用uni的搜索组件 -->
			<uni-search-bar cancelButton="none" :radius="100" placeholder="请输入搜索内容"  @input="input" ></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		 <view class="sugg-list" v-if="searchResults.length!==0">
			 <view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
			 	<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			 </view>
		</view>
	      <!-- 搜索历史 -->
		  <view class="history-box" v-else>
		  	 <!-- 标题区 -->
			<view class="hostory-title">
			 	   <text>搜索历史</text>
				   <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			 </view>
			 <!-- 列表区 -->
			<view class="hostory-list">
			 	<uni-tag :text="item" v-for="(item,i) in historys" @click="gotoGoodsList(item)" :key="i" >
				</uni-tag>
			 </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:"",
				// 搜索结果列表
				searchResults:[],
				// 搜索关键字的历史信息
				historyList:[]
			};
		},
		onLoad() {
			 this.historyList=JSON.parse(uni.getStorageSync("kw") || "[]")
		},
		methods:{
			// input的输入事件
		  input(e){
			  clearTimeout(this.time)
			  // 处理input防抖操作
			 this.time=setTimeout(()=>{
				   this.kw=e
				   this.getSearchList()
			   },500)
			   
		  },
		  // 接口数据初始化
		async getSearchList(){
			// 判断搜索有关键词是否为空
			  if(this.kw.length===0){
				  this.searchResults=[]
				  return
			  } 
				const {data:res}= await uni.$http.get('/api/public/v1/goods/qsearch',{query: this.kw})
				if (res.meta.status !== 200) return uni.$showMsg('搜索列表数据请求失败！', 'error');
				this.searchResults = res.message;
				this.saveSearchHistory()
				if(this.searchResults.length<=0){
					uni.$showMsg('没有此商品','error');
				}
		  },
		  // 商品跳转
		  gotoDetail(item){
			  uni.navigateTo({
			  	url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
			  })
		  },
		  // 搜索历史push方法
		  saveSearchHistory(){
			  const set=new Set(this.historyList)
			  set.delete(this.kw)
			   set.add(this.kw)
			  this.historyList=Array.from(set)
			  // 把历史数据存储在setStorageSync中,进行永久保持化
			  uni.setStorageSync("kw",JSON.stringify(this.historyList))
		  },
		  // 清空搜索历史记录
		  clearHistory(){
			  this.historyList=[]
			  uni.setStorageSync("kw",[])
		  },
		  // 点击tog标签跳转到对应商品
		  gotoGoodsList(kw){
			  uni.navigateTo({
			  	url:'/subpkg/goods_list/goods_list?query=' + kw
			  })
		  }
		},
		computed:{
			historys(){
				return [...this.historyList].reverse() 
			}
		}
	}
</script>

<style lang="scss">
.search-box{
position: sticky;
  top: 0px;
  z-index: 9999;
}
.sugg-list{
	padding: 0px 5px;
	.sugg-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 13px 0px;
		font-size: 12px;
		border-bottom:1px solid  #efefef;
		.goods-name{
			 white-space: nowrap;
			 overflow: hidden;
			 text-overflow: ellipsis;
		}
	}
}
.history-box{
	padding: 0px 5px;
	.hostory-title{
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.hostory-list{
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		.uni-tag{
			margin: 0px 5px;
		
		}
		
	}
}
</style>
