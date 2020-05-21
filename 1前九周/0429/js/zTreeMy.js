$(function () {
	let $zTree1 = $('#zTree1'),
		data = null,
		level = 0;

	// 1.从服务器获取数据（同步）
	$.ajax({
		url: './data.json',
		method: 'get',
		async: false,
		dataType: 'json',
		success: result => {
			data = result;
		}
	});

	// 2.数据绑定（把从服务器获取的数据都动态增加到指定容器中）
	let bindHTML = function bindHTML(data) {
		level++;
		let str = ``;
		data.forEach(item => {
			let {
				name,
				children,
				open
			} = item;
			str += `<li>
				<a href="javascript:;" class="title">${name}</a>
				${
					children && children.length>0?`
					<em class="icon ${open?'open':''}"></em>
					<ul class="level level${level}" 
					style="display: ${open?'block':'none'};">
						${bindHTML(children)}
					</ul>`:``
				}
			</li>`;
		});
		level--;
		return str;
	};
	let HTML = bindHTML(data);
	$zTree1.html(HTML);

	// 3.基于事件委托实现点击切换
	$zTree1.click(function (ev) {
		let target = ev.target,
			$target = $(target);
		// 点击的是EM切换按钮
		if (target.tagName === 'EM') {
			let $next = $target.next('ul');
			$target.toggleClass('open');
			$next.stop().slideToggle(300);
		}
	});
});