import "./style.css";
import { searchData } from "./search-data";

export function acceuilDom() {
  document.querySelector("#app").innerHTML = `
    <input type="text" id="recherche" placeholder="Tapez pour rechercher..." />
      <div id="resultats"></div>
    `;
    const inputSearch = document.getElementById("recherche");
    inputSearch.addEventListener("input", searchData)
}
