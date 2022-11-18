let contenedorMotherboard = document.getElementById("tercero");
let dolarContenedor3 = document.getElementById("dolar3");
let motherMenor = document.getElementById("precioMenor");
let motherMayor = document.getElementById("precioMayor");
let motherbuscar = document.getElementById("buscar1");
let motherbuscar2 = document.getElementById("buscar2");
let spanMother = document.getElementById("span-carrito");
let buscado3;

carrito.length != 0 ? spanRojo() : spanNegro();

//Funcion para mostrar un "1" con circulo rojo si tenemos productos dentro del carrito
function spanNegro() {
  spanMother.classList.remove("cart-rojo");
  spanMother.classList.add("cart-negro");
}
function spanRojo() {
  spanMother.classList.remove("cart-negro");
  spanMother.classList.add("cart-rojo");
}

dolarMother();

//Metodo para ordenar mi pagina de productos mediante menor a mayor precio o viceversa.
motherMenor.onclick = () => {
  motherJSON.sort((a, b) => a.precio - b.precio); //ascendente
  renderizarMother();
};

motherMayor.onclick = () => {
  motherJSON.sort((a, b) => b.precio - a.precio); //descendente
  renderizarMother();
};

//Funcion para prevenir la recarga de la pagina cuando se realiza el submit
const submit = (e) => {
  e.preventDefault();
};

motherbuscar2.addEventListener("click", submit);
motherbuscar.addEventListener("submit", submit);

//Funcion para buscar tu producto a travez de un Form input
function search3(valor) {
  contenedorMotherboard.innerHTML = ``;
  buscado3 = motherJSON.filter((item) => item.nombre.includes(valor));
  if (buscado3.length != 0) {
    for (const mother of buscado3)
      contenedorMotherboard.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" id="card-animation">
    <div class="card mb-4" id="card-tamaño">
      <img src=${mother.imagen} class="card-img-top pt-2" alt=${mother.nombre}
        id="imagen-tarjeta"/>
      <div class="card-body text-center">
        <h2 class="card-title" id="h2">${mother.nombre}</h2>
        <p>US$${mother.precio}</p>
        <button class="btn btn-negro mt-3" id="btn${mother.id}" target="_blank">Comprar</button>
      </div>
    </div>
  </div>
    `;
  } else if (buscado3.length == 0) {
    contenedorMotherboard.innerHTML = `<div class="text-center">
    <h2 class="busqueda">No se encontro el Motherboard buscado</h2>
    </div>`;
  }
  //Eventos
  buscado3.forEach((mother) => {
    document
      .getElementById(`btn${mother.id}`)
      .addEventListener("click", function () {
        agregarAlCarrito(mother);
      });
  });
}

//Funcion renderizar Motherboards
function renderizarMother() {
  contenedorMotherboard.innerHTML = ``;
  for (const mother of motherJSON)
    contenedorMotherboard.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" id="card-animation">
    <div class="card mb-4" id="card-tamaño">
      <img src=${mother.imagen} class="card-img-top pt-2" alt=${mother.nombre}
        id="imagen-tarjeta"/>
      <div class="card-body text-center">
        <h2 class="card-title" id="h2">${mother.nombre}</h2>
        <p>US$${mother.precio}</p>
        <button class="btn btn-negro mt-3" id="btn${mother.id}" target="_blank">Comprar</button>
      </div>
    </div>
  </div>
    `;
  //Eventos
  motherJSON.forEach((mother) => {
    document
      .getElementById(`btn${mother.id}`)
      .addEventListener("click", function () {
        agregarAlCarrito(mother);
      });
  });
}

//Funcion para buscar y mostrar el precio del dolar de hoy.
function dolarMother() {
  const URLDOLAR = "https://api.bluelytics.com.ar/v2/latest";
  fetch(URLDOLAR)
    .then((respuesta) => respuesta.json())
    .then((cotizaciones) => {
      const dolarLibre = cotizaciones.blue;
      dolarContenedor3.innerHTML += `
                  <p>Dolar compra: $ ${dolarLibre.value_buy} Dolar venta: $ ${dolarLibre.value_sell}</p>
              `;
      dolarCompra = dolarLibre.value_buy;
      obtenerMotherboard();
    })
    //catch del fetch
    .catch((error) => console.log("error"));
}

// Funcion para obtener los datos de productos.json
async function obtenerMotherboard() {
  const URLJSON = "../dataBase/productos.json";
  const resp = await fetch(URLJSON);
  const data = await resp.json();
  motherJSON = data[0].motherboard;
  renderizarMother();
}
