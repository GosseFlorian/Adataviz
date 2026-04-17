import './card.css'

export function Card({titre, lieu, realisateur, onToggle}) {

  return (
    <div className="card">
      <h2>Title : {titre}</h2>
      <h3>Lieu : {lieu}</h3>
      <p className="more-desc hide">Realisateur : {realisateur}</p>
      <button className="button" onToggle={onToggle}>See more</button>
    </div>
  );
}