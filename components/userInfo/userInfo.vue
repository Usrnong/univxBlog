<template>
	<view class="card-info flex">
		<view class="id-center flex">
			<image class="id-cover" :src="user.avatar" mode="scaleToFill"></image>
			<text class="name">{{user.name}}</text>
			<text class="signature">{{user.motto}}</text>
		</view>
		<view class="tag-center flex">
			<view class="tagtip flex" @click="toarchive">
				<text>文章</text>
				<text>{{posttotal}}</text>
			</view>
			<view class="tagtip flex" @click="toclasspage">
				<text>分类</text>
				<text>{{user.postclass.length}}</text>
			</view>
			<view class="tagtip flex" @click="topagetag">
				<text>标签</text>
				<text>{{user.posttags.length}}</text>
			</view>
		</view>
		<view class="githubbutton flex" @click="cgithub">
			<view class="iconfont icon-github"></view><text>Follow Me</text>
		</view>
		<view class="more-link flex">
			<view class="iconfont icon-QQ befer" @click="cqq"></view>
			<view class="iconfont icon-weixin after" @click="cwx"></view>
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
	const user = ref({
		"avatar": "",
		"name":"",
		"motto":"",
		"posttags":[],
		"postclass":[]
	});
	let posttotal = ref(0);
	onMounted(async() => {
		await $onLaunched;
		// 获取用户信息
		
		user.value = JSON.parse(uni.getStorageSync("userinfo"));
		// 获取文章总数
		posttotal.value = uni.getStorageSync("postTotal");
	});
	const cgithub = () => {
		uni.setClipboardData({
			data: 'https://github.com/Usrnong?tab=repositories',
			showToast: false,
			success: function() {
				uni.showToast({
					icon: "none",
					title: "github地址已复制到剪切板，请前往浏览器打开"
				})
			}
		});
	};
	const cqq = () => {
		uni.setClipboardData({
			data: '1208399284',
			showToast: false,
			success: function() {
				uni.showToast({
					icon: "none",
					title: "QQ账号已复制到剪切板"
				})
			}
		});
	};
	const cwx = () => {
		uni.setClipboardData({
			data: 'msx7200720',
			showToast: false,
			success: function() {
				uni.showToast({
					icon: "none",
					title: "微信号已复制到剪切板"
				})
			}
		});
	}
	//点击文章
	const toarchive = () => {
		uni.navigateTo({
			url: '/pages/archive/archive?all=1'
		})
	}
	//点击bi标签
	const topagetag = () => {
		uni.navigateTo({
			url: '/pages/pagetag/pagetag'
		})
	}
	//点击分类
	const toclasspage = () => {
		uni.navigateTo({
			url: '/pages/classpage/classpage'
		})
	}
</script>

<style lang="scss" scoped>
	.card-info {
		width: 720rpx;
		height: 760rpx;
		margin-top: 40rpx;
		background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
		box-shadow: 0 0 5px rgb(66, 68, 68);
		animation: Gradient 8s ease infinite !important;
		background-size: 400% 400%;
		border-radius: 36rpx;
		border: 1px solid rgb(169, 169, 169);
		justify-content: center;
		flex-direction: column;
		align-items: center;

		.id-center {
			width: 100%;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			margin-bottom: 30rpx;

			.name {
				margin-top: 20rpx;
				font-size: 44rpx;
			}

			.signature {
				font-size: 30rpx;
			}

			.id-cover {
				width: 220rpx;
				height: 200rpx;
				border-radius: 50%;
				overflow: hidden;
			}
		}

		.tag-center {
			width: 100%;
			padding: 0px 100rpx;
			justify-content: space-around;
			align-items: center;
			font-size: 36rpx;

			.tagtip {
				justify-content: center;
				align-items: center;
				flex-direction: column;
			}
		}

		.githubbutton {
			width: 620rpx;
			height: 68rpx;
			background-color: #3eb8be;
			color: #ffffff;
			line-height: 68rpx;
			text-align: center;
			border-radius: 16rpx;
			margin-top: 28rpx;
			justify-content: center;
			align-items: center;
			font-size: 26rpx;
			cursor: pointer;
			z-index: 1;

			.iconfont {
				margin-right: 20rpx;
			}
		}

		.more-link {
			justify-content: center;
			align-items: center;
			width: 620rpx;
			height: 68rpx;
			margin-top: 20rpx;
			font-size: 50rpx;
			z-index: 1;

			.befer {
				margin-right: 20rpx;
			}

			.after {
				margin-left: 20rpx;
			}
		}

	}

	@keyframes Gradient {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}
</style>