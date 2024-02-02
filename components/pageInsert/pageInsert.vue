<template>
	<view class="page-insert">
		<view class="header flex flex-center">
			<text>{{title? title: '---'}}</text>
		</view>
		<view class="insert-content flex flex-center">
			<slot></slot>
			<userInfo></userInfo>
			<announcementTag></announcementTag>
			<newPost></newPost>
			<postClassify></postClassify>
			<postTag></postTag>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		"title": String
	})
</script>

<style lang="scss" scoped>
	.page-insert {
		min-height: 100vh;
		.header {
			flex-direction: column;
			width: 750rpx;
			height: 400rpx;
			background-color: rgba(0, 0, 0, 0.3);
			color: #fff;
			font-size: 60rpx;
			animation: header-effect 1s;
		}

		.insert-content {
			width: 750rpx;
			flex-direction: column;
			margin-top: 50rpx;
			animation: bottom-top 1s;
		}
	}
</style>