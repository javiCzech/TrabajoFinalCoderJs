let contenedorCpu = document.getElementById("segundo");
let precioMenor = document.getElementById("menorPrecio")
let precioMayor = document.getElementById("mayorPrecio")
let encuentro = document.getElementById("input-busqueda")
let encuentro2 = document.getElementById("btn-busqueda")
let dolarContenedor = document.getElementById("dolar");
let spanCpu = document.getElementById("span-carrito");
let buscado;

(carrito.length != 0) ? spanRojo():spanNegro();

//Funcion para mostrar un "1" con circulo rojo si tenemos productos dentro del carrito
function spanNegro() {
  spanCpu.classList.remove("cart-rojo")
  spanCpu.classList.add("cart-negro")
}
function spanRojo() {
  spanCpu.classList.remove("cart-negro")
  spanCpu.classList.add("cart-rojo")
}

//Metodo para ordenar mi pagina de productos mediante menor a mayor precio o viceversa.
precioMenor.onclick = () => {
  cpuJSON.sort((a,b) => a.precio - b.precio);//ascendente
  renderizarCpu()
}
    

precioMayor.onclick = () => {
  cpuJSON.sort((a,b) => b.precio - a.precio);//descendente
  renderizarCpu()
}

//Funcion para prevenir la recarga de la pagina cuando se realiza el submit
const submit = (e) => {
  e.preventDefault();
}

encuentro2.addEventListener('click', submit);
encuentro.addEventListener('submit', submit)

//Funcion para buscar tu producto a travez de un Form input
function search(valor) {
  contenedorCpu.innerHTML = ``
  buscado = cpuJSON.filter((item) => item.nombre.includes(valor))
  if (buscado.length != 0){
  for(const procesador of buscado)
    contenedorCpu.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" id="card-animation">
    <div class="card mb-4" id="card-tamaño">
      <img src=${procesador.imagen} class="card-img-top pt-2" alt=${procesador.nombre}
        id="imagen-tarjeta"/>
      <div class="card-body text-center">
        <h2 class="card-title" id="h2">${procesador.nombre}</h2>
        <p>US$${procesador.precio}</p>
        <button class="btn btn-negro mt-3" id="btn${procesador.id}" target="_blank">Comprar</button>
      </div>
    </div>
  </div>
    `
  }
  else if (buscado.length == 0){
    contenedorCpu.innerHTML = `<div class="text-center">
    <h2 class="busqueda">No se encontro el CPU buscado</h2>
    </div>`
  }
    //Eventos
    buscado.forEach((procesador)=>{
      document.getElementById(`btn${procesador.id}`).addEventListener("click",function(){
        agregarAlCarrito(procesador)
      });
    })
} 



//Funcion renderizar Cpu
function renderizarCpu(){
    contenedorCpu.innerHTML = ``
    for(const procesador of cpuJSON)
    contenedorCpu.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" id="card-animation">
    <div class="card mb-4" id="card-tamaño">
      <img src=${procesador.imagen} class="card-img-top pt-2" alt=${procesador.nombre}
        id="imagen-tarjeta"/>
      <div class="card-body text-center">
        <h2 class="card-title" id="h2">${procesador.nombre}</h2>
        <p>US$${procesador.precio}</p>
        <button class="btn btn-negro mt-3" id="btn${procesador.id}" target="_blank">Comprar</button>
      </div>
    </div>
  </div>
    `
    //Eventos
    cpuJSON.forEach((procesador)=>{
      document.getElementById(`btn${procesador.id}`).addEventListener("click",function(){
        agregarAlCarrito(procesador)
      });
    })
}


//Funcion para buscar y mostrar el precio del dolar de hoy.
function dolarCpu(){
  const URLDOLAR="https://api.bluelytics.com.ar/v2/latest";
    fetch(URLDOLAR)
        .then( respuesta => respuesta.json())
        .then( cotizaciones => {
            const dolarLibre = cotizaciones.blue;
            dolarContenedor.innerHTML+=`
                <p>Dolar compra: $ ${dolarLibre.value_buy} Dolar venta: $ ${dolarLibre.value_sell}</p>
            `;
            dolarCompra=dolarLibre.value_buy;
            obtenerCpu();
        })
        //catch del fetch
        .catch(error => console.log("error"))
}

dolarCpu();

// Funcion para obtener los datos de productos.json
async function obtenerCpu() {
  const URLJSON="../dataBase/productos.json";
  const resp = await fetch(URLJSON);
  const data = await resp.json();
  cpuJSON = data[0].cpu
  renderizarCpu()
}
