<template>
	<toolFix :scroolltop="scroolltop"></toolFix>
	<pageInsert title="分类">
		<view class="content">
			<view class="category-lists">
				<view class="category-list flex">
					<text class="taglist-item" v-for="item in clssList" :key="item"
						@click="toclasspost(item)">{{item}}</text>
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
	import {
		onPageScroll
	} from "@dcloudio/uni-app"

	//页面滚动
	const scroolltop = ref(0);
	onPageScroll((e) => {
		scroolltop.value = e.scrollTop;
	});
	//列表数据
	const clssList = ref([])
	onMounted(() => {
		const {
			postclass
		} = JSON.parse(uni.getStorageSync("userinfo"));
		clssList.value = postclass;
	});
	//点击分类
	const toclasspost = (tag) => {
		uni.navigateTo({
			url: `/pages/archive/archive?class=${tag}`
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

		.category-list {
			justify-content: space-between;
			flex-direction: column;
			padding-left: 50rpx;
		}

		.taglist-item {
			position: relative;
			margin: 12rpx 0rpx;
			padding: 4rpx 10rpx 4rpx 40rpx;
			font-size: 30rpx;
			color: #4c4948;

			&:before {
				content: '';
				position: absolute;
				top: 10rpx;
				left: 0rpx;
				border: 6rpx solid #49b1f5;
				width: 14rpx;
				height: 14rpx;
				border-radius: 14rpx;
			}

			&:hover:before {
				border-color: #ff7242;
			}

			&:hover {
				color: #49b1f5;
			}
		}
	}
</style>