// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database();
//格式化日期：yyyy-MM-dd 
function formatDate(date_) {
	const date = new Date(Number(date_));
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}
module.exports = {
	_before: function() { // 通用预处理器

	},
	//轮播图内容
	getSwiperPost: async () => {
		const res = await db.collection("postListInfo").where({
			swiper: "1"
		}).get();
		res.data.forEach(item => {
			item.date = formatDate(item.date);
		})
		return res
	},
	//文章总数
	getPsotCount: async () => {
		return await db.collection("postListInfo").count();
	},
	//获取分类\标签数量
	getClssCount: async (classList, tagOrClass) => {
		if (!Array.isArray(classList) && classList.length === 0) {
			throw new Error("参数错误");
			return;
		}
		const total = [];
		let res = [];
		if (tagOrClass === "tag") {
			res = await Promise.all(classList.map(async (item) => {
				return await db.collection("postListInfo").where({
					tag: item
				}).count();
			}));
		} else if (tagOrClass === "class") {
			res = await Promise.all(classList.map(async (item) => {
				return await db.collection("postListInfo").where({
					categories: item
				}).count();
			}));
		} else {
			throw new Error("参数错误");
			return;
		}

		res.forEach((item, index) => {
			total.push({
				"name": classList[index],
				"total": item.total
			})
		})
		return total
	},
	//获取相关文章
	getPostofclassify: async (obj) => {
		if (!obj.constructor === "Object" || obj == null) {
			throw new Error("参数错误");
			return;
		}
		const {
			key,
			value,
			pagesize,
			page
		} = obj;
		let total = 0;
		let totalpage = 0;
		let current = 1;
		if (key === "tag") {
			const totalres = await db.collection("postListInfo").where({
				tag: value
			}).count();
			total = totalres.total;
			totalpage = Math.ceil(total / pagesize);
			page > totalpage ? current = totalpage : current = page;
			const res = await db.collection("postListInfo").where({
				tag: value
			}).skip((current - 1) * pagesize).limit(pagesize).get();
			res.total = total;
			res.data.forEach(item => {
				item.date = formatDate(item.date);
			})
			return res
		} else if (key === "class") {
			const totalres = await db.collection("postListInfo").where({
				categories: value
			}).count();
			total = totalres.total;
			totalpage = Math.ceil(total / pagesize);
			page > totalpage ? current = totalpage : current = page;
			const res = await db.collection("postListInfo").where({
				categories: value
			}).skip((current - 1) * pagesize).limit(pagesize).get();
			res.total = total;
			res.data.forEach(item => {
				item.date = formatDate(item.date);
			})
			return res
		} else if (key === "all") {
			if (!pagesize) {
				throw new Error("参数错误");
				return;
			}
			const totalres = await db.collection("postListInfo").count();
			total = totalres.total;
			totalpage = Math.ceil(total / pagesize);
			page > totalpage ? current = totalpage : current = page;
			const res = await db.collection("postListInfo").skip((current - 1) * pagesize).limit(pagesize).get();
			res.total = total;
			res.data.forEach(item => {
				item.date = formatDate(item.date);
			})
			return res
		} else {
			throw new Error("参数错误");
			return;
		}
	},
	//获取内容
	getpostinfo: async (id) => {
		const res = await db.collection("postListInfo").doc(id).get();
		res.data.forEach(item => {
			item.date = formatDate(item.date);
		});
		return res
	},
	//获取上一篇、下一篇
	getnextpost: async (tag, date) => {
		let d = new Date(date).getTime();
		const dbCmd = db.command;
		const res = await db.collection("postListInfo").where({
			tag: tag,
			date: dbCmd.gt(d)
		}).field({
			title: true
		}).limit(1).get();
		const _res = await db.collection("postListInfo").where({
			tag: tag,
			date: dbCmd.lt(d)
		}).field({
			title: true
		}).limit(1).get();
		const totalres = {
			"prepost": [{
				"_id": "",
				"title": ""
			}],
			"nextpost": [{
				"_id": "",
				"title": ""
			}]
		};
		if (res.data.length) totalres.nextpost = res.data;
		if (_res.data.length) totalres.prepost = _res.data;
		return totalres
	},
	//获取最新，限制5条
	getnewpost: async () => {
		const res = await db.collection("postListInfo").field({
			title: true,
			date: true,
			cover: true
		}).orderBy("date", "desc").limit(5).get();
		res.data.forEach(item => {
			item.date = formatDate(item.date);
		});
		return res
	}
}