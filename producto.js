// Paginación
const btnAnterior = document.getElementById("btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")
const infoPagina = document.getElementById("infoPagina")

let skip = 0
const limit = 10
let totalProductos = 0

//TABLA
const cuerpoTabla = document.getElementById("cuerpoTabla");
const cargarProductos = () => {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then(data => {
            totalProductos = data.total
            TablaProductos(data.products)
            actualizarPaginacion()
        })
        .catch(error => {
            console.error("Error al cargar productos:", error)
        })
}


const TablaProductos = (productos) => {
    cuerpoTabla.innerHTML = "";
    productos.forEach(producto => {
        cuerpoTabla.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td>${producto.stock}</td>
            <td><img src="${producto.thumbnail}" width="40"></td>
            <td class="acciones">
            <button onclick="window.location.href='editar.html?id=${producto.id}'" class="btn btn-primary">Editar</button>
            <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar </button>
            </td>
        </tr>`;
    });
};
cargarProductos();

btnSiguiente.addEventListener("click", () => {
    if (skip + limit < totalProductos) {
        skip += limit
        cargarProductos()
    }
})
btnAnterior.addEventListener("click", () => {
    if (skip > 0) {
        skip -= limit
        cargarProductos()
    }
})
const actualizarPaginacion = () => {
    const paginaActual = Math.floor(skip / limit) + 1
    const totalPaginas = Math.ceil(totalProductos / limit)

    infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`

    btnAnterior.disabled = skip === 0
    btnSiguiente.disabled = skip + limit >= totalProductos
}


//funcion para eliminar producto
const eliminarProducto = (idProducto) => {
    const confirmacion = confirm("¿Está seguro de que desea eliminar este producto?");
    if (!confirmacion) {
        return;
    }

    fetch(`https://dummyjson.com/products/${idProducto}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            alert(`Producto "${data.title}" eliminado exitosamente`);
            cargarProductos();
        })
        .catch(error => {
            console.error("Error al eliminar el producto:", error);
        });
};

cargarProductos();