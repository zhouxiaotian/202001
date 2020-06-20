import React from 'react';
import './Task.less';
import { Button, Tag, Table, Modal, DatePicker, Input } from 'antd';
const { TextArea } = Input;

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
		render(text, record) {
			// text:存储当前这一列的值(不指定dataIndex和record一样)  
			// record:当前行的数据
			return <>
				<Button type="link">完成</Button>
				<Button type="link">删除</Button>
			</>;
		}
	}];

	state = {
		// TABLE相关的
		source: [],
		page: 1,
		limit: 5,
		// 关于Modal
		visible: true,
		isConfirm: false
	};

	render() {
		let { source, page, limit, visible, isConfirm } = this.state;

		return <div className="TaskBox">
			{/* HEADER */}
			<header className="headerBox">
				<h2 className="title">TASK OA</h2>
				<Button type="dashed">新增任务</Button>
			</header>

			{/* TAG */}
			<div className="tagBox">
				<Tag color="cyan">全部</Tag>
				<Tag>未完成</Tag>
				<Tag>已完成</Tag>
			</div>

			{/* TABLE */}
			<Table dataSource={source}
				columns={this.columns}
				rowKey="id"
				pagination={{
					current: page,
					pageSize: limit,
					onChange: current => {
						console.log(current);
					}
				}}>
			</Table>

			{/* DIALOG */}
			<Modal title="新增任务信息" width="60%" okText="提交"
				visible={visible}
				confirmLoading={isConfirm}
				onCancel={this.modalCancel}
				onOk={this.modalConfirm}
				okButtonProps={{
					disabled: isConfirm
				}}>

				<div className="formItem">
					<span>任务描述</span>
					<TextArea rows={3} />
				</div>

				<div className="formItem">
					<span>完成时间</span>
					<DatePicker showTime
						onChange={_ => { }}
						onOk={_ => { }}>
					</DatePicker>
				</div>
			</Modal>
		</div>;
	}
	modalCancel = () => { };
	modalConfirm = () => { };
};