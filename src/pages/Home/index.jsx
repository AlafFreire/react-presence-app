import {
	useState,
	useEffect,
} from "react"; /*isso é um hook => Um hook no ReactJS é uma função especial que permite que você use o estado e outros recursos do React em componentes funcionais, sem a necessidade de escrever uma classe. Os hooks permitem que você adicione funcionalidades como manipulação de estado, efeitos colaterais e contexto de forma simples e concisa.*/
import { Card } from "../../componentes/Card";
import "./styles.css";

export function Home() {
	const [user, setUser] = useState({ name: "", avatar: "" });
	const [studentName, setStudentName] = useState("");
	const [students, setStudents] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				"https://api.github.com/users/alaffreire"
			);
			const data = await response.json();

			setUser({
				name: data.name,
				avatar: data.avatar_url,
			});
		}
		fetchData()
	}, []);

	function handleAddStudents() {
		if (!studentName) {
			alert("O campo nome não foi preenchido!")
			return;
		}
		const newStudent = {
			name: studentName,
			time: new Date().toLocaleTimeString("pt-br", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			}),
		};

		setStudents([...students, newStudent]);
	}

	return (
		<div className="container">
			<header>
				<h1>Lista de Presença</h1>

				<div>
					<strong>{user.name}</strong>
					<img src={user.avatar} alt="Avatar" />
				</div>
			</header>
			<input
				type="text"
				placeholder="Dgite o nome ..."
				onChange={(e) => {
					setStudentName(e.target.value);
				}}
			/>
			<button onClick={ handleAddStudents }>Adicionar</button>

			{students.map((student) => (
				<Card key={student.time} name={student.name} time={student.time} />
			))}
		</div>
	);
}
