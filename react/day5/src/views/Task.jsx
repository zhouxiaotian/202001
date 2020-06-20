import React from 'react';
import './Task.less';
import api from '../api/index';
import { Button, Tag, Table, Modal, DatePicker, Input, message } from 'antd';
const { TextArea } = Input;
const { confirm } = Modal;

export default class Task extends React.Component {
	// 表格的表头配置项
	columns = [{
		title: '编号',
		dataIndex: 'id',
		width: '10%'
	}, {
		title: '任务描述',
		dataIndex: 'task',
		width: '40%',
		ellipsis: {
			showTitle: true
		}
	}, {
		title: '状态',
		dataIndex: 'state',
		render: text => text == 1 ? '未完成' : '已完成',
		width: '12%'
	}, {
		title: '完成时间',
		dataIndex: 'time',
		width: '18%'
	}, {
		title: '操作',
		width: '20%',
		render: (text, record) => {
			// text:存储当前这一列的值(不指定dataIndex和record一样)  
			// record:当前行的数据
			return <>
				<Button type="link">完成</Button>

				<Button type="link"
					onClick={this.deleteTask.bind(null, record)}>
					删除
				</Button>
			</>;
		}
	}];

	state = {
		// TABLE相关的
		source: [],
		page: 1,
		limit: 5,
		total: 0,
		isLoading: false,
		// 关于MODAL
		visible: false,
		isConfirm: false,
		taskText: '',
		taskTime: '',
		// 关于TAG 0全部 1未完成 2已完成
		type: 0
	};

	render() {
		let { source, page, limit, visible, isConfirm, taskText, taskTime, type, total, isLoading } = this.state;

		return <div className="TaskBox">
			{/* HEADER */}
			<header className="headerBox">
				<h2 className="title">TASK OA</h2>
				<Button type="dashed" onClick={ev => {
					this.setState({
						visible: true
					});
				}}>新增任务</Button>
			</header>

			{/* TAG */}
			<div className="tagBox">
				{["全部", "未完成", "已完成"].map((item, index) => {
					return <Tag key={index}
						color={index === type ? 'cyan' : ''}
						onClick={this.changeTag.bind(null, index)}>
						{item}
					</Tag>;
				})}
			</div>

			{/* TABLE */}
			<Table dataSource={source}
				columns={this.columns}
				loading={isLoading}
				rowKey="id"
				pagination={{
					current: page,
					pageSize: limit,
					total: total,
					onChange: this.changePagination
				}}>
			</Table>

			{/* DIALOG */}
			<Modal title="新增任务信息" width="60%" okText="提交"
				className="TASKMODAL"
				visible={visible}
				confirmLoading={isConfirm}
				onCancel={this.modalCancel}
				onOk={this.modalConfirm}
				okButtonProps={{
					disabled: isConfirm
				}}>

				<div className="formItem">
					<span>任务描述</span>
					<TextArea rows={3}
						value={taskText}
						onChange={ev => {
							let value = ev.target.value.trim();
							this.setState({ taskText: value });
						}}>
					</TextArea>
				</div>

				<div className="formItem">
					<span>完成时间</span>
					<DatePicker showTime
						value={taskTime}
						onChange={moment => {
							// moment是一个moment对象数据格式的数据
							// console.log(moment.format('YYYY-MM-DD HH:mm:ss'));
							this.setState({
								taskTime: moment
							});
						}}>
					</DatePicker>
				</div>
			</Modal>
		</div>;
	}

	// 第一次渲染之前:立即请求一次数据
	componentWillMount() {
		this.queryData();
	}

	// 从服务器获取数据
	queryData = async () => {
		this.setState({ isLoading: true });

		let { limit, page, type } = this.state;
		let { code, total, list } = await api.task.getTaskList({
			limit,
			page,
			state: type
		});
		if (code == 0) {
			// 成功
			this.setState({
				source: list,
				total: total,
				isLoading: false
			});
			return;
		}
		// 失败
		this.setState({
			source: [],
			total: 0,
			isLoading: false
		});
	};

	// 控制MODAL的显示隐藏和数据提交
	modalCancel = () => {
		// 关闭且清空数据
		this.setState({
			visible: false,
			isConfirm: false,
			taskText: '',
			taskTime: ''
		});
	};
	modalConfirm = async () => {
		this.setState({ isConfirm: true });

		let { taskText, taskTime } = this.state;
		taskTime = taskTime ? taskTime.format('YYYY-MM-DD HH:mm:ss') : '';
		let { code } = await api.task.addTask({
			task: taskText,
			time: taskTime
		});

		this.modalCancel();
		if (code == 0) {
			message.success('恭喜您，新增任务成功！');
			this.setState({
				page: 1,
				type: 0
			}, _ => {
				this.queryData();
			});
			return;
		}
		message.error('很遗憾，新增任务失败！');
	};

	// 控制页卡切换
	changeTag = index => {
		if (index === this.state.type) return;
		this.setState({
			type: index,
			page: 1
		}, _ => {
			// 状态修改成功后触发执行的
			this.queryData();
		});
	};

	// 控制分页的切换
	changePagination = page => {
		this.setState({ page }, _ => {
			this.queryData();
		});
	};

	// 删除任务
	deleteTask = record => {
		confirm({
			content: `您确定要删除编号为 ${record.id} 的任务吗？`,
			onOk: async () => {
				let { code } = await api.task.removeTask(record.id);
				if (code == 0) {
					message.success('恭喜您，任务删除成功！');
					this.queryData();
					return;
				}
				message.error('很遗憾，任务删除失败！');
			}
		});
	};
};