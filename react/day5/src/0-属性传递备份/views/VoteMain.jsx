import React from 'react';

function ratio(supNum, oppNum) {
	let total = supNum + oppNum;
	if (total === 0) return '--';
	return (supNum / total * 100).toFixed(2) + '%';
}

export default function VoteMain(props) {
	let { supNum = 0, oppNum = 0 } = props;
	return <main className="voteMain">
		<p>支持数：{supNum}</p>
		<p>反对数：{oppNum}</p>
		<p>支持率：{ratio(supNum, oppNum)}</p>
	</main>;
};