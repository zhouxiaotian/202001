function delay(interval = 1000) {
	return new Promise(resolve => {
		let timer = setTimeout(() => {
			clearTimeout(timer);
			resolve();
		}, interval);
	});
}

function confirmAsync(confirm, content) {
	return new Promise(resolve => {
		confirm({
			content,
			onOk: () => {
				resolve();
			}
		});
	});
};

export default {
	delay,
	confirmAsync
};