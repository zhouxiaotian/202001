/* //example 1
let a={}, b='0', c=0;  
a[b]='珠峰'; //=>a['0']='珠峰'
a[c]='培训';  //=>a[0]='培训'
console.log(a[b]); //=>a={0:'培训'} */

/* //example 2
let a = {},
	b = Symbol('1'),
	c = Symbol('1');
// b!==c  Symbol创建的是唯一值
a[b] = '珠峰';
a[c] = '培训';
console.log(a[b]); //=> a={Symbol('1'):'珠峰',Symbol('1'):'培训'} */

/* //example 3
let a = {},
	b = {
		n: '1'
	},
	c = {
		m: '2'
	};
a[b] = '珠峰'; //=>a["[object Object]"]="珠峰"
a[c] = '培训'; //=>a["[object Object]"]="培训"
console.log(a[b]); //=> a={"[object Object]":"培训"}   =>a["[object Object]"] */