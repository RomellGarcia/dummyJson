const contenedorDetalle = document.getElementById("detalleProducto")

let parametrosURL = new URLSearchParams(window.location.search)
let idProducto = parametrosURL.get("id")

fetch("https://dummyjson.com/products/" + idProducto)
.then(respuesta => respuesta.json())
.then(producto => {
    let opiniones = ""
    producto.reviews.forEach(opinion => {
        opiniones += `<div>
                <p><strong>Usuario:</strong> ${opinion.reviewerName}</p>
                <p><strong>Comentario:</strong> ${opinion.comment}</p>
                <p><strong>Calificación:</strong> ${opinion.rating} / 5</p><hr></div>`
    })

    contenedorDetalle.innerHTML = `
        <h2>${producto.title}</h2>
        <img src="${producto.thumbnail}" style="width:300px">
        <p><strong>Descripción:</strong> ${producto.description}</p>
        <p><strong>Precio:</strong> $${producto.price}</p>
        <p><strong>Descuento:</strong> ${producto.discountPercentage}%</p>
        <p><strong>Marca:</strong> ${producto.brand}</p>
        <p><strong>Peso:</strong> ${producto.weight} kg</p>
        <p><strong>Categoría:</strong> ${producto.category}</p>
        <p><strong>Rating promedio:</strong> ${producto.rating}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
        <h3>Opiniones</h3>
        ${opiniones}`
})
