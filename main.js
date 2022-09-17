const tbody = document.querySelector(".tbody");
const loading = document.querySelector(".loading");
let bebidas = [];

const request = async () => {
  const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  const response = await fetch(baseURL);
  const data = await response.json();
  return data;
};

async function init() {
  tbody.innerHTML = "";
  loading.classList.remove("hide");
  for (let i = 0; i < 10; i++) {
    bebidas.push(await request());
  }
  loading.classList.add("hide");
  renderBebidas(bebidas);
}
init();

function renderBebida(bebida) {
  const cocktail = bebida.drinks[0];
  return `
    <div class="bebida-card">
      <h1>${cocktail.strDrink}</h1>
      <img src="${cocktail.strDrinkThumb}" alt="">
      <p class="categoria"><span>Categoría:</span> ${cocktail.strCategory}</p>
      <p class="precio">$${cocktail.idDrink}</p>
      <button class="btn-agregar" onclick="add('${cocktail.idDrink}', '${cocktail.strDrink}', '${cocktail.strDrinkThumb}')">Agregar</button>
    </div>
  `;
}

function renderBebidas(drinks) {
  tbody.innerHTML = drinks.map((bebida) => renderBebida(bebida)).join("");
}

// **********************

const botones = document.querySelectorAll(".category-btn");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    let categoria = boton.innerText;
    let seleccionadas = [];

    if (categoria !== "Todo") {
      for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].drinks[0].strCategory === categoria) {
          seleccionadas.push(bebidas[i]);
        }
      }
      tbody.innerHTML = "";
      renderBebidas(seleccionadas);
    } else {
      tbody.innerHTML = "";
      renderBebidas(bebidas);
    }
  });
});
