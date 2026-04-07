import "./style.css";
import { searchData } from "./search-data";

export function acceuilDom() {
  document.querySelector("#app").innerHTML = `
    <h1>Lieux de tournage à Paris</h1>
    <input type="text" id="recherche" placeholder="Tapez pour rechercher..." />
    <p id="statut">Entrez un mot-clé pour commencer.</p>
      <div id="resultats"></div>
    `;
  const inputSearch = document.getElementById("recherche");
  const resultats = document.getElementById("resultats");
  const statut = document.getElementById("statut");
  let debounce = null;

  inputSearch.addEventListener("input", () => {
    let value = inputSearch.value;
    clearTimeout(debounce);

    if (value.length === 0) {
      statut.textContent = "Entrez un mot-clé pour commencer."
      resultats.innerHTML = "";
      return;
    }
    debounce = setTimeout(function () {
      searchData(value);
    }, 500);
  });
}
