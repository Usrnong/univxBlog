<template>
	<view class="swiper-content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true"  indicator-active-color= "rgb(73, 177, 245)"
				:duration="300" @change="swiperChange" indicator-color = "rgba(255,255,255,0.5)">
				<swiper-item v-for="item in swiperList" :item-id="item._id" :key="item._id">
					<view class="swiper-item">
						<view class="itembox">
							<image class="swiperimg" :src="item.cover" mode="aspectFit"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="detail">
				<text class="tag date">{{itemDetail.date}}</text>
				<text class="tag title">{{itemDetail.title}}</text>
				<text class="tag desc">{{itemDetail.description}}</text>
				<button type="primary" class="buttondesc" @click="topostcontent(itemDetail._id)">详情</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref, toRaw
	} from 'vue';
	const swiperList = ref([]);
	const itemDetail = ref({});
	const cloudobj = uniCloud.importObject('getPostInfo');
	onMounted(()=>{
		cloudobj.getSwiperPost().then(res=>{
			swiperList.value = res.data;
			itemDetail.value = res.data[0];
		}).catch(err=>{
			throw new Error(err)
		})
	})
	const swiperChange = (event)=>{
		const showItem = toRaw(swiperList.value).filter((item)=>{
			return item._id == event.detail.currentItemId
		});
		[itemDetail.value]= showItem;
	}
	const topostcontent = (id) => {
		uni.navigateTo({
			url: `/pages/postcontent/postcontent?id=${id}`
		})
	};
</script>

<style lang="scss" scoped>
	.swiper-content {
		width: 720rpx;
		min-height: 820rpx;
		background-color: $uni-bgligt-color;
		margin-top: 120rpx;
		border: solid 2rpx #bcb9b9;
		border-radius: 60rpx;
		padding: 50rpx;

		.itembox {
			.swiperimg {
				width: 600rpx;
				height: 356rpx;
				border-radius: 50rpx;
			}

			.tag {
				display: block;
				background-color: pink;
			}
		}
		.detail{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			.tag{
				display: block;
				margin-top: 40rpx;
			}
			.date,.desc{
				font-size: $uni-font-size-desc;
			}
			.title{
				font-weight: bold;
				font-size: 44rpx;
			}
			.buttondesc{
				margin-top: 50rpx;
				width: 510rpx;
				height: 60rpx;
				line-height: 60rpx;
				background-color: #49b1f5;
			}
		}
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
</style>