<template>
	<view class="post-class">
		<view class="_title flex">
			<view class="iconfont icon-fenlei"></view>
			<text>分类</text>
		</view>
		<view class="content flex">
			<view class="tag flex" v-for="item in classLists" :key="item.name" @click="toclasspost(item.name)">
				<text>{{item.name}}</text>
				<text>{{item.total}}</text>
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
	const classLists = ref({});
	onLoad(async() => {
		await $onLaunched;
		if (!uni.getStorageSync("ClssCount")) {
			const cloudPost = uniCloud.importObject('getPostInfo');
			let classarr = JSON.parse(uni.getStorageSync("userinfo")).postclass;
			cloudPost.getClssCount(classarr,"class").then((res) => {
				uni.setStorage({
					key: "ClssCount",
					data: JSON.stringify(res)
				});
				classLists.value = res;
			});
		} else {
			classLists.value = JSON.parse(uni.getStorageSync("ClssCount"));
		}
	})
	//点击分类
	const toclasspost=(tag)=>{
		uni.navigateTo({
			url: `/pages/archive/archive?class=${tag}`
		});
	}
</script>

<style lang="scss" scoped>
	.post-class {
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
			justify-content: space-between;
			flex-wrap: wrap;
			font-size: 35rpx;

			.tag {
				flex-direction: column;
				align-items: center;
				min-width: 160rpx;
				min-height: 140rpx;
				margin: 8rpx 0rpx;
				border-radius: 16rpx;
				transition: all 0.4s;

				&:hover {
					color: rgb(0, 0, 0);
					background-color: rgba(114, 172, 108, 0.669);
					box-shadow: 10px 10px 10px rgba(41, 59, 40, 0.997);
				}
			}
		}
	}
</style>