<template>
	<view class="marsk" :class="markisActive" @click="closedrawer"></view>
	<view class="navbar">
		<view class="nav" :style="navabrStyle">
			<text @click="toindex">{{user.name}}</text>
			<uni-icons class="icon" type="bars" size="25" @click="opendrawer"></uni-icons>
		</view>

		<view class="drawer" :style="drawerRightWidth" :class="open">
			<view class="avatar">
				<image class="avatarimg" :src="user.avatar" mode="scaleToFill"></image>
				<view class="tagclassify">
					<view class="tagname" @click="toarchive">
						<text>文章</text>
						<text class="num">{{postTotal}}</text>
					</view>
					<view class="tagname" @click="toclasspage">
						<text>分类</text>
						<text class="num">{{classtotal}}</text>
					</view>
					<view class="tagname" @click="topagetag">
						<text>标签</text>
						<text class="num">{{tagtotal}}</text>
					</view>
				</view>
			</view>
			<view class="customhr"></view>
			<view class="menulists">
				<view class="menulist flex">
					<view class="menuitem flex" @click="toindex">
						<view class="iconfont icon-zhuye"></view>
						<text>主页</text>
					</view>
					<view class="menuitem flex" @click="topagetag">
						<view class="iconfont icon-biaoqian"></view>
						<text>标签</text>
					</view>
					<view class="menuitem flex" @click="toclasspage">
						<view class="iconfont icon-fenlei"></view>
						<text>分类</text>
					</view>
				</view>
			</view>
		</view>
		<view class="icontag" :style="right">
			<uni-icons class="icon loop" type="loop" size="25" color="#ffffff" :style="themechange"
				@click="settheme"></uni-icons>
			<uni-icons class="icon gear" type="gear" size="25" color="#ffffff" @click="themechangehandle"></uni-icons>
			<uni-icons class="icon" type="arrow-up" size="25" color="#ffffff" @click="scroolUp"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		watchEffect,
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	
	import {getCurrentInstance} from 'vue'
	const {proxy} = getCurrentInstance();
	const {$onLaunched} = proxy
	/* 
	 scroolltop : 页面滚动距离，用于改变头部导航栏样式
	 */
	const props = defineProps({
		scroolltop: {
			type: Number,
			default: 0
		}
	})
	const user = ref({
		name: "",
		avatar: ""
	});
	//文章、分类、标签总数
	const classtotal = ref(0);
	const tagtotal = ref(0);
	const postTotal = ref(0);
	//从本地同步获取个人信息
	onLoad(async() => {
		await $onLaunched;
		const {
			name,
			avatar,
			posttags,
			postclass
		} = JSON.parse(uni.getStorageSync("userinfo"));
		let x = uni.getStorageSync("postTotal");
		if (x > 99) {
			postTotal.value = '99+';
		} else {
			postTotal.value = x;
		}
		user.value = {
				"name": name,
				"avatar": avatar
			},
			classtotal.value = postclass.length;
		tagtotal.value = posttags.length;

	})

	//右下角设置样式
	const right = ref('');
	const themechange = ref('');

	const themechangehandle = () => {
		if (themechange.value) {
			themechange.value = ""
		} else {
			themechange.value = "transform: translateX(0rpx);"
		}
	}
	//导航栏样式
	const navabrStyle = ref('')
	//点击切换主题（暂未完成）
	const settheme = () => {

		let element = document.getElementsByTagName("body")[0];

		let value = element.dataset.theme;
		if (value == "light") {
			element.setAttribute("data-theme", "dark");
		} else {
			element.setAttribute("data-theme", "light");
		}
	}
	//下拉滑动时头部变化
	watchEffect(() => {
		if (props.scroolltop > 0) {
			right.value = "transform: translateX(-70rpx);"
			navabrStyle.value = "background-color: rgba(255, 255, 255, 0.75);color: #4c4948;"
		} else {
			right.value = "";
			navabrStyle.value = ""
		}
	})

	//抽屉
	const drawerRef = ref();
	//抽屉打开距离
	const drawerRightWidth = ref("")
	//遮罩层
	const markisActive = ref("")
	//添加open动画
	const open = ref("")
	//点击菜单打开抽屉
	const opendrawer = () => {
		drawerRightWidth.value = "transform: translateX(-600rpx);"
		markisActive.value = "marskActive";
		open.value = "open";
	}
	//点击遮罩层关闭
	const closedrawer = () => {
		drawerRightWidth.value = "transform: translateX(0rpx);"
		markisActive.value = "";
		open.value = "";
	}
	//点击文章
	const toarchive = () => {
		uni.navigateTo({
			url: '/pages/archive/archive?all=1'
		})
	}
	//点击主页
	const toindex = () => {
		uni.reLaunch({
			url: '/pages/index/index'
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
	//回到顶部
	const scroolUp = () => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 300
		});
	}
</script>

<style lang="scss" scoped>
	// body[data-theme="dark"] {
	// 	.icon {
	// 		background-color: #1f1f1f;
	// 	}
	// }

	.marsk {
		width: 750rpx;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 2;
		position: fixed;
		top: 0;
		left: 0;
		display: none;
	}

	.marskActive {
		display: block;
	}

	.navbar {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		height: 120rpx;
		width: 750rpx;
		z-index: 5;
		/* #ifdef MP-WEIXIN */
		height: 15%;

		/* #endif */
		.open>.avatar {
			animation: sidebarItem 0.4s;
		}

		.open>.customhr {
			animation: sidebarItem 0.6s;
		}

		.open>.menulists {
			animation: sidebarItem 0.8s;
		}

		.drawer {
			width: 600rpx;
			height: 100vh;
			position: fixed;
			top: 0;
			right: -600rpx;
			background-color: white;
			z-index: 9999999999;
			transition: all 0.5s;
			padding-top: 120rpx;

			.avatar {

				.avatarimg {
					width: 220rpx;
					height: 220rpx;
					border-radius: 50%;
					overflow: hidden;
					margin: 60rpx 0rpx;
					transform: translateX(190rpx);
				}

				.tagclassify {
					width: 100%;
					padding: 0rpx 20rpx;
					height: 120rpx;
					display: flex;
					justify-content: space-around;

					.tagname {
						display: flex;
						justify-content: center;
						flex-direction: column;
						font-size: 40rpx;

						.num {
							font-size: 45rpx;
						}
					}

				}
			}

			.customhr {
				margin: 40rpx auto;
				border: 2px dashed #a4d8fa;
			}

			.menulist {
				padding-left: 80rpx;
				justify-content: flex-start;
				flex-direction: column;

				.menuitem {
					width: 100%;
					margin-bottom: 60rpx;
					font-size: 40rpx;

					.iconfont {
						margin-right: 20rpx;
						font-size: 50rpx
					}
				}
			}
		}
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		width: 750rpx;
		height: 100%;
		color: white;
		font-size: 40rpx;
		font-weight: bold;
		transition: all 0.5s;
		padding: 20rpx;

		.icon {
			margin-right: 20rpx;
		}
	}

	.icontag {
		width: 70rpx;
		height: 240rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: fixed;
		bottom: 50rpx;
		right: -70rpx;
		transition: all 0.5s;

		.icon {
			background-color: #6cc0f6;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
		}

		.loop {
			transform: translateX(70rpx);
			transition: all 0.5s;
		}

		.gear {
			display: none;
		}
	}
</style>