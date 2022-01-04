<template>
 <view class="goods-item">
 	<!-- 左侧的盒子 -->
 	<view class="goods-item-left">
	<radio  :checked="item.goods_state" v-if="showRadio" @click="radioClickHandler"  color="#C00000"></radio>
		<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image></view>
 	<!-- 右侧盒子 -->
 	<view class="goods-item-right">
 		<view class="goods-name">{{  item.goods_name }}</view>
 		<view class="goods-info-box">
			<!-- 商品价格 -->
 			<view class="goods-price">￥{{ item.goods_price | tofixed }}</view>
			<uni-number-box v-if="showNumber" @change="numberChanfeHandler" :min="1" :value="item.goods_count"></uni-number-box>
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
		},
		// 是否展示图片左侧的radio
		showRadio:{
			type:Boolean,
			default:false
		},
		showNumber:{
			type:Boolean,
			default:false
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
	},
	methods:{
		radioClickHandler(){
			// 这是radio组件的点击事件处理函数
			this.$emit("radio-change",{
			// 商品id
			goods_id:this.item.goods_id,
			// 商品状态
			goods_state:!this.item.goods_state
				
			})
		},
		// 监听到了numberBox组件数量变化的事件
		numberChanfeHandler(val){
			this.$emit("num-change",{
			// 商品id
			goods_id:this.item.goods_id,
			goods_count:+val
				
			})
		}
	}
};
</script>

<style lang="scss">
.goods-item {
	width: 750rpx;
	box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
	background-color: #FFFFFF;
  margin-bottom: 5px ;
    .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
    display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }
  .goods-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
