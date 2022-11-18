let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let precio = 0;
let acumulador = 0;
let totalCarrito;
let acumular;
let span = document.getElementById("span-carrito");

//Funcion para agregar el producto al carrito de compra y subirlo al localstorage.
function agregarAlCarrito(productoAComprar){
    let existe = carrito.some((productoSome)=> productoSome.id === productoAComprar.id);
    if (existe === false) {
        productoAComprar.cantidad = 1;
            carrito.push(productoAComprar);
    }else{
            let findProd = carrito.find((findProducto) => findProducto.id === productoAComprar.id);
            findProd.cantidad++
    }
    const objetoCarrito = JSON.stringify(carrito);
    Swal.fire({
        title: productoAComprar.nombre,
        text: 'Agregado al carrito',
        imageUrl: productoAComprar.imagen,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: productoAComprar.nombre,
        footer: '<a href="carrito.html" style="text-decoration:none"><h3 class="h3">Clickea aqui para ver carrito de compras</h3></a>'  
      })
   //Condicional para pintar el 1 en rojo si hay productos en el carrito o en negro si esta vacio.
      if (carrito.length != 0){
        spanRojo()
    }
        if (carrito.length == 0){
        spanNegro()
    }
        //storage
        localStorage.setItem("carrito",objetoCarrito);
}

//Funcion para mostrar un "1" con circulo rojo si tenemos productos dentro del carrito
function spanNegro() {
    span.classList.remove("cart-rojo")
    span.classList.add("cart-negro")
    console.log(spanNegro)
}
function spanRojo() {
    span.classList.remove("cart-negro")
    span.classList.add("cart-rojo")
    console.log(spanRojo)
}



