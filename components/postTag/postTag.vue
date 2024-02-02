<template>
	<view class="post-tag">
		<view class="_title flex">
			<view class="iconfont icon-biaoqian"></view>
			<text>标签</text>
		</view>
		<view class="content flex">
			<view class="tag" v-for="item in tagLists" :key="item" @click="totagpost(item)">
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	
	import {getCurrentInstance} from 'vue'
	const {proxy} = getCurrentInstance();
	const {$onLaunched} = proxy
	
	const tagLists = ref([]);
	onLoad(async() => {
		await $onLaunched
		const {
			posttags
		} = JSON.parse(uni.getStorageSync("userinfo"));
		tagLists.value = posttags;
	});
	//点击标签
	const totagpost = (tag) => {
		uni.navigateTo({
			url: `/pages/archive/archive?tag=${tag}`
		});
	}
</script>

<style lang="scss" scoped>
	.post-tag {
		width: 720rpx;
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid rgb(169, 169, 169);
		padding: 40rpx 48rpx;
		margin-top: 40rpx;
		border-radius: 36rpx;

		._title {
			font-size: 50rpx;
			line-height: 80rpx;
			height: 80rpx;
			justify-content: flex-start;
			align-items: center;

			.iconfont {
				margin-right: 20rpx;
				color: #4c4948;
			}
		}

		.content {
			flex-direction: row;
			flex-wrap: wrap;

			.tag {
				margin: 30rpx 20rpx;
				border-radius: 16rpx;
				transition: all 0.2s;
				min-height: 60rpx;
				font-size: 30rpx;

				&:hover {
					color: #5ab1f5;
					font-size: 40rpx;
				}
			}
		}
	}
</style>