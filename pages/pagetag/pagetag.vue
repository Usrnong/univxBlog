<template>
	<toolFix :scroolltop="scroolltop"></toolFix>
	<pageInsert title="标签汇总">
		<view class="content">
			<view class="class-lists">
				<view class="class-list flex">
					<text class="class-item" v-for="(item,index) in taglists"
						@click="totagcrchive(item)">{{item}}</text>
				</view>
			</view>
		</view>
	</pageInsert>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	//随机字体颜色
	const randomColor = ref('');
	let red = Math.floor(Math.random() * 256);
	let green = Math.floor(Math.random() * 256);
	let blue = Math.floor(Math.random() * 256);
	randomColor.value = `rgb(${red},${green},${blue})`
	import {
		onPageScroll
	} from "@dcloudio/uni-app"

	//页面滚动
	const scroolltop = ref(0);
	onPageScroll((e) => {
		scroolltop.value = e.scrollTop;
	})
	//标签列表
	const taglists = ref([]);
	onMounted(() => {
		const {
			posttags
		} = JSON.parse(uni.getStorageSync("userinfo"));
		taglists.value = posttags;
	});
	//点击跳转标签的相关文章
	const totagcrchive = (tag) => {
		uni.navigateTo({
			url: `/pages/archive/archive?tag=${tag}`
		});
	}
</script>

<style lang="scss" scoped>
	.content {
		background: rgba(251, 251, 251, 0.5);
		border: rgba(251, 251, 251, 0);
		border-radius: 40rpx;
		box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
		padding: 72rpx 28rpx;
		width: 720rpx;

		.class-list {
			justify-content: space-around;
			flex-wrap: wrap;
			min-height: 100rpx;
			font-size: 50rpx;
			color: v-bind(randomColor);

			.class-item {
				margin: 20rpx 40rpx;

				&:hover {
					color: #49b1f5;
				}
			}
		}
	}
</style>