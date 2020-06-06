/* 包含了当前项目中的所有请求信息 */
import axios from './axios';

// 查看当天新闻（含轮播图信息）
export function API_LATEST() {
	return axios.get("/news/latest");
}

// 查看文章详细信息
export function API_DETAIL(id) {
	return axios.get(`/news/${id}`);
}

// 查看过往信息
export function API_BEFORE(time) {
	return axios.get(`/news/before/${time}`);
}

// 查看文章评论数
export function API_COMMENT(id) {
	return axios.get(`/story-extra/${id}`);
}