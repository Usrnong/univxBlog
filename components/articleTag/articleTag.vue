<template>
	<view class="post_item" @click="topostcontent(item._id)" v-for="item in props.articlelist" :key="item._id">
		<view class="cover">
			<image class="post_cover"
				:src="item.cover"
				mode="scaleToFill"></image>
		</view>
		<view class="post_info flex">
			<text class="title">{{item.title}}</text>
			<text class="date">发表于{{item.date}}|{{item.tag}}|{{item.categories}}</text>
		</view>
	</view>
</template>

<script setup>
import { watch } from 'vue';
	const props = defineProps({
		articlelist: Array
	});
	const topostcontent = (id) => {
		uni.navigateTo({
			url: `/pages/postcontent/postcontent?id=${id}`
		})
	};
</script>

<style lang="scss" scoped>
	.post_item {
		margin-top: 30rpx;
		width: 720rpx;
		min-height: 700rpx;
		background-color: $uni-bgligt-color;
		border: solid 2rpx #bcb9b9;
		border-radius: 60rpx;
		overflow: hidden;

		.post_cover,
		.post_info,
		.title,
		.date {
			width: 100%;
			word-wrap: break-word;
		}

		.post_info {
			padding: 30rpx 50rpx;
			justify-content: flex-start;
			flex-direction: column;
			align-items: flex-start;

			.title {
				font-size: 40rpx;
				margin-bottom: 20rpx;
			}

			.date {
				font-size: 30rpx;
				color: #888888;
			}
		}
	}
</style>