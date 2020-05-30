// 轮播图局部组件
const BannerPagination = {
	template: '#paginationTemplate',
	props: ["len"]
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
	},
	data() {
		let {
			bannerData,
			initialize,
			speed
		} = this;
		let len = bannerData.length;
		initialize = initialize < 0 ? 0 : (initialize > len ? len : initialize);

		return {
			// 把传递的数据第一张克隆一份放到末尾(不能直接修改属性值)
			bannerDataClone: [...bannerData, bannerData[0]],
			// 控制WRAPPER的样式
			wrapperSty: {
				width: (len + 1) * 800 + 'px',
				left: -initialize * 800 + 'px',
				transition: `left ${speed}ms linear 0ms`
			},
			// 记录当前轮播图展示哪一张
			activeIndex: initialize
		};
	},
	// 第一次加载完成后，我们需要让轮播图运动起来（自动轮播）
	mounted() {
		this.autoTimer = setInterval(this.autoMove, this.interval);
	},
	methods: {
		autoMove() {
			this.activeIndex++;
			if (this.activeIndex > (this.bannerDataClone.length - 1)) {
				// 右边界
				this.wrapperSty.left = `0px`;
				this.wrapperSty.transition = `left 0ms linear 0ms`;
				// 需要等待立即回到第一张后（DOM渲染完[已经生成最新的真实DOM，抛给浏览器处理]），让其运动到第二张
				this.$nextTick(() => {
					this.$refs.wrapper.offsetLeft;
					this.activeIndex = 1;
					this.wrapperSty.left = `${-this.activeIndex*800}px`;
					this.wrapperSty.transition = `left ${this.speed}ms linear 0ms`;
				});
				return;
			}
			this.wrapperSty.left = `${-this.activeIndex*800}px`;
			this.wrapperSty.transition = `left ${this.speed}ms linear 0ms`;
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
	},
	// 一般在CREATED中发送数据请求
	async created() {
		let result = await queryData('./data1.json');
		this.bannerData1 = result;

		result = await queryData('./data2.json');
		this.bannerData2 = result;
	}
});

// 发送数据请求的办法
function queryData(url) {
	return new Promise(resolve => {
		let xhr = new XMLHttpRequest;
		xhr.open('get', url);
		xhr.onreadystatechange = () => {
			if (xhr.status === 200 && xhr.readyState === 4) {
				resolve(JSON.parse(xhr.responseText));
			}
		};
		xhr.send();
	});
}

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