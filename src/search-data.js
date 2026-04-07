import "./style.css";

export async function searchData(keyword) {
  const statut = document.getElementById("statut");
  const resultats = document.getElementById("resultats");
  let controller = null;

  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  resultats.innerHTML = "";

  try {
    const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100", {
      signal: controller.signal,
    });
    const places = await response.json();

    let filtres = places.results.filter((place) => {
      return place.nom_tournage.toLowerCase().includes(keyword.toLowerCase());
    });
    let tenFiltres = filtres.slice(0, 10);

    if (tenFiltres.length === 0) {
      statut.textContent = `${tenFiltres.length} resultat`;
    } else {
      statut.textContent = `${tenFiltres.length} resultats`;
      for (let place of tenFiltres) {
        const div = document.createElement("div");
        div.className = "place";
        div.innerHTML = `
                    <h3>Title : ${place.nom_tournage}</h3>
                    <h4>Type de tournage : ${place.type_tournage}</h4>
                    <p>Lieu : ${place.adresse_lieu}</p>
                    <button class="button">See more</button>
                    `;
        resultats.appendChild(div);
      }
    }
  } catch (err) {
    if (err.name === "AbortError") return;
    statut.textContent = "Erreur API";
  }

  const button = document.querySelector("button")
  button.addEventListener("click", async () => {
        const { seeMore } = await import("./see-more");
        seeMore()
  })
}
