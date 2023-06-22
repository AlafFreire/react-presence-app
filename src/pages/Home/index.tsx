import {
	useState,
	useEffect,
} from "react"; /*isso é um hook => Um hook no ReactJS é uma função especial que permite que você use o estado e outros recursos do React em componentes funcionais, sem a necessidade de escrever uma classe. Os hooks permitem que você adicione funcionalidades como manipulação de estado, efeitos colaterais e contexto de forma simples e concisa.*/
import "./styles.css";
import { Card, ICardProps } from "../../componentes/Card";

interface IProfileResponse {
	name: string;
	avatar_url: string;
}

interface IUser {
	name: string;
	avatar: string;
}

export function Home() {
	const [user, setUser] = useState<IUser>({} as IUser);
	const [students, setStudents] = useState<ICardProps[]>([]);
	const [studentName, setStudentName] = useState<string>("");

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("https://api.github.com/users/alaffreire");
			const data = (await response.json()) as IProfileResponse;

			setUser({
				name: data.name,
				avatar: data.avatar_url,
			});
		}
		fetchData();
	}, []);

	function handleAddStudents() {
		const newStudent = {
			name: studentName,
			time: new Date().toLocaleTimeString("pt-br", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			}),
		};

		setStudents((prevState) => [...prevState, newStudent]);
	}

	return (
		<div className="container">
			<header>
				<h1>Lista de Presença</h1>

				<div>
					<strong>{user.name}</strong>
					<img src={user.avatar} alt="Foto de perfil" />
				</div>
			</header>
			<input
				type="text"
				placeholder="Dgite o nome ..."
				onChange={(e) => {
					setStudentName(e.target.value);
				}}
			/>
			<button disabled={!studentName} onClick={handleAddStudents}>
				Adicionar
			</button>

			{students.map((student) => (
				<Card key={student.time} name={student.name} time={student.time} />
			))}
		</div>
	);
}
