import { useState } from "react";

const Statistics = ({ statistics }) => {
	return (
		<>
			<h1>Statistics</h1>
			{statistics.all === 0 ? (
				<p>No feedback given</p>
			) : (
				<p>
					Good {statistics.good}
					<br />
					Neutral {statistics.neutral}
					<br />
					Bad {statistics.bad}
					<br />
					all {statistics.all}
					<br />
					average {statistics.avarage}
					<br />
					positive {statistics.positive}
				</p>
			)}
		</>
	);
};

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
				<button onClick={() => setGood(good + 1)}>good</button>
				<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
				<button onClick={() => setBad(bad + 1)}>bad</button>
			</span>
			<Statistics statistics={{ good, neutral, bad, avarage, positive, all }} />
		</div>
	);
};

export default App;
