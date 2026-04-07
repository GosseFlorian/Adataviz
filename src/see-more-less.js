import "./style.css";

export function seeMoreLess() {
  console.log("zut");
  const button = document.querySelector(".button")
  button.classList.toggle("hide")
  
  const moreDesc = document.querySelectorAll(".more-desc")
  moreDesc.forEach(element => {
    element.classList.toggle("hide")
  })
}
