import './Card.css'

export function Card({titre, lieu, realisateur, onClick}) {
  
  return (
    <div className="card">
      <h2>Title : {titre}</h2>
      <h3>Lieu : {lieu}</h3>
      <p className="more-desc">Realisateur : {realisateur}</p>
      <button className="button" onClick={onClick}>See more</button>
    </div>
  );
}