const App = () => {
	const course = "Desenvolvimento de aplicação Half Stack";
	const part1 = {
    name: 'Fundamentos da biblioteca React',
    exercises: 10
  }
  const part2 = {
    name: 'Usando props para passar dados',
    exercises: 7
  }
  const part3 = {
    name: 'Estado de um componente',
    exercises: 14
  }

	return (
		<div>
			<Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
			<Total total={part1.exercises + part2.exercises + part3.exercises} />
		</div>
	);
};

const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Content = (props) => {
	return (
		<div>
			<Part name={props.part1.name} exercises={props.part1.exercises} />
			<Part name={props.part2.name} exercises={props.part2.exercises} />
			<Part name={props.part3.name} exercises={props.part3.exercises} />
		</div>
	);
};

const Part = (props) => {
	return <p>{props.name} {props.exercises}</p>
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>
}

export default App;
