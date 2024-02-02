<template>
	<view class="new-post" v-if="newpost">
		<view class="posttitle flex">
			<view class="iconfont icon-zuixingengxin"></view>
			<text>最新文章</text>
		</view>
		<view class="post-list flex" v-for="item in newpost" :key="item._id" @click="topostcontent(item._id)">
			<view class="post-cover">
				<image class="cover" :src="item.cover" mode="scaleToFill"></image>
			</view>
			<view class="post-detail flex">
				<text class="title">{{item.title}}</text>
				<text class="time">{{item.date}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	const couldapi = uniCloud.importObject("getPostInfo");
	const newpost = ref([]);
	const topostcontent = (id) => {
		uni.navigateTo({
			url: `/pages/postcontent/postcontent?id=${id}`
		})
	};
	onMounted(() => {
		couldapi.getnewpost().then(res => {
			
			newpost.value = res.data;
		})
	})
</script>

<style lang="scss" scoped>
	.new-post {
		width: 720rpx;
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid rgb(169, 169, 169);
		padding: 40rpx 48rpx;
		margin-top: 40rpx;
		border-radius: 36rpx;
		overflow: hidden;

		.posttitle {
			font-size: 50rpx;
			justify-content: flex-start;
			align-items: center;
			text-align: center;
			.iconfont {
				margin-right: 20rpx;
				animation: fa-shake 1s infinite linear;
				color: #4c4948;
			}
		}

		.post-list {
			padding: 12rpx 0rpx;

			.cover {
				width: 116rpx;
				height: 116rpx;
				overflow: hidden;
			}

			.post-detail {
				flex: 1;
				justify-content: space-around;
				flex-direction: column;
				padding-left: 20rpx;
				font-size: 40rpx;

				.title {
					color: #4c4948;
					font-size: 40rpx;
					white-space: nowrap;
					max-width: 500rpx;
					// display:-webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					// -webkit-line-clamp:2;
				}

				.time {
					color: #858585;
					font-size: 30rpx;
				}
			}
		}
	}
</style>