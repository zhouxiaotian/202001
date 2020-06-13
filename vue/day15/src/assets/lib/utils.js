function delay(interval = 1000) {
	return new Promise(resolve => {
		let timer = setTimeout(() => {
			clearTimeout(timer);
			resolve();
		}, interval);
	});
}

function queryNowTime(date = new Date()) {
	let time = date.toLocaleString('chinese', {
		hour12: false
	});
	time = time.match(/\d+/g).map(item => item.length < 2 ? '0' + item : item);
	return `${time[0]}-${time[1]}-${time[2]} ${time[3]}:${time[4]}:${time[5]}`;
}

export default {
	delay,
	queryNowTime
};