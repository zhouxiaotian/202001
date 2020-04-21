/*
 * UTILS中集合了我们以后项目中经常会使用的方法 
 */
let utils = (function () {
	function getCss(element, attr) {
		let value = window.getComputedStyle(element)[attr],
			reg = /^\d+(px|rem|em)?$/i;
		if (reg.test(value)) {
			value = parseFloat(value);
		}
		return value;
	}

	function setCss(element, attr, value) {
		if (attr === "opacity") {
			element['style']['opacity'] = value;
			element['style']['filter'] = `alpha(opacity=${value*100})`;
			return;
		}
		let reg = /^(width|height|margin|padding)?(top|left|bottom|right)?$/i;
		if (reg.test(attr)) {

			if (!isNaN(value)) {
				value += 'px';
			}
		}
		element['style'][attr] = value;
	}

	function setGroupCss(element, options) {
		for (let key in options) {
			if (!options.hasOwnProperty(key)) break;
			setCss(element, key, options[key]);
		}
	}

	function css(element) {
		let len = arguments.length,
			attr = arguments[1],
			value = arguments[2];
		if (len >= 3) {
			// 单一设置样式
			setCss(element, attr, value);
			return;
		}
		if (attr !== null && typeof attr === "object") {
			// 批量设置
			setGroupCss(element, attr);
			return;
		}
		// 获取样式
		return getCss(element, attr);
	}

	function offset(element) {
		let parent = element.offsetParent,
			top = element.offsetTop,
			left = element.offsetLeft;
		while (parent) {
			if (!/MSIE 8/.test(navigator.userAgent)) {
				left += parent.clientLeft;
				top += parent.clientTop;
			}
			left += parent.offsetLeft;
			top += parent.offsetTop;
			parent = parent.offsetParent;
		}
		return {
			top,
			left
		};
	}

	// window['_css'] = css;
	// window['_offset'] = offset;
	
	return {
		css,
		offset
	};
})();