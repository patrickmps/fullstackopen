const App = () => {
	const course = {
    name: 'Desenvolvimento de aplicação Half Stack',
    parts: [
      {
        name: 'Fundamentos da biblioteca React',
        exercises: 10
      },
      {
        name: 'Usando props para passar dados',
        exercises: 7
      },
      {
        name: 'Estado de um componente',
        exercises: 14
      }
    ]
  }

	return (
		<div>
			<Header course={course.name}/>
      <Content parts={course.parts}/>
			<Total parts={course.parts} />
		</div>
	);
};

const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Content = (props) => {
	return (
		<div>
			<Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
			<Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
			<Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
		</div>
	);
};

const Part = (props) => {
	return <p>{props.name} {props.exercises}</p>
}

const Total = (props) => {
	const total = props.parts[0].exercises +props.parts[1].exercises +props.parts[2].exercises
  return <p>Number of exercises {total}</p>
}

export default App;
