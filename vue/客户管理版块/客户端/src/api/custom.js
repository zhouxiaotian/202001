import axios from './axios';

function queryCustomList(options) {
	options = Object.assign({
		lx: 'all',
		limit: 15,
		page: 1,
		type: '',
		search: ''
	}, options);
	return axios.get('/customer/list', {
		params: options
	});
}

function addCustom(options) {
	options = Object.assign({
		name: '',
		sex: 0,
		email: '',
		phone: '',
		QQ: '',
		weixin: '',
		type: '',
		address: ''
	}, options);
	return axios.post('/customer/add', options);
}

export default {
	queryCustomList,
	addCustom
};