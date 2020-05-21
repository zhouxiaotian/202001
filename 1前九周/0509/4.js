/* new Promise(resolve => {
	setTimeout(() => {
		resolve(10); //1000MS后 第一个PROMISE实例状态是成功  VALUE:10
	}, 1000);
}).then(result => {
	console.log(`成功：${result}`); //=>'成功:10'
	return result * n; //报错:ReferenceError: n is not defined  也就是让此次THEN返回的PROMISE实例变为失败态，VALUE:失败的原因
}, reason => {
	console.log(`失败：${reason}`);
	return reason * 10;
}).then(result => {
	console.log(`成功：${result}`);
	return result * 20;
}, reason => {
	console.log(`失败：${reason}`); //=>'失败: ReferenceError: n is not defined'
	return reason * 10; //NaN  代码执行没有报错，让当前THEN返回的实例状态：成功  VALUE：NAN
}).then(result => {
	console.log(`成功：${result}`); //=>'成功：NaN'
	return result * 20; //NaN  代码执行没有报错，让当前THEN返回的实例状态：成功  VALUE：NAN
}, reason => {
	console.log(`失败：${reason}`);
	return reason * 10;
}).then(result => {
	console.log(`成功：${result}`); //=>'成功：NaN'
	return Promise.reject(result * 20); //返回的新的失败的PROMISE实例影响了本次THEN返回PROMISE实例的状态和结果（和RETURN的保持一致）
}, reason => {
	console.log(`失败：${reason}`);
	return Promise.resolve(reason * 10);
}).then(result => {
	console.log(`成功：${result}`);
}, reason => {
	console.log(`失败：${reason}`); //=>'失败：NaN'
}); */


//==============在THEN中成功或者失败执行的方法没有设置，会顺延到下一个THEN中查找（依然是按照当前的状态查找，例如：失败的状态，第一个THEN没有设置失败的方法，会找第二个THEN中设置的失败的方法...）
/* new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(10); //状态:失败  值:10
	}, 1000);
}).then(result => {
	console.log(`成功：${result}`);
	return result * 10;
}/!*,reason => { 不写的情况下，PROMISE内部默认补充了一下（实现的效果：继续找下一个THEN中代表失败的）
	return Promise.reject(reason);
}*!/).then(result => {
	console.log(`成功：${result}`);
	return result * 10;
}).then(null, reason => {
	console.log(`失败：${reason}`); //=>'失败:10'
	return reason * 2; 
	//代码执行没有报错，让当前实例状态:成功  值:20
}).then(null/!*result=>{
	return Promise.resolve(result);
}*!/, reason => {
	console.log(`失败：${reason}`);
	return reason * 2;
}).then(result => {
	console.log(`成功：${result}`); //=>'成功:20'
}); */

//==========真实项目中，我们会用 CATCH(REASON=>{}) 代替 THEN(NULL,REASON=>{})，效果是一模一样的（执行CATCH也会返回新的PROMISE实例，里面设置的方法是在实例为失败状态下执行的） =>真实项目中，我们一般THEN中方的是成功执行的，CATCH中放的是失败执行的
/* new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(10);
	}, 1000);
}).then(result => {
	console.log(`成功：${result}`);
	return result * 10;
}).catch(reason => {
	console.log(`失败：${reason}`);
	return reason * 2;
}); */

// console.log(n); //=>Uncaught ReferenceError: n is not defined 浏览器抛出异常信息，下面代码就不会再执行了
// console.log('OK');

/* // JS中的浏览器异常捕获
try {
	// 把可能会报错的代码放置到TRY中捕获异常（代码执行一但报错，控制台是不抛出异常的，不会影响后续代码的执行）
	console.log(n);
} catch (error) {
	// CATCH中捕获到异常信息 （可以把信息上报给服务器）
	// console.log(error);
}
console.log('OK'); */


//=======================================
// Promise.all([PROMISE1,PROMISE2,...])：等待所有的PROMISE实例都成功，整体才是成功的（返回新的PROMISE实例），只要有一个实例是失败的，整体实例就是失败的；

function fn1() {
	return new Promise(resolve => {
		setTimeout(_ => {
			resolve(10);
		}, 2000);
	});
}

function fn2() {
	return Promise.resolve(20);
}

function fn3() {
	return new Promise(resolve => {
		setTimeout(_ => {
			resolve(30);
		}, 500);
	});
}

Promise.all([fn1(), fn2(), fn3()]).then(results => {
	// 只有当三个PROMISE实例都成功的时候（等待最晚有结果的一个也是成功），才会触发执行，results会按照放置的顺序，存储着每一次获取的结果
	console.log(results); //=>[10, 20, 30]
});

// Promise.race() 同时发送多个请求，谁先有处理结果（不管结果是成功还是失败），就以谁的结果为主（哪怕是失败的）