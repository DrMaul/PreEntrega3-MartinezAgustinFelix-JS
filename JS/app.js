const carrito = [];

// Verificar si hay elementos en localStorage al inicio
document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos guardados en localStorage
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Cargar los elementos en el array Carrito
    carrito.push(...carritoStorage);
  
    actualizarContadorCarrito();

    });


const productos = [
    {id: 1, nombre: "Pulsera Ojo Turco Clásica", precio: 500, img: "./assets/img/productos/pulsera_ojoturco.png"},
    {id: 2, nombre: "Pulsera Ojo Turco Riqueza", precio: 500, img: "./assets/img/productos/pulsera_riqueza.png"},
    {id: 3, nombre: "Atrapasueños", precio: 500, img: "./assets/img/productos/atrapasueños.png"},
    {id: 4, nombre: "Estatua de Buda", precio: 800, img: "./assets/img/productos/buda_amor.png"},
    {id: 5, nombre: "Pack 8 Sahumerios", precio: 500, img: "./assets/img/productos/sahumerios.png"},
    {id: 6, nombre: "Cascada de humo", precio: 1500, img: "./assets/img/productos/cascadahumo.png"},
    {id: 7, nombre: "Collar personalizado", precio: 300, img: "./assets/img/productos/collares.png"},
    {id: 8, nombre: "Pulsera 7 Nudos", precio: 500, img: "./assets/img/productos/pulsera_7nudos.png"},
]

function mostrarProductos(productosFiltrados) {
    const contenedor = document.getElementById("contenedorProductos");
  
    contenedor.innerHTML = ""; // Limpiar el contenedor
    
    productosFiltrados.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("col-lg-3", "col-md-6", "mb-4");
        divProducto.setAttribute("data-aos", "zoom-in");
        divProducto.innerHTML = `
            <div class="card product-card">
                <div class="card-img" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
                    <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <a class="card-button d-flex" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
                    <p class="add-to-cart">Agregar al carrito</p>
                    <p class="price">${producto.precio}</p>
                    </a>
                </div>
            </div>
        `;
        contenedor.appendChild(divProducto);
    });

    

  }

function agregarAlCarrito(nombre, precio) {
    // Agregar producto al array carrito
    carrito.push({ nombre, precio }); 
    console.log(carrito);

    // Actualizar la lista en el modal
  actualizarListaCarrito();

  // Actualizar el contenido del contador en el botón "Ver carrito"
  actualizarContadorCarrito();

  // Mostrar la alerta de notificación
  mostrarAlertaNotificacion();

  guardarCarritoLocalStorage();

  //mostrarModal();

}  

function actualizarListaCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ''; // Limpiar la lista actual

    const totalCarrito = document.getElementById('totalCarrito');

    if (carrito.length === 0) {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = `
            <h5 class="d-flex justify-content-center">Aún no hay productos en carrito</h5>
        `
        listaCarrito.appendChild(item);
    }
  
    // Agregar cada producto del carrito a la lista del modal
    carrito.map((producto, index) => {
      const item = document.createElement('li');
      item.classList.add('list-group-item');
      item.innerHTML = `
        <h5 class="d-flex justify-content-start">${producto.nombre}</h5>
        <p class="float-start mt-2">Precio: $${producto.precio}</p>
        <span class="float-end align-self-center my-button bg-danger text-white" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </span>
      `;
      listaCarrito.appendChild(item);
    });

    const totalGastado = carrito.reduce((total, producto) => total + producto.precio, 0);
    totalCarrito.innerHTML = `
        <h5 class="d-flex justify-content-start">Total en carrito: $${totalGastado}</h5>
    `


  }

  function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el elemento del array
    actualizarListaCarrito(); // Actualizar la lista en el modal
    actualizarContadorCarrito(); // Actualizar el contador carrito
    guardarCarritoLocalStorage()
    //localStorage.clear();
  }

  function actualizarContadorCarrito () {
    // Actualizar el contenido del contador en el botón "Ver carrito"
    const botonContadorCarrito = document.getElementById('btnContadorCarrito');
    const contadorCarrito = carrito.length;
    if (contadorCarrito === 0) {
        botonContadorCarrito.innerText = "";
    } else {
        botonContadorCarrito.innerText = contadorCarrito;
    }
    

  }


  function mostrarModal() {
    const modalElement = document.getElementById('carritoModal');
    const modal = new bootstrap.Modal(modalElement);

    actualizarListaCarrito();

    modal.show();
  }

  function mostrarAlertaNotificacion() {
    const alertaNotificacion = document.getElementById('alertaNotificacion');
    alertaNotificacion.classList.remove('show', 'fade');
    alertaNotificacion.style.display = 'block';

    // Aplicar la clase 'show' para activar la animación de entrada
    setTimeout(function () {
        alertaNotificacion.classList.add('show');
      }, 50); 

    // Ocultar la alerta después de unos segundos (opcional)
    setTimeout(function() {
        // Aplicar la clase 'fade' para activar la animación de salida
        alertaNotificacion.classList.add('fade');
  
        // Quitar la clase 'show' al ocultar
        alertaNotificacion.classList.remove('show');
  
        // Ocultar la alerta después de completar la animación de salida
        setTimeout(function() {
          alertaNotificacion.style.display = 'none';
          alertaNotificacion.classList.remove('fade');
        }, 500); // Duración de la animación de salida
      }, 3000); // Ocultar después de 3 segundos
  }

  function guardarCarritoLocalStorage(){
    //mandar al local
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }


  mostrarProductos(productos);

