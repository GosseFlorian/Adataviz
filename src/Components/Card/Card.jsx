import { useState } from 'react'
import './card.css'

export function Card({titre, lieu, realisateur, producteur, type_tournage, annee_tournage, date_debut, date_fin}) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle() {
    setIsOpen(!isOpen)
  }
  
  return (
    <div className="card">
      <h2 className="title-card">Title : {titre}</h2>
      <h3 className="lieu-card">Lieu : {lieu}</h3>
      <div className={isOpen ? "infos-card" : "infos-card hide"}>
        <p className="info">Realisateur : {realisateur}</p>
        <p className="info">Producteur : {producteur}</p>
        <p className="info">Type de tournage : {type_tournage}</p>
        <p className="info">Année de tournage : {annee_tournage}</p>
        <p className="info">Date de début : {date_debut}</p>
        <p className="info">Date de fin : {date_fin}</p>
      </div>
      <button className="button" onClick={handleToggle}>
        {isOpen ? "See less" : "See more"}
      </button>
    </div>
  );
}