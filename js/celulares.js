let contenedorCelular = document.getElementById("primero");
let dolarContenedor2 = document.getElementById("dolar2")
let encontrar = document.getElementById("busqueda")
let encontrar2 = document.getElementById("busqueda2")
let menorPrecio = document.getElementById("menor")
let mayorPrecio = document.getElementById("mayor")
let spanCelular = document.getElementById("span-carrito")
let motherJSON;
let buscado2;

(carrito.length != 0) ? spanRojo():spanNegro();


//Funcion para mostrar un "1" con circulo rojo si tenemos productos dentro del carrito
function spanNegro() {
  spanCelular.classList.remove("cart-rojo")
  spanCelular.classList.add("cart-negro")
}
function spanRojo() {
  spanCelular.classList.remove("cart-negro")
  spanCelular.classList.add("cart-rojo")
}


//Metodo para ordenar mi pagina de productos mediante menor a mayor precio o viceversa.
menorPrecio.onclick = () => {
  celularesJSON.sort((a,b) => a.precio - b.precio);//ascendente
  renderizarCelular()
}
    

mayorPrecio.onclick = () => {
  celularesJSON.sort((a,b) => b.precio - a.precio);//descendente
  renderizarCelular()
}

//Funcion para prevenir la recarga de la pagina cuando se realiza el submit
const submit = (e) => {
  e.preventDefault();
}

encontrar.addEventListener('click', submit);
encontrar2.addEventListener('submit', submit)

//Funcion para buscar tu producto a travez de un Form input
function search2(valor) {
  contenedorCelular.innerHTML = ``
  buscado2 = celularesJSON.filter((item) => item.nombre.includes(valor))
  if (buscado2.length != 0){
    for(const celular of buscado2)
    contenedorCelular.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" id="card-animation">
      <div class="card mb-4" id="card-tamaño">
        <img src=${celular.imagen} class="card-img-top pt-2" alt=${celular.nombre}
          id="imagen-tarjeta"/>
        <div class="card-body text-center">
          <h2 class="card-title" id="h2">${celular.nombre}</h2>
          <p>US$${celular.precio}</p>
          <button class="btn btn-negro mt-3" id="btn${celular.id}" target="_blank">Comprar</button>
        </div>
      </div>
    </div>
      `
  }
  else if (buscado2.length == 0){
    contenedorCelular.innerHTML = `<div class="text-center">
    <h2 class="busqueda">No se encontro el celular buscado</h2>
    </div>`
  }
    //Eventos
    buscado2.forEach((celular)=>{
      document.getElementById(`btn${celular.id}`).addEventListener("click",function(){
        agregarAlCarrito( celular)
      });
    })
} 



// Funcion renderizar Celulares
function renderizarCelular(){
    contenedorCelular.innerHTML = ``
    for(const celular of celularesJSON)
    contenedorCelular.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" id="card-animation">
    <div class="card mb-4" id="card-tamaño">
      <img src=${celular.imagen} class="card-img-top pt-2" alt=${celular.nombre}
        id="imagen-tarjeta"/>
      <div class="card-body text-center">
        <h2 class="card-title" id="h2">${celular.nombre}</h2>
        <p>US$${celular.precio}</p>
        <button class="btn btn-negro mt-3" id="btn${celular.id}" target="_blank">Comprar</button>
      </div>
    </div>
   </div>` 
    //Eventos
    celularesJSON.forEach((celular)=>{
      document.getElementById(`btn${celular.id}`).addEventListener("click",function(){
        agregarAlCarrito( celular)
      });
    })
    
}


//Funcion para buscar y mostrar el precio del dolar de hoy.
function dolarCelular(){
    const URLDOLAR="https://api.bluelytics.com.ar/v2/latest";
      fetch(URLDOLAR)
          .then( respuesta => respuesta.json())
          .then( cotizaciones => {
              const dolarLibre = cotizaciones.blue;
              dolarContenedor2.innerHTML+=`
                  <p>Dolar compra: $ ${dolarLibre.value_buy} Dolar venta: $ ${dolarLibre.value_sell}</p>
              `;
              dolarCompra=dolarLibre.value_buy;
              obtenerCelular();
          })
          //catch del fetch
          .catch(error => console.log("error"))
  }
  
  dolarCelular();
  
// Funcion para obtener los datos de productos.json
  async function obtenerCelular() {
    const URLJSON="../dataBase/productos.json";
    const resp = await fetch(URLJSON);
    const data = await resp.json();
    celularesJSON = data[0].celulares
    renderizarCelular()
  }




