<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"><image :src="item.image_src"></image></navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-list" v-for="(item, i) in NavList" :key="i" @click="navClickHandler(item)"><image :src="item.image_src" class="nav-img"></image></view>
		</view>
		<!-- 楼层数据 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view  class="floor-img-box">
					<navigator :url="item.product_list[0].url" class="left-img-box" >
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}"  mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator  class="right-img-item" v-for="(ite,i) in item.product_list" :key="i" v-if="i !==0" :url="ite.url">
							  <image :src="ite.image_src" :style="{width:ite.image_width+'rpx'}"  mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 定义轮播图数据
			swiperList: [],
			// 分类导航数据
			NavList: [],
			// 楼层数据
			floorList: []
		};
	},
	onLoad() {
		// 调用方法,获取轮播图的数据
		this.getSwiperList(), this.getNavList(), this.getFloorList();
	},
	methods: {
		// 轮播图数据方法
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');

			// 请求失败
			if (res.meta.status !== 200) return uni.$showMsg('轮播图数据请求失败！', 'error');
			this.swiperList = res.message;
			uni.$showMsg('数据请求成功', 'success');
		},
		// 导航数据方法
		async getNavList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
			// 请求失败
			if (res.meta.status !== 200) return uni.$showMsg('导航数据请求失败！', 'error');
			this.NavList = res.message;
		},
		// 点击导航跳转每一项
		navClickHandler(item) {
			switch (item.name) {
				case '分类':
					uni.switchTab({
						url: '/pages/cate/cate'
					});
					break;
			}
		},
		// 楼层数据方法
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
			// 请求失败
			if (res.meta.status !== 200) return uni.$showMsg('楼层数据请求失败！', 'error');
	        // 对跳转数据进行处理
			 res.message.forEach(floor=>{
				 floor.product_list.forEach(prod=>{
					 prod.url="/subpkg/goods_list/goods_list?"+prod.navigator_url.split("?")[1]
				 })
			 })
			this.floorList = res.message;
		}
	}
};
</script>

<style lang="scss">
swiper {
	height: 330rpx;
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-list {
		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
}
.floor-title {
	width: 100%;
	height: 60rpx;
}
.floor-img-box{
	display: flex;
	padding-left:10rpx ;
}
.right-img-box{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
</style>
