/* var num = 10; //=>window.num=10 60 65
var obj = {
	num: 20 //=>30
};
obj.fn = (function (num) {
	/!*
	 * 私有上下文EC(AN)
	 *   作用域链:<EC(AN),EC(G)>
	 *   初始化THIS:window
	 *   形参赋值:num=20 21 22 23
	 *   变量提升:--
	 *!/
	this.num = num * 3; //=>window.num=60
	num++;
	return function (n) { //=>BBBFFF000
		/!*
		 * 第一次执行：私有上下文 EC(FN1)
		 *   作用域链:<EC(FN1),EC(AN)>
		 *   初始化THIS:window
		 *   形参赋值:n=5
		 *   变量提升:--
		 *!/
		// this.num += n; //=>window.num+=5
		// num++;
		// console.log(num); //=>22

		/!*
		 * 第二次执行：私有上下文 EC(FN2)
		 *   作用域链:<EC(FN2),EC(AN)>
		 *   初始化THIS:obj
		 *   形参赋值:n=10
		 *   变量提升:--
		 *!/
		this.num += n; //=>obj.num+=10
		num++;
		console.log(num); //=>23
	}
})(obj.num);
// obj.fn = function (n) {...} BBBFFF000
// fn = function (n) {...} BBBFFF000
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num); //=>65 30 */


/* var num = 10;
var obj = {
	num: 20
};
obj.fn = (function (num) {
	this.num = num * 3;
	num++;
	return function (n) {
		this.num += n;
		num++;
		console.log(num);
	}
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num); */

/* (function () {
	/!* 
	 * 形成一个私有的上下文（闭包）EC(AN)
	 *  =>让里面的变量和外界不冲突：闭包的保护作用 
	 *!/
	var val = 1; //=>EC(AN)的私有变量  =>2
	var json = {
		val: 10, //=>JSON对象的一个属性（不是变量）
		dbl: function () {
			/!*
			 * 私有上下文 EC(DBL)
			 *   作用域链:<EC(DBL),EC(AN)>
			 *!/
			val *= 2; //=>val不是自己私有变量,是EC(AN)中的变量
		}
	};
	json.dbl();
	alert(json.val + val); //=>10+2 =>"12"
})(); */


/* window.val = 1;
var json = {
	val: 10,
	dbl: function () {
		this.val *= 2;
	}
}
json.dbl();
/!*
 * THIS：JSON
 *   JSON.val*=2;
 * JSON.val=20
 *!/
var dbl = json.dbl;
dbl();
/!*
 * THIS：WINDOW
 *   WINDOW.val *= 2;
 * WINDOW.val=2
 *!/
json.dbl.call(window); //=>CALL也是让方法执行，只不过让方法中的THIS强制改变为WINDOW
/!*
 * THIS：WINDOW
 *   WINDOW.val *= 2;
 * WINDOW.val=4
 *!/
alert(window.val + json.val); //=>"24" */


/* var name = 'window';
var Tom = {
	name: "Tom",
	show: function () {
		console.log(this.name);
	},
	wait: function () {
		// this:Tom
		// fun = this.show = Tom.show
		var fun = this.show;
		fun(); //=>fun中的this:window
	}
};
Tom.wait(); */

/* var fullName = 'language';
var obj = {
	fullName: 'javascript',
	prop: {
		getFullName: function () {
			return this.fullName;
		}
	}
};
console.log(obj.prop.getFullName());
//=>this:obj.prop  //=>obj.prop.fullName //=>undefined

var test = obj.prop.getFullName;
console.log(test());
//=>this:window  //=>window.fullName  //=>"language" */

/* let obj = {
	// fn等于自执行函数执行的返回值（返回的小函数）
	// fn : function () {console.log(this);}
	fn: (function () {
		return function () {
			console.log(this);
		}
	})()
};
obj.fn(); //=>this:obj
let fn = obj.fn;
fn(); //=>this:window */