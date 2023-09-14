import { useState } from "react";

const App = () => {
	const anecdotes = [
		"Se fazer algo dói, faça isso com mais frequência.",
		"Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!",
		"Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.",
		"Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.",
		"Otimização prematura é a raiz de todo o mal.",
		"Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.",
		"Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.",
		"A única maneira de ir rápido é ir bem.",
	];

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const mostVotes = points.indexOf(Math.max(...points))

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function updatePoints() {
		const newPoints = [...points];
		newPoints[selected] += 1;
		setPoints(newPoints);
	}


	return (
		<>
			<div>
				<h1>Anecdote of the day</h1>
				{anecdotes[selected]} <br />
				has {points[selected]} votes <br />
				<button onClick={() => setSelected(getRandomInt(anecdotes.length))}>
					next anecdote
				</button>
				<button onClick={() => updatePoints()}>vote</button>
			</div>
			<div>
				<h1>Anecdote with most votes</h1>
				{anecdotes[mostVotes]} <br />
				has {points[mostVotes]} votes <br />
			</div>
		</>
	);
};

export default App;
