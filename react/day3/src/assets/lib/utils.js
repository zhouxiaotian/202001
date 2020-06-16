function delay(interval = 1000) {
	return new Promise(resolve => {
		let timer = setTimeout(() => {
			clearTimeout(timer);
			resolve();
		}, interval);
	});
}

export default {
	delay
};