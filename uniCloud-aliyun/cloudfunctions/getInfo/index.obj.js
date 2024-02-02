// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db=uniCloud.database();
module.exports = {
	_before: function() { // 通用预处理器

	},
	getuserinfo: async () => {
		const res = await db.collection("userInfo").get();
		return res.data[0];
	}
}