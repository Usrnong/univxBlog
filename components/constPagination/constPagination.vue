<template>
	<view class="pagination flex">
		<view class="pagebtn pre" v-show="nextbtncontrol.pre" @click="btnofchangepage('pre')">上一页</view>
		<view class="pagebtn" :class="num.btnactive" v-for="num in btncounts" @click="changeSize(num)" :key="num.showText">
			{{num.showText}}
		</view>
		<view class="pagebtn nex" v-show="nextbtncontrol.next" @click="btnofchangepage('next')">下一页</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		watch
	} from 'vue';
	const props = defineProps({
		pageSize: Number, //每页展示多少条
		totalNum: Number, //总数
		// btncount: Number, //展示多少个按钮
		current: Number
	});
	//生成数组按钮
	const btncounts = ref([]);
	//数字按钮数量
	const btnnum = ref(0);
	//点击数字按钮
	const evenEmit = defineEmits(['changeSize']);
	const changeSize = (num) => {
		if (num.btnactive == "btnactive") return;
		btncounts.value.forEach((item) => {
			item.btnactive = "none";
		})
		let clickindex = btncounts.value.findIndex((item) => {
			return item.showText == num.showText;
		});
		btncounts.value[clickindex].btnactive = "btnactive";
		//如果点了中间按钮
		if (clickindex == 1) {
			nextbtncontrol.value.pre = true;
			nextbtncontrol.value.next = true;
		}
		//如果点了第一页
		if (btncounts.value[clickindex].showText == 1) {
			nextbtncontrol.value.pre = false;
			evenEmit('changeSize', num.showText);
			return
		}
		//如果点了最后一页
		if (btncounts.value[clickindex].showText == btnnum.value) {
			nextbtncontrol.value.next = false;
			evenEmit('changeSize', num.showText);
			return
		}
		//点击前置按钮
		if (clickindex === 0 && btncounts.value[clickindex].showText != 1) {
			btncounts.value.pop();
			btncounts.value.unshift({
				"showText": btncounts.value[clickindex].showText - 1,
				"btnactive": "none"
			});
			nextbtncontrol.value.pre = true;
			nextbtncontrol.value.next = true;
		}
		//点击后置按钮
		if (clickindex === 2 && btncounts.value[clickindex].showText != btnnum.value) {
			btncounts.value.shift();
			btncounts.value.push({
				"showText": btncounts.value[1].showText + 1,
				"btnactive": "none"
			});
			nextbtncontrol.value.pre = true;
			nextbtncontrol.value.next = true;
		}
		evenEmit('changeSize', num.showText);
	};
	const nextbtncontrol = ref({
		"pre": true,
		"next": true
	})
	//生成按钮
	const btncreatfn = () => {
		nextbtncontrol.value.pre = true;
		nextbtncontrol.value.next = true;
		let btnarr = [];
		let btnactive = "none";
		let current = props.current;
		//计算有多少个按钮
		btnnum.value = Math.ceil(props.totalNum / props.pageSize);

		//如果当前页大于总页数
		if (!props.current || props.current > btnnum.value) current = 1;
		if (current == 1) nextbtncontrol.value.pre = false;
		let i = 1;
		if (current > 1 && btnnum.value > 3) {
			i = current - 1;
			if (current == btnnum.value) {
				i = current - 2;
				nextbtncontrol.value.next = false;
			}
			for (let j = 1; j < 4; j++) {
				(i == current) ? (btnactive = "btnactive") : (btnactive = "none");
				btnarr.push({
					"showText": i,
					"btnactive": btnactive
				});
				i++;
			}
		} else if (btnnum.value < 3 && btnnum.value != 1) {
			for (let j = 1; j < 3; j++) {
				(j == current) ? (btnactive = "btnactive") : (btnactive = "none");
				btnarr.push({
					"showText": j,
					"btnactive": btnactive
				});
				nextbtncontrol.value.next = false;
			}
		} else if (btnnum.value >= 3 && current == 1) {
			for (let j = 1; j < 4; j++) {
				(j == current) ? (btnactive = "btnactive") : (btnactive = "none");
				btnarr.push({
					"showText": j,
					"btnactive": btnactive
				});
			}
			nextbtncontrol.value.pre = false;
			if (btnnum.value == 3) nextbtncontrol.value.next = false;
		} else if (btnnum.value == 1) {
			btnarr.push({
				"showText": "1",
				"btnactive": "btnactive"
			});
			nextbtncontrol.value.next = false;
			nextbtncontrol.value.pre = false;
		}
		if (current == btnnum.value - 1 || current == btnnum.value) nextbtncontrol.value.next = false;
		if (current == 2 || current == 1) nextbtncontrol.value.pre = false;
		btncounts.value = btnarr;
	}
	//点击翻页
	const btnofchangepage = (nextorpre) => {
		switch (nextorpre) {
			case "pre":
				prefn();
				break;
			case "next":
				nextfn();
				break;
			default:
				return
		}
	}
	//上一页
	const prefn = () => {
		let actIndex = btncounts.value.findIndex((item) => {
			return item.btnactive == "btnactive";
		});
		if (btncounts.value[actIndex].showText === 1) return;
		if (actIndex === 1) {
			btncounts.value[actIndex].btnactive = "none"
			//如果是第二页
			if (btncounts.value[actIndex].showText === 2) {
				btncounts.value[0].btnactive = "btnactive"
				nextbtncontrol.value.pre = false;
				evenEmit('changeSize', btncounts.value[0].showText);
				return;
			}
			btncounts.value.pop();
			btncounts.value.unshift({
				"showText": btncounts.value[actIndex].showText - 2,
				"btnactive": "none"
			});
			btncounts.value[1].btnactive = "btnactive"
			evenEmit('changeSize', btncounts.value[1].showText);
		} else if (actIndex === 2) {
			//如果显示追后一个按钮
			btncounts.value[actIndex].btnactive = "none";
			btncounts.value[1].btnactive = "btnactive";
			nextbtncontrol.value.next = true;
			evenEmit('changeSize', btncounts.value[1].showText);
			return;
		}
	}
	//下一页
	const nextfn = () => {
		let actIndex = btncounts.value.findIndex((item) => {
			return item.btnactive == "btnactive";
		});
		//如果是最后一页
		if (btncounts.value[actIndex].showText === btnnum.value) return;

		btncounts.value[actIndex].btnactive = "none";
		//倒数第二页
		if (btncounts.value[actIndex].showText === btnnum.value - 1) {
			nextbtncontrol.value.next = false;
			btncounts.value[actIndex + 1].btnactive = "btnactive";
			evenEmit('changeSize', btncounts.value[actIndex + 1].showText);
			return;
		}
		//如果是第一页
		if (btncounts.value[actIndex].showText === 1) {
			nextbtncontrol.value.pre = true;
			btncounts.value[actIndex + 1].btnactive = "btnactive";
			evenEmit('changeSize', btncounts.value[actIndex + 1].showText);
			return;
		}
		btncounts.value.shift();
		btncounts.value.push({
			"showText": btncounts.value[actIndex].showText + 1,
			"btnactive": "none"
		});
		btncounts.value[1].btnactive = "btnactive";
		nextbtncontrol.value.pre = true;
		evenEmit('changeSize', btncounts.value[1].showText);
	}
	watch(() => props.totalNum, () => {

		btncreatfn();
	})
	onMounted(() => {
		btncreatfn();
	})
</script>

<style lang="scss" scoped>
	.pagination {
		margin-top: 40rpx;

		.pagebtn {
			border-radius: 16rpx;
			background: #fff;
			box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
			// transition: all 0.3s;
			min-width: 70rpx;
			height: 70rpx;
			margin: 0rpx 10rpx;
			text-align: center;
			line-height: 70rpx;
			color: #99a9bf;
		}

		.btnactive {
			background: #00c4b6;
			color: #fff;
		}
	}
</style>