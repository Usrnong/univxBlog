<!-- 文章详情页面 -->
<template>
	<view class="warp">
		<toolFix :scroolltop="scroolltop"></toolFix>
		<view class="content flex">
			<view class="header flex flex-center header-effect">
				<text>{{postobj.title? postobj.title: '暂无标题'}}</text>
				<text class="date">发表于{{postobj.date}} | {{postobj.tag}} | {{postobj.categories}}</text>
			</view>
			<view class="bottom-top content-text">
				<ua-markdown :source="mdvalue" :showLine="true" />
			</view>
			<view class="content-info" v-if="contentinfo">
				<view class="posttag" @click="clickTag(postobj.tag)">
					<text>{{postobj.tag}}</text>
				</view>
				<view class="preandnext">
					<view class="pre-post" v-if="nextcontrl.pre" @click="topostcontent(prepost._id)">
						<text>上一篇</text>
						<text class="text">{{prepost.title}}</text>
					</view>
					<view class="next-post" v-if="nextcontrl.next" @click="topostcontent(nextpost._id)">
						<text>下一篇</text>
						<text class="text">{{nextpost.title}}</text>
					</view>
				</view>
			</view>
			<view v-if="contentinfo">
				<userInfo></userInfo>
				<announcementTag></announcementTag>
				<newPost></newPost>
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
		onPageScroll,
		onLoad
	} from "@dcloudio/uni-app"

	//页面滚动
	const scroolltop = ref(0);
	onPageScroll((e) => {
		scroolltop.value = e.scrollTop;
	});
	const coverurl = ref("url('https://i0.hippopx.com/photos/27/812/1024/landscape-autumn-fog-village-thumb.jpg')");
	const mdvalue = ref("# 正在拉取内容……");
	const cloudapi = uniCloud.importObject("getPostInfo");

	//文章相关
	const postobj = ref({
		"_id": "",
		"title": "",
		"description": "",
		"tag": "",
		"categories": "",
		"cover": "",
		"date": "",
		"contentLink": "",
		"swiper": ""
	});
	//上一篇下一篇
	const prepost = ref({
		"_id": "",
		"title": ""
	})
	const nextcontrl = ref({
		"pre": true,
		"next": true
	})
	const nextpost = ref({
		"_id": "",
		"title": ""
	})
	//拉取内容
	const getcontent = (url) => {
		/* 小程序不兼容fetch */
		// fetch(url).then(res => res.text())
		// 	.then(content => {
		// 		mdvalue.value = content;
		// 		contentinfo.value = true;
		// 		cloudapi.getnextpost(postobj.value.tag, postobj.value.date).then(res=>{
		// 			prepost.value = res.prepost[0]
		// 			nextpost.value = res.nextpost[0]
		// 		})
		// 	}).catch(err => {
		// 		uni.showToast({
		// 			title: "拉取内容失败",
		// 			icon: error
		// 		})
		// 		mdvalue.value = "拉取内容失败";
		// 		throw new Error(err);
		// 	})

		uni.request({
			url: url,
			responseType: "text",
			success: (res)=> {
				mdvalue.value = res.data;
				contentinfo.value = true;
				cloudapi.getnextpost(postobj.value.tag, postobj.value.date).then(res => {
					res.prepost[0]._id === ""? nextcontrl.value.pre =false : nextcontrl.value.pre=true;
					res.nextpost[0]._id === ""? nextcontrl.value.next =false : nextcontrl.value.next=true;
					
					prepost.value = res.prepost[0];
					nextpost.value = res.nextpost[0];
				})
			},
			fail: () => {
				uni.showToast({
					title: "拉取内容失败",
					icon: error
				})
				mdvalue.value = "拉取内容失败";
				throw new Error(err);
			}
		})
	};
	//底部推荐按
	const contentinfo = ref(false);
	//点击标签
	const clickTag = (tag) => {
		uni.navigateTo({
			url: `/pages/archive/archive?tag=${tag}`
		});
	};
	const topostcontent = (id) => {
		uni.reLaunch({
			url: `/pages/postcontent/postcontent?id=${id}`
		})
	};
	onLoad((e) => {
		cloudapi.getpostinfo(e.id).then(res => {
			postobj.value = res.data[0];
			coverurl.value = `url(${res.data[0].cover})`
			getcontent(res.data[0].contentLink);
		}).catch(err => {
			uni.showToast({
				title: "拉取内容失败",
				icon: "error"
			})
			mdvalue.value = "拉取内容失败";
			throw new Error(err);
		});
	})
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.header {
		flex-direction: column;
		width: 750rpx;
		height: 500rpx;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 50rpx;
		background-image: v-bind(coverurl);
		position: relative;
		padding-top: 100rpx;
		.date {
			font-size: 30rpx;
			color: #ffffff;
			position: absolute;
			bottom: 25rpx;
		}
	}

	.content-text,
	.content-info {
		margin-top: 50rpx;
		background: rgba(251, 251, 251, 0.5);
		border: rgba(251, 251, 251, 0);
		border-radius: 40rpx;
		box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
		padding: 72rpx 28rpx;
		width: 720rpx;
	}

	.content-info {
		margin-top: 10rpx;
		padding: 50rpx 20rpx;

		.posttag {
			border: 1px solid #49b1f5;
			border-radius: 24rpx;
			color: #49b1f5;
			min-width: 100rpx;
			text-align: center;
			margin-bottom: 20rpx;
		}

		.preandnext {
			background-image: v-bind(coverurl);

			.pre-post,
			.next-post {
				width: 100%;
				height: 250rpx;
				padding: 25rpx 20rpx 0rpx 20rpx;
				color: #ffffff;
				display: flex;
				flex-direction: column;
				line-height: 80rpx;
				font-size: 40rpx;

				.text {

					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.next-post {
				text-align: right;
			}
		}
	}
</style>