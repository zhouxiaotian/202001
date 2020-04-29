~ function ($) {
	// $:jQuery是保证当前闭包中的$一定是JQUERY
	function zTree(data) {
		// this:基于JQ获取的容器(JQ对象)
		let $this = this,
			level = 0;

		// 绑定数据
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
		$this.html(HTML);

		// 基于事件委托
		$this.click(function (ev) {
			let target = ev.target,
				$target = $(target);
			if (target.tagName === 'EM') {
				let $next = $target.next('ul');
				$target.toggleClass('open');
				$next.stop().slideToggle(300);
			}
		});
	}
	$.fn.zTree = zTree;
}(jQuery);