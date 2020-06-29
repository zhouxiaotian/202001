import React from 'react';
import Minus from './Minus';
import Plus from './Plus';
import './Test.less';
import { connect } from 'react-redux';

class Test extends React.Component {
	render() {
		let { count } = this.props;

		return <div className="testBox">
			<Minus />
			<span>{count}</span>
			<Plus />
		</div>;
	}
};
export default connect(state => state.computed)(Test);