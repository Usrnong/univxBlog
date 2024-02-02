<template>
	<view class="tagcontent flex">
		<view class="tagitem flex" v-for="item in taglist" @click="tagpostpage(item.name)" :key="item.name">
			<view class="flex" style="align-items: center;">
				<view class="iconfont" :class="item.icon" style="margin-right: 20rpx;"></view>
				<text>{{item.name}}{{`(${item.total})`}}</text>
			</view>
			<view class="iconright">
				<view class="iconfont icon-Down"></view>
			</view>
		</view>
		<view class="more" @click="totagpage">
			<text>查看更多...</text>
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
	
	
	const taglist = ref([]);
	const iconlist = {
		"vue": "icon-Vue",
		"react": "icon-React",
		"webpack": "icon-webpack",
		"default": "icon-biaoqian",
		"test": "icon-_mianshijianli",
		"linux": "icon-linux"
	}
	onLoad(async () => {
		await $onLaunched;
		if (!uni.getStorageSync("TagCount")) {
			const cloudPost = uniCloud.importObject('getPostInfo');
			let tagarr = JSON.parse(uni.getStorageSync("userinfo")).posttags;
			cloudPost.getClssCount(tagarr, "tag").then((res) => {
				uni.setStorage({
					key: "TagCount",
					data: JSON.stringify(res)
				});
				taglist.value = res;
			});
		} else {
			taglist.value = JSON.parse(uni.getStorageSync("TagCount"));
		}
		if (taglist.value.length > 4) taglist.value.length = 4;
		taglist.value.forEach(item=>{
			if(item.name === "vue"){
				item.icon = iconlist.vue
			}else if(item.name === "react"){
				item.icon = iconlist.react
			}else if(item.name === "webpack"){
				item.icon = iconlist.webpack
			}else if(item.name === "八股文"){
				item.icon = iconlist.test
			}else if(item.name === "linux"){
				item.icon = iconlist.linux
			}else{
				item.icon = iconlist.default
			}
		})
	});
	//跳转到标签页
	const totagpage = () => {
		uni.navigateTo({
			url: "/pages/pagetag/pagetag"
		});
	}
	//点击标签
	const tagpostpage = (tag) => {
		uni.navigateTo({
			url: `/pages/archive/archive?tag=${tag}`
		});
	}
</script>

<style lang="scss" scoped>
	.tagcontent {
		width: 720rpx;
		background-color: $uni-bgligt-color;
		justify-content: center;
		flex-direction: column;
		border: solid 2rpx #bcb9b9;
		border-radius: 60rpx;
		padding: 50rpx;
		margin-top: 60rpx;

		.tagitem {
			width: 630rpx;
			height: 104rpx;
			background: none;
			background-color: rgb(242, 242, 242);
			margin-bottom: 40rpx;
			justify-content: space-between;
			align-items: center;
			padding: 0rpx 20rpx;
			font-size: 40rpx;
			border-radius: 20rpx;

			.icon-Vue {
				color: #41b883;
			}

			.icon-React {
				color: #aeebfb;
			}

			.icon-webpack {
				color: #1c78c0;
			}
		}

		.more {
			width: 100%;
			text-align: center;
			font-size: 30rpx;
			color: #888888;
		}
	}
</style>