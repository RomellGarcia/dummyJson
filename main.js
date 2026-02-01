const contenedorProductos = document.getElementById("contenedorProductos")
const inputBusqueda = document.getElementById("inputBusqueda")
const botonBuscar = document.getElementById("botonBuscar")

let listaProductos = []

//cargar 10 productos al iniciar
fetch("https://dummyjson.com/products?limit=10")
.then(respuesta => respuesta.json())
.then(datos => {
    listaProductos = datos.products
    mostrarProductos(listaProductos)
})

//Mostrar productos
const mostrarProductos = (productos) => {
    contenedorProductos.innerHTML = ""

    productos.forEach(producto => {
        contenedorProductos.innerHTML += `<div class="tarjeta-producto" onclick="verDetalle(${producto.id})">
                <img src="${producto.thumbnail}" class="imagen-producto">
                <div class="info-producto">
                    <div class="nombre-producto">${producto.title}</div>
                    <div class="categoria-producto">${producto.category}</div>
                    <div class="precio-producto">$${producto.price}</div>
                    <div>Descuent: ${producto.discountPercentage}%</div>
                    <div>Marca: ${producto.brand}</div>
                    <div>Rating: ${producto.rating}</div>
                </div>
            </div>`
    })
}

//buscar productos
botonBuscar.addEventListener("click", () => {
    let textoBusqueda = inputBusqueda.value

    if(textoBusqueda === ""){
        fetch("https://dummyjson.com/products?")
        .then(respuesta => respuesta.json())
        .then(datos => mostrarProductos(datos.products))
        return
    }

    fetch("https://dummyjson.com/products/search?q=" + textoBusqueda)
    .then(respuesta => respuesta.json())
    .then(datos => {
        mostrarProductos(datos.products)
    })
})

// ir a detalle
const verDetalle = (idProducto) => {
    window.location.href = "detalles.html?id=" + idProducto
}
