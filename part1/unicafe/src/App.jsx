import { useState } from "react";

const App = () => {
	// salve os cliques de cada botão em seu próprio estado
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

  const total =  good + neutral + bad
  const avarage = total === 0 ? 0 : ((good * 1 + neutral * 0 + bad * (-1)) / total)
  const positive = total === 0 ? 0 : ((good / total) * 100)

	return (
		<div>
			<h1>Give feedback</h1>
			<span>
				<button onClick={() => setGood(good + 1)}>good</button>
				<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
				<button onClick={() => setBad(bad + 1)}>bad</button>
			</span>
			<h1>Statistics</h1>
			<p>
				Good {good}
				<br />
				Neutral {neutral}
				<br />
				Bad {bad}
				<br />
				all {total}
				<br />
				average {avarage}
				<br />
				positive {positive}
			</p>
		</div>
	);
};

export default App;
