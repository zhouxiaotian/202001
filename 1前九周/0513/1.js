/* // 真实项目中需要对URL中的特殊内容（特殊符号、网址、中文汉字等）进行特殊的编译处理
let from = encodeURIComponent('https://www.baidu.com/'),
	name = encodeURIComponent('周啸天');

let url = `http://www.zhufengpeixun.cn/?lx=1&from=${from}&name=${name}`;

// encodeURI / decodeURI
// encodeURIComponent / decodeURIComponent  除了中文，特殊符号都会编码，一般只是给问号传递的参数信息单独的进行编码（而不是整个URL编码）
// escape / unescape  应用于客户端相互页面之间传递信息的时候，对中文进行编码的

console.log(url); */


/* 
 一个大型的项目，需要从很多服务器上获取资源（需要做很多的DNS解析）
  1. 兄弟平台的依赖
  2. 为了服务器的负载均衡，我们分离资源服务器、图片服务器、数据服务器
  3. 一般用户行为统计分析、错误上报等也是单独的服务器
  .....
*/

/* 数据缓存 */
function send() {
	let zhihu = localStorage.getItem('zhihu');
	if (zhihu) {
		zhihu = JSON.parse(zhihu);
		let {
			time,
			data
		} = zhihu;
		if ((new Date().getTime()) - time <= 60000) {
			// 没有过期
			console.log(data);
			return;
		}
	}
	$.ajax({
		url: './data.json?_=' + Math.random(),
		method: 'get',
		success: result => {
			// 获取数据后，我们不仅仅需要完成数据绑定，而且需要把数据缓存到本地（设置一个缓存的时间，例如1min，以后想要实现的效果是，再次刷新页面，只要本地存储中有数据，并且没有过期，则读取本地数据，不再发送http请求，没有数据或者过期了，才会从新从服务器获取最新的数据...）
			console.log(result);

			localStorage.setItem('zhihu', JSON.stringify({
				time: new Date().getTime(),
				data: result
			}));
		}
	});
}
// send();

// 获取客户端本机的时间（不准：用户可以自己修改）
// console.log(new Date());