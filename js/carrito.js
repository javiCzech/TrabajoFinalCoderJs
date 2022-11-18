let dolarCompra;


(carrito.length != 0) ? dolarCarrito():carritoVacio();


//Funcion para chequear y calcular el precio del dolar.
async function dolarCarrito(){
    const URLDOLAR="https://api.bluelytics.com.ar/v2/latest";
    const resp = await fetch(URLDOLAR);
    const data = await resp.json();
    const dolarLibre = data.blue;
    dolarCompra=dolarLibre.value_buy;
    renderizarCarrito()
  }

//Funcion para se chequea el carrito y esta vacio
function carritoVacio() {
  document.getElementById("tabla").innerHTML = ``;
        document.getElementById("vacio").innerText = `El Carrito de compras esta vacio.`;
        document.getElementById("total").innerText = ``;
        document.getElementById("dolar").innerText = ``;
        document.getElementById("botones").innerText = ``;
}

//Funcion para renderizar el carrito en la pantalla con la suma del total a pagar.
function renderizarCarrito(){

    for (productos of carrito){
        document.getElementById("tablabody").innerHTML += `
        <tr>
        <td class="tablaBlanca">${productos.id}</td>
        <td class="tablaBlanca">${productos.nombre}</td>
        <td class="tablaBlanca">${((productos.precio))}</td>
        <td class="tablaBlanca">${((productos.precio)*dolarCompra)}</td>
        <td class="tablaBlanca"><img class="img-carrito" src="${productos.imagen}"></td>
        <td class="tablaBlanca">${productos.cantidad}</td>
        <td><button class="btn btn-naranja" onclick="eliminar(event)">❌</td>
        </tr>`
    }
    document.getElementById("total").innerHTML += `${(totalFinal*dolarCompra)}`
    document.getElementById("dolar").innerHTML += `${(totalFinal)}`
    document.getElementById("botones").innerHTML += `<a href="./formulario.html" class="btn btn-naranja text-center mt-5 mb-5" style="text-decoration: none; color: white;" >Finalizar Compra</a>`
}

//Funcion  para eliminar productos del carrito
function eliminar(e){
  if (carrito.length != 0){
    let fila = e.target.parentElement.parentElement;
    let id = fila.children[0].innerText;
    let indice = carrito.findIndex(producto => producto.id == id);
    carrito.splice(indice,1);
    //remueve la fila de la tabla
    fila.remove();
    //recalcular el total
    let preciosAcumulados = carrito.reduce((acumulador,producto)=>acumulador + producto.precio * producto.cantidad,0);
    total.innerText="Total a pagar en pesos $: "+preciosAcumulados*dolarCompra;
    dolar.innerText="Total a pagar en dolares US$ "+preciosAcumulados
    //storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
  }if (carrito.length == 0){
        document.getElementById("tabla").innerHTML = ``;
        document.getElementById("vacio").innerText = `El Carrito de compras esta vacio.`;
        document.getElementById("total").innerText = ``;
        document.getElementById("dolar").innerText = ``;
        document.getElementById("botones").innerText = ``;
}
  
}

//Funcion para calcular el precio total del carrito
let totalFinal = carrito.reduce((acc, item) => {
    return acc + item.precio * item.cantidad;
  }, 0);


// Funcion de limpiar el carrito de compras y el localstorage.
function limpiar(){
        carrito = [];
        localStorage.clear();
        document.getElementById("tabla").innerHTML = ``;
        document.getElementById("vacio").innerText = `El Carrito de compras esta vacio.`;
        document.getElementById("total").innerText = ``;
        document.getElementById("dolar").innerText = ``;
        document.getElementById("botones").innerText = ``;
}
document.getElementById("limpiar").addEventListener("click",function(){
       limpiar()})