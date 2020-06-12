export function formatTime(time) {
	if (time instanceof Date) {
		time = time.toLocaleDateString();
	}
	let arr = [];
	time.replace(/\d+/g, val => {
		arr.push(val.length < 2 ? '0' + val : val);
	});
	return arr.join('');
}

export function delay(interval = 1000) {
	return new Promise(rsolve => {
		setTimeout(() => {
			rsolve();
		}, interval);
	});
}