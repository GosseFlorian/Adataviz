import { useEffect, useState } from 'react'
// import './App.css'
// import { Button } from './components/Button/Button'
// import { Card } from './components/card/Card'
// import { CardList } from './components/CardList/CardList'
// import { SearchBar } from './components/SearchBar/SearchBar'

function App() {
  const [lieux, setLieux] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [filteredLieux, setFilteredLieux] = useState([])

  function onInput(event) {
    setInputValue(event.target.value)
  }

  async function fetchData() {
    const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100')

    const data = await response.json()
    setLieux(data.results)
    setFilteredLieux(data.results)
  }

  function filterLieu() {
    const q = inputValue.trim().toLowerCase()
    if (q.length === 0) {
      setFilteredLieux([...lieux])
      return
    }

    const filteredData = lieux.filter((lieu) => {
      const fields = [
        lieu.nom_tournage,
        lieu.adresse_lieu,
        lieu.nom_realisateur,
      ]
      return fields.some((field) =>
        String(field ?? '').toLowerCase().includes(q)
      )
    })

    setFilteredLieux(filteredData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <p>user input : {inputValue}</p>
      <SearchBar onInput={onInput} placeholder="Je recherche" />

      <Button onClick={filterLieu} text="Valider" />

      <p>Liste de carte</p>

      <CardList>
        {filteredLieux.map((lieu, index) => (
          <Card             
            key={index}
            titre={lieu.nom_tournage}
            lieu={lieu.adresse_lieu}
            realisateur={lieu.nom_realisateur} />
        ))}
      </CardList>
    </>
  )
}

export default App;