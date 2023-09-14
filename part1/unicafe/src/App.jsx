import { useState } from "react";

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({ statistics }) => {
	return (
		<>
			<h1>Statistics</h1>
			{statistics.all === 0 ? (
				<p>No feedback given</p>
			) : (
				<table>
					<tbody>
						<StatisticLine text="Good" value={statistics.good} />
						<StatisticLine text="Neutral" value={statistics.neutral} />
						<StatisticLine text="Bad" value={statistics.bad} />
						<StatisticLine text="All" value={statistics.all} />
						<StatisticLine text="Avarage" value={statistics.avarage} />
						<StatisticLine text="Positive" value={statistics.positive} />
					</tbody>
				</table>
			)}
		</>
	);
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
	// salve os cliques de cada botão em seu próprio estado
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const all = good + neutral + bad;
	const avarage = all === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / all;
	const positive = all === 0 ? 0 : (good / all) * 100;

	return (
		<div>
			<h1>Give feedback</h1>
			<span>
				<Button onClick={() => setGood(good + 1)} text="good" />
				<Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
				<Button onClick={() => setBad(bad + 1)} text="bad" />
			</span>
			<Statistics statistics={{ good, neutral, bad, avarage, positive, all }} />
		</div>
	);
};

export default App;
