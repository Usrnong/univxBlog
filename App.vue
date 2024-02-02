<script setup>
	// export default {
	// 	globalData: {
	// 		"_id": "",
	// 		"name": "",
	// 		"avatar": "",
	// 		"vxnum": "111",
	// 		"posttags": [],
	// 		"postclass": [],
	// 		"typewriterStr": [],
	// 		"announcement": "",
	// 		"motto": ""
	// 	},
	// 	onLaunch: function(options) {
	// 		const cloudobj = uniCloud.importObject('getInfo');
	// 		const cloudPost = uniCloud.importObject('getPostInfo');
	// 		cloudobj.getuserinfo().then(res => {
	// 			this.globalData = res;
	// 		}).catch(err => {
	// 			uni.showToast({
	// 				icon: none,
	// 				title: err
	// 			})
	// 		})
	// 		//文章总数
	// 		cloudPost.getPsotCount().then(res => {
	// 			uni.setStorage({
	// 				key: "postTotal",
	// 				data: res.total
	// 			});
	// 		}).catch(err => {
	// 			throw new Error(err)
	// 		})
	// 	},
	// 	onShow: function(options) {
	// 		console.log('App Show')
	// 		console.log('应用启动路径：', options.path)
	// 	},
	// 	onHide: function() {
	// 		console.log('App Hide')
	// 	}
	// }
	import {
		onBeforeMount,
		onUnmounted
	} from 'vue';
	import {
		onLaunch
	} from "@dcloudio/uni-app"
	
	import {getCurrentInstance} from 'vue'
	const { proxy } = getCurrentInstance();
	const {$isResolve} = proxy;
	const cloudobj = uniCloud.importObject('getInfo');
	const cloudPost = uniCloud.importObject('getPostInfo');
	onLaunch(() => {
		//将个人信息存在本地
		cloudobj.getuserinfo().then(res => {
			uni.setStorage({
				key: "userinfo",
				data: JSON.stringify(res),
				success:()=>{
					//文章总数
					cloudPost.getPsotCount().then(res => {
						uni.setStorage({
							key: "postTotal",
							data: res.total,
							success:()=>{
								$isResolve();
							}
						});
					}).catch(err => {
						throw new Error(err)
					})
				}
			});
		}).catch(err => {
			uni.showToast({
				icon: none,
				title: err
			})
		})
	});
	onUnmounted(() => {
		uni.clearStorage();
	})
</script>

<style lang="scss">
	@import "/static/icon/iconfont.css";

	view,
	text {
		padding: 0;
		margin: 0;
		list-style: none;
		background: transparent;
		box-sizing: border-box;
	}

	text[class*="icon-"],
	view[class*="icon-"],
	button[class*="icon-"] {
		font-family: "iconfont";
		font-size: inherit;
		font-style: normal;
	}

	@keyframes sidebarItem {
		0% {
			transform: translateX(400rpx);
		}

		100% {
			transform: translateX(0);
		}
	}

	@font-face {
		font-family: 'tzy';
		/* 字体名自定义即可 */
		/* src: url('https://cdn.jsdelivr.net/gh/tzy13755126023/BLOG_SOURCE/font/ZhuZiAWan.woff2'); */
		src: url('https://npm.elemecdn.com/ethan4116-blog/lib/font/ZhuZiAWan.ttf');
		/* 字体文件路径 */
		font-display: swap;
	}

	body {
		&[data-theme="light"] {
			background: linear-gradient(90deg,
					rgba(247, 149, 51, 0.1) 0,
					rgba(243, 112, 85, 0.1) 15%,
					rgba(239, 78, 123, 0.1) 30%,
					rgba(161, 102, 171, 0.1) 44%,
					rgba(80, 115, 184, 0.1) 58%,
					rgba(16, 152, 173, 0.1) 72%,
					rgba(7, 179, 155, 0.1) 86%,
					rgba(109, 186, 130, 0.1) 100%);
		}

		font-family: tzy !important;
	}

	page {
		background: linear-gradient(90deg,
				rgba(247, 149, 51, 0.1) 0,
				rgba(243, 112, 85, 0.1) 15%,
				rgba(239, 78, 123, 0.1) 30%,
				rgba(161, 102, 171, 0.1) 44%,
				rgba(80, 115, 184, 0.1) 58%,
				rgba(16, 152, 173, 0.1) 72%,
				rgba(7, 179, 155, 0.1) 86%,
				rgba(109, 186, 130, 0.1) 100%);
		font-family: tzy !important;
		height: auto;
		padding-bottom: 60rpx;
	}

	.flex {
		display: flex;
	}

	.flex-center {
		justify-content: center;
		align-items: center;
	}

	.header-effect {
		animation: header-effect 1s;
	}

	.bottom-top {
		animation: bottom-top 1s;
	}

	@keyframes header-effect {
		0% {
			opacity: 0;
			filter: alpha(opacity=0);
			transform: translateY(-100rpx);
		}

		100% {
			opacity: 1;
			filter: none;
			transform: translateY(0);
		}
	}

	@keyframes bottom-top {
		0% {
			margin-top: 150rpx;
			opacity: 0;
			filter: alpha(opacity=0);
		}

		100% {
			margin-top: 50rpx;
			opacity: 1;
			filter: none;
		}
	}
</style>