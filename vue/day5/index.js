// 轮播图局部组件
const BannerPagination = {
	template: '#paginationTemplate'
};

const BannerArrow = {
	template: '#arrowTemplate'
};

const MyBanner = {
	template: '#bannerTemplate',
	components: {
		BannerPagination,
		BannerArrow
	},
	// 传递的属性设置规则
	props: {
		bannerData: {
			type: Array,
			required: true
		},
		interval: {
			type: Number,
			default: 3000
		},
		initialize: {
			type: Number,
			default: 0
		},
		speed: {
			type: Number,
			default: 300
		},
		pagination: {
			type: Boolean,
			default: true
		},
		arrow: {
			type: Boolean,
			default: true
		}
	}
};

// 渲染页面
new Vue({
	el: "#app",
	components: {
		MyBanner
	},
	data: {
		bannerData1: [],
		bannerData2: []
	}
});

/*
 * 轮播图组件支持的配置项
 *    banner-data:[{id:1,pic:'xxx',title:'xxx'},...]  需要渲染轮播图的数据（必传）
 *    interval:3000  切换频率
 *    initialize:0   初始展示哪一张
 *    speed:300      切换的速度
 *    pagination:true  是否显示分页器
 *    arrow:true     是否显示左右导航按钮
 * 
 *    @changestart  切换开始的回调函数【基于发布订阅完成的】
 *    @changeend    切换结束的回调函数
 */