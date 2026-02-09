//PARA LAS CATEGORIAS EN EL HTML
const cargarCategorias = async () => {
    const selectCategoria = document.getElementById("categoria");
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        const categorias = await response.json();

        selectCategoria.innerHTML = "<option value=''>Seleccione una categoría</option>";

        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria;
            option.textContent = categoria.name;
            selectCategoria.appendChild(option);
        }
        );
    }
    catch (error) {
        console.error("Error al cargar las categorías:", error);
        selectCategoria.innerHTML = `<option value="">Error al cargar categorías</option>`;
    }
};
document.addEventListener("DOMContentLoaded", cargarCategorias);


const crearProducto = async () => {
    //alert("Producto creado exitosamente");

    const titulo = document.getElementById("titulo").value;
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const mensajeExito = document.getElementById("mensaje-exito");

    //validar que no esten vacios los campos requeridos

    if (!titulo || !precio || !categoria || !descripcion) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    if (isNaN(precio)) {
        alert("El precio debe ser un número válido.");
        return;
    }

    if (Number(precio) <= 0) {
        alert("El precio debe ser mayor a 0");
        return;
    }

    //Creamos el objeto que se va a enviar
    const Producto = {
        title: titulo,
        price: parseFloat(precio),
        category: categoria,
        description: descripcion,
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg" + titulo
    };

    //hacemos la peticion fetch 
    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(Producto),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del Api:", data);
            alert(`Producto "${data.title}" creado exitosamente!`);
            document.getElementById("titulo").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("categoria").value = "";
            document.getElementById("descripcion").value = "";
        })
        .catch(error => {
            console.error("Error al crear el producto:", error);
            alert("Hubo un error al crear el producto. Por favor, intente nuevamente.");
        });

}


