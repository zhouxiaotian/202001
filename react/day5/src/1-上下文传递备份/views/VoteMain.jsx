import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

function ratio(supNum, oppNum) {
	let total = supNum + oppNum;
	if (total === 0) return '--';
	return (supNum / total * 100).toFixed(2) + '%';
}

export default function VoteMain() {
	// 想要应用ThemeContext上下文对象中提供的上下文
	const context = useContext(ThemeContext),
		{ supNum, oppNum } = context;
	return <main className="voteMain">
		<p>支持数：{supNum}</p>
		<p>反对数：{oppNum}</p>
		<p>支持率：{ratio(supNum, oppNum)}</p>
	</main>;
};