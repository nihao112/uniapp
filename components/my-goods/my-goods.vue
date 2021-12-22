<template>
 <view class="goods-item1">
 	<!-- 左侧的盒子 -->
 	<view class="goods-item-left"><image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image></view>
 	<!-- 右侧盒子 -->
 	<view class="goods-item-right">
 		<view class="goods-name">{{ item.goods_name }}</view>
 		<view class="goods-info-box">
 			<view class="goods-price">￥{{ item.goods_price | tofixed }}</view>
 		</view>
 	</view>
 </view>
	
</template>

<script>
export default {
	name: 'my-goods',
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			// 定义默认图片
			defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
		};
	},
	filters: {
		tofixed(num) {
			return Number(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss">
	.goods-item-left {
		margin-right: 5px;
		.goods-pic {
	    width: 170.99999999999997px;
	    height: 170.99999999999997px;
		display: block;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		}
	}
	.goods-item-right {
		.goods-name {
		
			font-size: 13px;
			margin-top: 5px;
		}
		.goods-info-box {
			.goods-price {
				color: #c00000;
				font-size: 16px;
				margin-top: 10px;
				position: absolute;
				bottom: 10px;
			}
		}
	}
</style>
