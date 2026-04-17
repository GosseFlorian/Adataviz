import { useState } from 'react'
import './card.css'

export function Card({titre, lieu, realisateur}) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle() {
    setIsOpen(!isOpen)
  }
  
  return (
    <div className="card">
      <h2>Title : {titre}</h2>
      <h3>Lieu : {lieu}</h3>
      <p className={isOpen ? "more-desc" : "more-desc hide"}>
        Realisateur : {realisateur}
      </p>
      <button className="button" onClick={handleToggle}>
        {isOpen ? "See less" : "See more"}
      </button>
    </div>
  )
}