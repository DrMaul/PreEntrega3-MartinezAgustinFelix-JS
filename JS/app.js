let carrito = [];



const productos = [
    {id: 1, nombre: "Pulsera Ojo Turco Clásica", precio: 500, img: "https://picsum.photos/306/368/?random=1"},
    {id: 2, nombre: "Pulsera Ojo Turco Riqueza", precio: 500, img: "https://picsum.photos/306/368/?random=2"},
    {id: 3, nombre: "Atrapasueños", precio: 500, img: "https://picsum.photos/306/368/?random=3"},
    {id: 4, nombre: "Estatua de Buda", precio: 800, img: "https://picsum.photos/306/368/?random=4"},
    {id: 5, nombre: "Pack 8 Sahumerios", precio: 500, img: "https://picsum.photos/306/368/?random=5"},
    {id: 6, nombre: "Cascada de humo", precio: 1500, img: "https://picsum.photos/306/368/?random=6"},
    {id: 7, nombre: "Collar personalizado", precio: 300, img: "https://picsum.photos/306/368/?random=7"},
    {id: 8, nombre: "Pulsera 7 Nudos", precio: 500, img: "https://picsum.photos/306/368/?random=8"},
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
                <div class="card-img">
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

  //mostrarModal();

}  

function actualizarListaCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ''; // Limpiar la lista actual
  
    // Agregar cada producto del carrito a la lista
    carrito.map((producto, index) => {
      const item = document.createElement('li');
      item.classList.add('list-group-item');
      item.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p class="float-start align-middle">Precio: $${producto.precio}</p>
        <span class="float-end" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
        </span>
      `;
      listaCarrito.appendChild(item);
    });


  }

  function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el elemento del array
    actualizarListaCarrito(); // Actualizar la lista en el modal
    actualizarContadorCarrito(); // Actualizar el contador carrito
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


  mostrarProductos(productos);

