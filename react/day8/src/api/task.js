import axios from './axios';

function getTaskList(options = {}) {
	options = Object.assign({
		limit: 10,
		page: 1,
		state: 0
	}, options);
	return axios.get('/getTaskList', {
		params: options
	});
}

function addTask(options = {}) {
	options = Object.assign({
		task: 10,
		time: 1
	}, options);
	return axios.post('/addTask', options);
}

function removeTask(id = 0) {
	return axios.get('/removeTask', {
		params: {
			id
		}
	});
}

function completeTask(id = 0) {
	return axios.get('/completeTask', {
		params: {
			id
		}
	});
}

export default {
	getTaskList,
	addTask,
	removeTask,
	completeTask
};