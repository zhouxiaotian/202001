import React from 'react';
import PropTypes from 'prop-types';

export default class Vote extends React.Component {
	render() {
		let { title } = this.props;
		return <div className="voteBox">
			{title}
		</div>;
	}
};