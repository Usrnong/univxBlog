<template>
	<toolFix :scroolltop="scroolltop"></toolFix>
	<pageInsert :title="pagetitle">
		<view class="content">
			<view class="article-sort-title">
				<text>文章总览 - {{pagination.totalNum}}</text>
			</view>
			<view class="article-sort">
				<view class="article-sort-item" v-for="item in postList" :key="item._id">
					<view class="article-sort-item-info">
						<view class="article-sort-item-time flex">
							<view class="iconfont icon-riqi"></view> <text>{{item.date}}</text>
						</view>
						<view class="article-sort-item-title" @click="topostcontent(item._id)">
							<text class="text">{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page flex-center flex">
				<constPagination :totalNum="pagination.totalNum" :pageSize="pagination.pageSize"
					:current="pagination.current" @changeSize="changeSize"></constPagination>
			</view>
		</view>
	</pageInsert>
</template>

<script setup>
	import {
		onPageScroll,
		onLoad
	} from "@dcloudio/uni-app"
	import {
		onMounted,
		ref
	} from 'vue';
	//文章列表
	const postList = ref([]);
	//页面标题
	const pagetitle = ref("");
	//页面滚动
	const scroolltop = ref(0);
	onPageScroll((e) => {
		scroolltop.value = e.scrollTop;
	});
	//分页数据
	const pagination = ref({
		"totalNum": 0,
		"pageSize": 5,
		"current": 1
	})
	let pagekey = {
		"key":"",
		"value":""
	};
	const topostcontent = (id) => {
		uni.navigateTo({
			url: `/pages/postcontent/postcontent?id=${id}`
		})
	};
	const cloudapi = uniCloud.importObject("getPostInfo");
	const changeSize = (num) => {
		cloudapi.getPostofclassify({
			"key": pagekey.key,
			"value": pagekey.value,
			"pagesize": pagination.value.pageSize,
			"page": num,
		}).then(res => {
			postList.value = res.data
		})
	}
	//获取参数,只有在onLoad才能获取query参数
	onLoad((e) => {
		pagekey.key = Object.keys(e)[0];
		pagekey.value = e[pagekey.key];
		if (Object.keys(e)[0] === "all") {
			pagetitle.value = "时间轴";
			cloudapi.getPostofclassify({
				"key": pagekey.key,
				"value": "",
				"pagesize": pagination.value.pageSize,
				"page": pagination.value.current,
			}).then(res => {
				postList.value = res.data;
				pagination.value.totalNum = res.total
			})
		} else {
			pagetitle.value =pagekey.value;

			cloudapi.getPostofclassify({
				"key": pagekey.key,
				"value": pagekey.value,
				"pagesize": pagination.value.pageSize,
				"page": pagination.value.current,
			}).then(res => {
				postList.value = res.data;
				pagination.value.totalNum = res.total
			})
		}
	})
	onMounted(() => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 100
		});
	})
	//获取相关文章
</script>

<style lang="scss" scoped>
	.content {
		background: rgba(251, 251, 251, 0.5);
		border: rgba(251, 251, 251, 0);
		border-radius: 40rpx;
		box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
		padding: 72rpx 28rpx;
		width: 720rpx;

		.article-sort-title {
			position: relative;
			margin-left: 20rpx;
			padding-bottom: 40rpx;
			padding-left: 40rpx;
			font-size: 50rpx;

			&::before {
				position: absolute;
				top: calc(((100% - 72rpx) / 2));
				left: -18rpx;
				z-index: 1;
				width: 20rpx;
				height: 20rpx;
				border: 10rpx solid #49b1f5;
				border-radius: 20rpx;
				background: #fff;
				content: '';
				line-height: 20rpx;
				transition: all 0.2s ease-in-out;
			}

			&::after {
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 0;
				width: 4rpx;
				height: 80rpx;
				background: #aadafa;
				content: '';
			}
		}

		.article-sort {
			margin-left: 20rpx;
			padding-left: 20rpx;
			border-left: 4rpx solid #aadafa;

			.article-sort-item {
				position: relative;
				height: 160rpx;
				margin: 0 0 40rpx 20rpx;
				line-height: 2;

				&::before {
					position: absolute;
					left: calc((-107rpx / 2));
					top: 70rpx;
					width: 12rpx;
					height: 12rpx;
					border-radius: 12rpx;
					background: #fff;
					content: '';
					border: 6rpx solid #49b1f5;
					transition: all 0.2s ease-in-out;
				}

				.article-sort-item-time {
					color: #858585;
					font-size: 80%;
				}

				.article-sort-item-title {
					color: #4c4948;
					font-size: 32rpx;
					max-height: 120rpx;
					overflow: hidden;
					transition: all 0.2s ease-in-out;
					;

					.text {
						display: -webkit-box;
						height: 160rpx;
						overflow: hidden;
						word-wrap: break-word;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						text-overflow: ellipsis;
					}

					&:hover {
						color: #49b1f5;
						transform: translateX(20rpx);
					}

				}
			}
		}
	}

	// }
</style>