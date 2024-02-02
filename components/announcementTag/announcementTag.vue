<template>
	<view class="announcement-tag">
		<view class="title flex">
			<view class="iconfont icon-gonggaoS"></view>
			<text>公告</text>
		</view>
		<view class="content">
			<text>{{announcementstr}}</text>
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
	const announcementstr = ref("");
	onMounted(async () => {
		await $onLaunched;
		const {
			announcement
		} = JSON.parse(uni.getStorageSync("userinfo"));
		announcementstr.value = announcement
	})
</script>

<style lang="scss" scoped>
	.announcement-tag {
		width: 720rpx;
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid rgb(169, 169, 169);
		padding: 40rpx 48rpx;
		margin-top: 40rpx;
		border-radius: 36rpx;

		.title {
			font-size: 50rpx;
			justify-content: flex-start;
			align-items: center;

			.iconfont {
				margin-right: 20rpx;
				animation: fa-shake 1s infinite linear;
				color: #ff0000;
			}
		}

		.content {
			font-size: 32rpx;
		}
	}

	@keyframes fa-shake {
		0% {
			-webkit-transform: rotate(-15deg);
			transform: rotate(-15deg)
		}

		4% {
			-webkit-transform: rotate(15deg);
			transform: rotate(15deg)
		}

		8%,
		24% {
			-webkit-transform: rotate(-18deg);
			transform: rotate(-18deg)
		}

		12%,
		28% {
			-webkit-transform: rotate(18deg);
			transform: rotate(18deg)
		}

		16% {
			-webkit-transform: rotate(-22deg);
			transform: rotate(-22deg)
		}

		20% {
			-webkit-transform: rotate(22deg);
			transform: rotate(22deg)
		}

		32% {
			-webkit-transform: rotate(-12deg);
			transform: rotate(-12deg)
		}

		36% {
			-webkit-transform: rotate(12deg);
			transform: rotate(12deg)
		}

		40%,
		to {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg)
		}
	}
</style>