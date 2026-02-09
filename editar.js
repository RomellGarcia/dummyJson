const idProducto = new URLSearchParams(window.location.search).get("id");

const inputId = document.getElementById("idProducto");
const inputTitulo = document.getElementById("titulo");
const inputPrecio = document.getElementById("precio");
const inputCategoria = document.getElementById("categoria");
const inputDescripcion = document.getElementById("descripcion");
const mensajeExito = document.getElementById("mensaje-exito");

if (!idProducto) {
    alert("ID de producto no válido");
    window.location.href = "productos.html";
}

// cargar categorías
fetch("https://dummyjson.com/products/category-list")
    .then(res => res.json())
    .then(categorias => {
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            inputCategoria.appendChild(option);
        });
    });

// cargar datos del producto
fetch(`https://dummyjson.com/products/${idProducto}`)
    .then(res => res.json())
    .then(producto => {
        inputId.value = producto.id;
        inputTitulo.value = producto.title;
        inputPrecio.value = producto.price;
        inputCategoria.value = producto.category;
        inputDescripcion.value = producto.description;
    })
    .catch(() => {
        alert("Error al cargar el producto");
        window.location.href = "productos.html";
    });

// guardar cambios
const guardarCambios = () => {
    const titulo = inputTitulo.value.trim();
    const precio = parseFloat(inputPrecio.value);
    const categoria = inputCategoria.value;
    const descripcion = inputDescripcion.value.trim();

    if (!titulo || !precio || !categoria || !descripcion) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (precio <= 0) {
        alert("El precio debe ser mayor a 0");
        return;
    }

    fetch(`https://dummyjson.com/products/${idProducto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titulo,
            price: precio,
            category: categoria,
            description: descripcion
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(`Producto "${titulo}" actualizado exitosamente!`);
            window.location.href = "productos.html";
            setTimeout(() => {
                window.location.href = "productos.html";
            }, 1500);
        })
        .catch(() => {
            alert("Error al guardar los cambios");
        });
};
