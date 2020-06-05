export function delay(interval = 1000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, interval);
	});
};