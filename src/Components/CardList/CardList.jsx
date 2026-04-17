import './cardList.css'
import { Card } from '../Card/Card'

export function CardList({cards, onClick}){
    return(
        <div className='card-list'>
            {cards.maps(function(card, index){
                return(
                    <Card 
                        key={index}
                        titre={card.nom_tournage}
                        lieu={card.adresse_lieu}
                        realisateur={card.nom_realisateur}
                        onClick={onClick}
                    />
                )
            })}
        </div>
    )
}