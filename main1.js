const menu = document.querySelector(".barra");
const container = document.querySelector(".items-container");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
  container.classList.toggle("show");
  nav.classList.toggle("nav-height");
});

// **********************

const primaryNav = document.querySelector(".carrito");
const navToggle = document.querySelector(".cart");
const cerrar = document.querySelector(".btn-cerrar");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", "true");
  }
});

cerrar.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");
  if (visibility === "true") {
    primaryNav.setAttribute("data-visible", "false");
  }
});

// **********************

let products = [];

recuperarLocalStorage();

function add(id, product, img) {
  for (let item in products) {
    if (products[item].nombre === product) {
      products[item].count++;
      sendLocalStorage();
      sumarCantidad();
      pintarHTML();
      return;
    }
  }

  const nuevoObjeto = {
    id: id,
    nombre: product,
    precio: parseFloat(id),
    imagen: img,
    count: 1,
  };

  products.push(nuevoObjeto);
  sendLocalStorage();
  sumarCantidad();
  pintarHTML();
}

function sumarCantidad() {
  let total = 0;
  for (let item in products) {
    total += 1 * products[item].count;
  }
  document.getElementById("checkout").innerHTML = total;
}

function sendLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(products));
}

function recuperarLocalStorage() {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("productos")) {
      products = JSON.parse(localStorage.getItem("productos"));
      pintarHTML();
      sumarCantidad();
    }
  });
}

window.addEventListener("load", () => pintarHTML());
const containerCarrito = document.querySelector(".container-carrito");

function pintarHTML() {
  recuperarLocalStorage();
  sumarTotal();

  containerCarrito.innerHTML = products
    .map((product) => {
      return `
      <div class="item">
        <img src="${product.imagen}" alt="" class="img-carrito">
        <div class="textos">
          <p>${product.nombre}</p>
          <p>Cantidad: ${product.count}</p>
          <p class="precio">$${product.precio * product.count}</p>
        </div>
        <button class="btn-eliminar" id="${product.nombre}">X</button>
     </div>`;
    })
    .join("");

  const btnBorrar = document.querySelectorAll(".btn-eliminar");
  btnBorrar.forEach((element) => {
    element.addEventListener("click", (e) => {
      let borrar = 0;
      for (let item in products) {
        if (products[item].nombre === e.target.id) {
          if (products[item].count > 1) {
            products[item].count--;
          } else {
            borrar = item;
            products.splice(borrar, 1);
          }
          break;
        }
      }

      localStorage.setItem("productos", JSON.stringify(products));
      sumarCantidad();
      pintarHTML();
    });
  });
}

function sumarTotal() {
  let total = 0;

  for (let item in products) {
    total += products[item].precio * products[item].count;
  }

  document.querySelector(".totall").innerHTML = `$${total}`;
  return total;
}

// **********************

const mostrarBtn = document.querySelector(".mostrar-btn");
const containerBotones = document.querySelector(".botones");

console.log(mostrarBtn);

mostrarBtn.addEventListener("click", () => {
  containerBotones.classList.toggle("show-botones");
  if (containerBotones.classList.contains("show-botones")) {
    mostrarBtn.innerHTML = "Ocultar";
  } else {
    mostrarBtn.innerHTML = "Mostrar";
  }
});
