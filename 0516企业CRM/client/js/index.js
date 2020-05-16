let indexModule = (function () {
	let $baseBox = $('.baseBox'),
		$baseBoxText = $baseBox.find('span'),
		$baseBoxSingout = $baseBox.find('a'),
		$menuBox = $('.menuBox'),
		$navBoxList = $('.navBox>a'),
		$itemBoxList = null;

	// 基于发布订阅管理我们获取到个人信息和权限信息后要处理的事情
	let $plan = $.Callbacks();

	// 显示欢迎的基本信息和退出登录
	$plan.add((_, baseInfo) => {
		$baseBoxText.html(`您好：${baseInfo.name||''}`);
		$baseBoxSingout.click(async () => {
			let result = await axios.get('/user/signout');
			if (result.code == 0) {
				window.location.href = 'login.html';
				return;
			}
			alert('小主，当前网络繁忙，您稍后再试试~~');
		});
	});

	// 权限处理（控制左侧MENU的渲染内容）
	$plan.add(power => {
		let str = ``;
		if (power.includes('userhandle')) {
			str += `<div class="itemBox" text="员工管理">
				<h3>
					<i class="iconfont icon-yuangong"></i>
					员工管理
				</h3>
				<nav class="item">
					<a href="">员工列表</a>
					<a href="">新增员工</a>
				</nav>
			</div>`;
		}

		if (power.includes('departhandle')) {
			str += `<div class="itemBox" text="部门管理">
				<h3>
					<i class="iconfont icon-guanliyuan"></i>
					部门管理
				</h3>
				<nav class="item">
					<a href="">部门列表</a>
					<a href="">新增部门</a>
				</nav>
			</div>`;
		}

		if (power.includes('jobhandle')) {
			str += `<div class="itemBox" text="职务管理">
				<h3>
					<i class="iconfont icon-zhiwuguanli"></i>
					职务管理
				</h3>
				<nav class="item">
					<a href="">职务列表</a>
					<a href="">新增职务</a>
				</nav>
			</div>`;
		}

		if (power.includes('customer')) {
			str += `<div class="itemBox" text="客户管理">
				<h3>
					<i class="iconfont icon-kehuguanli"></i>
					客户管理
				</h3>
				<nav class="item">
					<a href="">我的客户</a>
					${power.includes('customerall')?`<a href="">全部客户</a>`:``}
					<a href="">新增客户</a>
				</nav>
			</div>`;
		}
		$menuBox.html(str);
		$itemBoxList = $menuBox.find('.itemBox');
	});

	// 控制组织结构和客户管理
	function handleGroup(index) {
		// 先把ITEMBOX分组  $gropu1客户管理  $gropu2组织结构
		let $gropu1 = $itemBoxList.filter((_, item) => {
			let text = $(item).attr('text');
			return text === "客户管理";
		});
		let $gropu2 = $itemBoxList.filter((_, item) => {
			let text = $(item).attr('text');
			return /^(员工管理|部门管理|职务管理)$/.test(text);
		});

		// 控制展示哪一组的
		if (index === 0) {
			$gropu1.css('display', 'block');
			$gropu2.css('display', 'none');
		} else if (index === 1) {
			$gropu2.css('display', 'block');
			$gropu1.css('display', 'none');
		}
	}
	$plan.add(power => {
		// 控制默认显示哪一个
		let initialIndex = 0;
		$navBoxList.eq(initialIndex).addClass('active')
			.siblings().removeClass('active');
		handleGroup(initialIndex);

		// 点击控制切换
		$navBoxList.click(function () {
			let $this = $(this),
				index = $this.index(),
				text = $this.html().trim();
			// 权限校验
			if ((text === "客户管理" && !/customer/.test(power)) || (text === "组织结构" && !/(userhandle|departhandle|jobhandle)/.test(power))) {
				alert('小主，您无权限访问改操作，请先联系系统管理员~~');
				return;
			}
			if (index === initialIndex) return;
			$this.addClass('active');
			$navBoxList.eq(initialIndex).removeClass('active');
			handleGroup(index);
			initialIndex = index;
		});
	});


	return {
		async init() {
			// 1.验证当前用户是否登录
			let result = await axios.get('/user/login');
			if (result.code != 0) {
				// 未登录
				alert('小主，您还没有登录哦，请您先登录~~');
				window.location.href = 'login.html';
				return;
			}

			// 2.获取登录用户的权限信息和个人信息（AJAX并行）
			let [power, baseInfo] = await axios.all([
				axios.get('/user/power'),
				axios.get('/user/info')
			]);
			power.code == 0 ? power = power.power : null;
			baseInfo.code == 0 ? baseInfo = baseInfo.data : null;

			// 3. 通知计划表中的任务执行
			$plan.fire(power, baseInfo);

			/* 
			 * 真实项目中，部分玩家会把获取的信息存储到本地 
			 * 【优势】
			 *    1.以后跳转到当前项目的其它页面，如果需要用到这些信息，只需要从本地获取即可，无需再重新向服务器发送请求获取了（减少了请求的次数）
			 *    2.对于权限信息和个人信息，是短时间之内无法经常更新的数据，所以可以借助本地存储做临时数据缓存（设定1MIN，一分中之内重新刷新页面，依然获取的是本地存储的信息，无需再从服务器获取）
			 * 【弊端】
			 *    1.本地存储的信息都是明文存储，这样用户可以基于修改本地信息，恶意篡改权限或者基本信息，导致信息的泄漏或者安全问题 =>在Vue/React项目中，我们可以把信息存储到vuex/redux中，这样既保留了本地存储的好处，也能防止用户自己更改
			 *    2.如果本地错了数据缓存（1MIN），当用户信息或者权限修改后，可能导致本地的数据依然是之前的，而且当用户重新退出登录，在进入首页，我们按理应该是重新获取最新用户的信息，而不是之前用户的信息，但是如果是从本地获取，很可能获取的还是上一个用户的信息； =>在退出登录的时候（或者重新登录的时候）我们应该把之前存储的信息都删除掉；当用户信息发生更改，应该让用户重新退出登录...
			 */
		}
	};
})();
indexModule.init();