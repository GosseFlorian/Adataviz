import './cardList.css'

export function CardList({children}){
    return(
        <div className='card-list'>
            {children}
        </div>
    )
}