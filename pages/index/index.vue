<template>
	<view class="home header-effect">

		<text class='indexTitle name'>{{name}}</text>
		<text class='indexTitle typewriter'>{{typewriterStr}}<text v-show="lineshow">|</text></text>
		<view class='indexTitle indexicon'>
			<image class="indexTitleicon" src="@/static/icon/github.png" mode="" @click="cgithub"></image>

			<image class="indexTitleicon" src="@/static/icon/vx.png" mode="" @click="cwx"></image>
		</view>
		<image class="icon" src="@/static/icon/Down.png"></image>
	</view>
	<view class="content">
		<swiperCom></swiperCom>
		<classifyTag></classifyTag>
		<articleTag :articlelist="articlelist"></articleTag>
		<constPagination :totalNum="pagination.totalNum" @changeSize="changeSize" :current="pagination.current"
			:pageSize="pagination.pageSize"></constPagination>
		<userInfo></userInfo>
		<announcementTag></announcementTag>
		<newPost></newPost>
		<postClassify></postClassify>
		<postTag></postTag>
	</view>
	<toolFix :scroolltop="scroolltop"></toolFix>
</template>

<script setup>
	import {
		defineAsyncComponent,
		onMounted,
		ref
	} from 'vue';

	import {
		onPageScroll,
		onLoad
	} from "@dcloudio/uni-app"
	
	import {getCurrentInstance} from 'vue'
	const {proxy} = getCurrentInstance();
	const {$onLaunched} = proxy
	//页面滚动
	const scroolltop = ref(0);
	onPageScroll((e) => {
		scroolltop.value = e.scrollTop;
	})
	const typewriterStr = ref('');
	const lineshow = ref(true);
	const name = ref('');
	let str_ = '';
	//获取打字机字幕
	const pageinit = () => {

		const userinfo = JSON.parse(uni.getStorageSync("userinfo"));
		name.value = userinfo.name
		//如果字幕大于2，则随机取一个
		if (userinfo.typewriterStr.length > 1) {
			let length = userinfo.typewriterStr.length
			let index = Math.floor(Math.random() * length)
			str_ = userinfo.typewriterStr[index]
		} else {
			str_ = userinfo.typewriterStr[0];
		}
	}
	/* 打字机效果 */
	const typewriterFun = () => {
		let index = 0;
		let tmier = setInterval(() => {
			if (index < str_.length) {
				typewriterStr.value += str_.charAt(index);
				index++;
			} else {
				index = 0;
				clearInterval(tmier);
				typewriterFunDel();
			}
		}, 300)
	}
	const typewriterFunDel = () => {
		let x = str_.length
		let timer = setInterval(() => {
			if (x >= 0) {
				typewriterStr.value = str_.substr(0, x)
				x--;
			} else {
				clearInterval(timer);
				typewriterFun();
			}
		}, 100)
	}
	//点击图标
	const cgithub = () => {
		uni.setClipboardData({
			data: 'https://github.com/Usrnong?tab=repositories',
			showToast: false,
			success: function() {
				uni.showToast({
					icon: "none",
					title: "github地址已复制到剪切板"
				})
			}
		});
	}
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
	//获取首页文章列表
	const couldapi = uniCloud.importObject("getPostInfo");
	const articlelist = ref([]);
	//分页数据
	const pagination = ref({
		"totalNum": 0,
		"pageSize": 5,
		"current": 1
	})
	const getpost = (current) => {
		couldapi.getPostofclassify({
			"key": "all",
			"value": '',
			"pagesize": pagination.value.pageSize,
			"page": current || pagination.value.current
		}).then(res => {
			articlelist.value = res.data;
			pagination.value.totalNum = res.total
		})
	}
	//翻页
	const changeSize = (num) => {
		getpost(num)
	}
	onLoad(async () => {
		await $onLaunched;
		pageinit();
		typewriterFun();
		getpost();
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 100
		});
	})
</script>

<style lang="scss" scoped>
	.home {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;

		&::after {
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
			content: '';
		}

		.indexTitle {
			font-size: 60rpx;
			text-align: center;
			line-height: 60rpx;
			padding-bottom: 20rpx;
			color: rgb(255, 255, 255);


			.indexTitleicon {
				display: inline-block;
				width: 40rpx;
				height: 40rpx;
				z-index: 1;
			}
		}

		.name {
			font-weight: bold;
			z-index: 1;
		}

		.typewriter {
			font-size: 35rpx;
			line-height: 40rpx;
			z-index: 1;
		}

		.icon {
			display: inline-block;
			width: 60rpx;
			height: 60rpx;
			// z-index: 0;
			position: absolute;
			bottom: 0;
			left: 360rpx;
			animation: icondown 2s linear infinite;
		}

		.indexicon {
			width: 190rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}

	@keyframes icondown {
		0% {
			bottom: 0;
		}

		50% {
			bottom: 80rpx
		}

		100% {
			bottom: 0rpx;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// #page{
		// 	font-size: 50rpx !important;
		// }
	}
</style>