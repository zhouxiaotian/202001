import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = "";
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = data => qs.stringify(data);
axios.interceptors.request.use(config => {
	return config;
});
axios.interceptors.response.use(response => {
	return response.data;
}, reason => {
	let response = reason.response;
	if (response) {
		switch (parseInt(response.status)) {
			case 404:
				break;
		}
	} else {
		if (!window.navigator.onLine) {}
	}
	return Promise.reject(reason);
});
export default axios;