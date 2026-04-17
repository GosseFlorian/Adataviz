import { useEffect, useState } from "react";
// import './App.css'
import { Button } from "./Components/Button/Button";
import { Card } from "./Components/Card/Card";
import { CardList } from "./Components/CardList/CardList";
import { SearchBar } from "./Components/SearchBar/SearchBar";

function App() {
  const [lieux, setLieux] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredLieux, setFilteredLieux] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  function onInput(event) {
    setInputValue(event.target.value);
  }

  async function fetchData() {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100",
    );

    const data = await response.json();
    setLieux(data.results);
  }

  function filterLieu() {
    const q = inputValue.trim().toLowerCase();
    if (q.length === 0) {
      setFilteredLieux([...lieux]);
      return;
    }

    const filteredData = lieux.filter((lieu) => {
      const fields = [
        lieu.nom_tournage,
        lieu.adresse_lieu,
        lieu.nom_realisateur,
      ];
      return fields.some((field) =>
        String(field ?? "")
          .toLowerCase()
          .includes(q),
      );
    });

    setFilteredLieux(filteredData);
  }

  function getStatut() {
    if (inputValue.trim().length === 0) return "En attente de recherche";
    if (isSearching) return "Recherche en cours...";
    if (filteredLieux !== null && filteredLieux.length === 0)
      return "Pas de résultats...";
    return "";
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setFilteredLieux(null); // remet à "pas cherché"
      setIsSearching(false);
      return;
    }
    setIsSearching(true); // ← dès qu'on tape, on signale "en cours"

    const timer = setTimeout(() => {
      filterLieu();
      setIsSearching(false); // ← quand le timer se déclenche, c'est fini
    }, 500);

    return () => clearTimeout(timer); // ← cleanup : annule le timer si on retape avant 500ms
  }, [inputValue]);

  return (
    <>
      <p>user input : {inputValue}</p>
      <SearchBar onInput={onInput} placeholder="Je recherche" />

      <p>{getStatut()}</p>
      {filteredLieux !== null && (
        <CardList>
          {filteredLieux.map((lieu, index) => (
            <Card
              key={index}
              titre={lieu.nom_tournage}
              lieu={lieu.adresse_lieu}
              realisateur={lieu.nom_realisateur}
            />
          ))}
        </CardList>
      )}
    </>
  );
}

export default App;
