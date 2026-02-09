const contenedorProductos = document.getElementById("contenedorProductos")
const inputBusqueda = document.getElementById("inputBusqueda")
const botonBuscar = document.getElementById("botonBuscar")


//Para la paginacion
const btnAnterior = document.getElementById("botonAnterior")
const btnSiguiente = document.getElementById("botonSiguiente")
const infoPagina = document.getElementById("paginaActual")


let listaProductos = []
let skip = 0
const limit = 12
let totalProductos = 0


//Para busqueda
let textoBusquedaActual = ""
let modoBusqueda = false


//Para categoria
const selectCategoria = document.getElementById("selectCategoria")
let categoriaActual = ""

//llamar las categorias
fetch("https://dummyjson.com/products/category-list")
    .then(res => res.json())
    .then(categorias => {
        categorias.forEach(categoria => {
            const option = document.createElement("option")
            option.value = categoria
            option.textContent = categoria
            selectCategoria.appendChild(option)
        })
    })




/*cargar 10 productos al iniciar
fetch("https://dummyjson.com/products?limit=10")
.then(respuesta => respuesta.json())
.then(datos => {
    listaProductos = datos.products
    mostrarProductos(listaProductos)
})*/


//cargar productos con paginacion
const cargarProductos = () => {
    let url = ""

    if (categoriaActual !== "") {
        url = `https://dummyjson.com/products/category/${categoriaActual}?limit=${limit}&skip=${skip}`
    }
    else if (modoBusqueda && textoBusquedaActual !== "") {
        url = `https://dummyjson.com/products/search?q=${textoBusquedaActual}&limit=${limit}&skip=${skip}`
    }
    else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    }

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            listaProductos = datos.products
            totalProductos = datos.total
            mostrarProductos(listaProductos)
            actualizarBotones()
        })
}
cargarProductos()

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

//Pagina siguiente
btnSiguiente.addEventListener("click", () => {
    if (skip + limit < totalProductos) {
        skip += limit
        cargarProductos()
    }
})
//Pagina anterior
btnAnterior.addEventListener("click", () => {
    if (skip > 0) {
        skip -= limit
        cargarProductos()
    }
})

//Actualizar estado de botones
const actualizarBotones = () => {
    if (totalProductos === 0) return
    const paginaActual = Math.floor(skip / limit) + 1
    const totalPaginas = Math.ceil(totalProductos / limit)

    infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`

    btnAnterior.disabled = skip === 0
    btnSiguiente.disabled = skip + limit >= totalProductos
}


//buscar productos
botonBuscar.addEventListener("click", () => {
    textoBusquedaActual = inputBusqueda.value.trim()
    skip = 0

    if (textoBusquedaActual === "") {
        modoBusqueda = false
    } else {
        modoBusqueda = true
        categoriaActual = ""
        selectCategoria.value = ""
    }
    cargarProductos()
})



inputBusqueda.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        botonBuscar.click()
    }
})

// ir a detalle
const verDetalle = (idProducto) => {
    window.location.href = "detalles.html?id=" + idProducto
}


//Para categoria
selectCategoria.addEventListener("change", () => {
    categoriaActual = selectCategoria.value
    skip = 0

    // Apagar búsqueda si se usa categoría
    modoBusqueda = false
    textoBusquedaActual = ""
    inputBusqueda.value = ""

    cargarProductos()
})

