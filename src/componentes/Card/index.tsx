import "./styles.css";

export interface ICardProps {
  name: string;
  time: string;
};


export function Card({name, time}: ICardProps) {
  return (
    <div className="card">
      <strong> {name} </strong>
      <small> {time} </small>
    </div>
  )
}