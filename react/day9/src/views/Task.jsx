import React from 'react';
import { connect } from 'react-redux';
import action from '../store/actions/action';
import './Task.less';
import { Button, Tag, Table, Modal, DatePicker, Input, message } from 'antd';
const { TextArea } = Input;
const { confirm } = Modal;

class Task extends React.Component {
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
			return <>
				<Button type="link">完成</Button>
				<Button type="link">删除</Button>
			</>;
		}
	}];

	state = {
		// TABLE
		source: [],
		type: 0,
		// MODAL
		visible: false,
		taskText: '',
		taskTime: ''
	};

	render() {
		let { source, visible, taskText, taskTime, type } = this.state;

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
				rowKey="id"
				pagination={false}>
			</Table>

			{/* DIALOG */}
			<Modal title="新增任务信息" width="60%" okText="提交"
				className="TASKMODAL"
				visible={visible}
				onCancel={this.modalCancel}
				onOk={this.modalConfirm}>

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
							this.setState({
								taskTime: moment
							});
						}}>
					</DatePicker>
				</div>
			</Modal>
		</div>;
	}

	// 第一次渲染之前，首先判断redux中是否有任务信息，没有任务，则派发方法，同步redux容器中的任务信息
	componentWillMount() {
		let { data, queryAllTask } = this.props;
		if (data.length === 0) {
			queryAllTask();
		}
	}

	// 当REDUX容器中状态改变后，通知当前组件重新渲染（把REDUX中的最新信息基于属性传递给组件），此时我们需要获取最新的任务信息，并且同步给私有的状态source
	componentWillReceiveProps(nextProps) {
		this.filterData(nextProps);
	}

	// 根据筛选的类型，把从REDUX获取的全部任务信息筛选成为指定状态下的任务信息
	filterData = props => {
		props = props || this.props;
		let data = props.data,
			type = this.state.type;
		this.setState({
			source: data.filter(item => {
				if (type == 0) return true;
				return item.state == type;
			})
		});
	};

	// 页卡切换
	changeTag = index => {
		if (index == this.state.type) return;
		this.state.type = index;
		this.filterData();
	};

	// 控制MODAL的显示隐藏和数据提交
	modalCancel = () => {
		this.setState({
			visible: false,
			taskText: '',
			taskTime: ''
		});
	};
	modalConfirm = () => {
		// let { taskText, taskTime } = this.state;
		// taskTime = taskTime ? taskTime.format('YYYY-MM-DD HH:mm:ss') : '';
	};
};

export default connect(state => state.task, action.task)(Task);