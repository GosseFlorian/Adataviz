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
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100",
      {
        signal: controller.signal,
      },
    );
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
        div.className = "card";
        div.innerHTML = `
                    <h2>Title : ${place.nom_tournage}</h2>
                    <h3>Lieu : ${place.adresse_lieu}</h3>
                    <p class="more-desc hide">Realisateur : ${place.nom_realisateur}</p>
                    <p class="more-desc hide">Producteur : ${place.nom_producteur}</p>
                    <p class="more-desc hide">Type de tournage : ${place.type_tournage}</p>
                    <p class="more-desc hide">Année de tournage : ${place.annee_tournage}</p>
                    <p class="more-desc hide">Date de début : ${place.date_debut}</p>
                    <p class="more-desc hide">Date de fin : ${place.date_fin}</p>
                    <button class="button">See more</button>
                    `;
        resultats.appendChild(div);
      }
    }
  } catch (err) {
    if (err.name === "AbortError") return;
    statut.textContent = "Erreur API";
  }

  const buttons = document.querySelectorAll(".button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.parentElement;
      const moreDesc = parent.querySelectorAll(".more-desc");
      moreDesc.forEach((element) => {
        element.classList.toggle("hide");
      });
      if(button.textContent === "See more"){
        button.textContent = "See less"
      } else {
        button.textContent = "See more"
      }
    });
  });
}
