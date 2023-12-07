//Definimos el array carrito, vacío inicialmente
const carrito = [];

//Booleano para setear si estoy en carrito.html o no
let enCarrito = false;

// Obtener la ubicación del script actual (app.js)
const scriptPath = document.currentScript.src;
const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);


//Array con los objetos productos
const productos = [
    {id: 1, nombre: "Pulsera Ojo Turco Clásica", precio: 500, img: `${basePath}../assets/img/productos/pulsera_ojoturco.png`},
    {id: 2, nombre: "Pulsera Ojo Turco Riqueza", precio: 500, img:`${basePath}../assets/img/productos/pulsera_riqueza.png`},
    {id: 3, nombre: "Atrapasueños", precio: 500, img:`${basePath}../assets/img/productos/atrapasueños.png`},
    {id: 4, nombre: "Estatua de Buda", precio: 800, img:`${basePath}../assets/img/productos/buda_amor.png`},
    {id: 5, nombre: "Pack 8 Sahumerios", precio: 500, img:`${basePath}../assets/img/productos/sahumerios.png`},
    {id: 6, nombre: "Cascada de humo", precio: 1500, img:`${basePath}../assets/img/productos/cascadahumo.png`},
    {id: 7, nombre: "Collar personalizado", precio: 300, img:`${basePath}../assets/img/productos/collares.png`},
    {id: 8, nombre: "Pulsera 7 Nudos", precio: 500, img:`${basePath}../assets/img/productos/pulsera_7nudos.png`},
]

//Mostramos los productos desde el array de productos
function mostrarProductos(productosFiltrados) {
    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = ""; // Limpiar el contenedor
    
    productosFiltrados.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("col-lg-3", "col-6", "mb-4");
        divProducto.setAttribute("data-aos", "zoom-in");
        divProducto.innerHTML = `
            <div class="card product-card">
                <div class="card-img" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.img}')">
                    <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <a class="card-button d-flex" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.img}')">
                    <p class="add-to-cart">Agregar al carrito</p>
                    <p class="price">${producto.precio}</p>
                    </a>
                </div>
            </div>
        `;
        contenedor.appendChild(divProducto);
    });

    

  }

//Agregamos producto al carrito
function agregarAlCarrito(nombre, precio, img) {
    // Agregar producto al carrito
    carrito.push({ nombre, precio, img }); 

    // Actualizar la lista en el modal
    actualizarModalCarrito();

    // Actualizar el contador del botón "Ver carrito"
    actualizarContadorCarrito();

    // Mostrar la alerta de notificación
    mostrarAlertaNotificacion();

    // Guardamos el estado del carrito en storage
    guardarCarritoLocalStorage();


}  

// Actualizamos el listado de productos en modal
function actualizarModalCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ''; // Limpiar la lista actual

    const totalCarrito = document.getElementById('totalCarrito'); //Contador "Total gastado"

    // Cuando no haya productos mostramos un cartel informando carrito vacío
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

    //Mostramos el total gastado segun los objetos del carrito
    const totalGastado = carrito.reduce((total, producto) => total + producto.precio, 0);
    totalCarrito.innerHTML = `
        <h5 class="d-flex justify-content-start">Total en carrito: $${totalGastado}</h5>
    `


  }

  // Funcion para quitar producto del carrito
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el elemento del array
    if (enCarrito === true) {
        actualizarCompraCarrito();
    }
    actualizarModalCarrito(); // Actualizar la lista en el modal
    actualizarContadorCarrito(); // Actualizar el contador carrito
    guardarCarritoLocalStorage();
  }

    // Actualizar el contenido del contador en el botón "Ver carrito"
  function actualizarContadorCarrito () {
    
    const botonContadorCarrito = document.getElementById('btnContadorCarrito');
    const contadorCarrito = carrito.length;

    //Cuando el contador sea 0 (no haya productos) no muestra nada. Cuando no sea 0 muestra el badge
    if (contadorCarrito === 0) {
        botonContadorCarrito.innerText = "";
    } else {
        botonContadorCarrito.innerText = contadorCarrito;
    }
    

  }

  // Funcion para mostrar el modal del carrito
  function mostrarModal() {
    const modalElement = document.getElementById('carritoModal');
    const modal = new bootstrap.Modal(modalElement);

    actualizarModalCarrito();

    modal.show();
  }

  // Funcion para mostrar el alerta al agregar producto al carrito
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

  // Guardar el carrito en el storage
  function guardarCarritoLocalStorage(){
    //mandar al local
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }



  function actualizarCompraCarrito() {

    const listaCompra = document.getElementById('listaCompra');

    const totalProductos = document.getElementById('totalProductos');
    const totalEnvio = document.getElementById('totalEnvio');
    const totalServicio = document.getElementById('totalServicio');
    const totalCompraSaldo = document.getElementById('totalCompraSaldo');

    let envio = 500;
    let servicio = 95;
    

    listaCompra.innerHTML = '';

    // Cuando no haya productos mostramos un cartel informando carrito vacío
    if (carrito.length === 0) {
        const item = document.createElement('tr');
        item.classList.add('item-carrito');
        item.innerHTML = `
            <td class="text-center item-descrip pt-5">Aún no hay productos en carrito</td>
        `
        listaCompra.appendChild(item);
    } else {
        const titulosTabla = document.createElement('tr');
        titulosTabla.classList.add('titulos-tabla');
        titulosTabla.innerHTML = `
            <td></td>
            <td class="text-center">Producto</td>
            <td class="text-center">Precio</td>
            <td class="text-center">Cantidad</td>
            <td class="text-center">Subtotal</td>
            <td></td>
        ` 
        listaCompra.appendChild(titulosTabla);
    }

    
  
    // Agregar cada producto del carrito a la lista del modal
    carrito.map((producto, index) => {
        const item = document.createElement('tr');
        item.classList.add('item-carrito');
        item.innerHTML = `
        <td class="img-item-carrito">
        <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
        </td>
        <td class="text-center item-descrip">${producto.nombre}</td>
        <td class="text-center item-descrip">$${producto.precio}</td>
        <td class="text-center item-descrip">1</td>
        <td class="text-center item-descrip">$${producto.precio}</td>
        <td class="text-center">
            <span class="float-end align-self-center my-button bg-danger text-white" style="cursor: pointer;" onclick="eliminarDeCompra(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            </span>
        </td>
      `;
      listaCompra.appendChild(item);
    });

    //Mostramos el total gastado segun los objetos del carrito
    const totalProd = carrito.reduce((total, producto) => total + producto.precio, 0);
    totalProductos.innerText = `$${totalProd.toFixed(2)}`;

    totalEnvio.innerText = `$${envio.toFixed(2)}`;

    totalServicio.innerText = `$${servicio.toFixed(2)}`;

    let totalComprado = totalProd + envio + servicio;

    totalCompraSaldo.innerText = `$${totalComprado.toFixed(2)}`;
  }

  function eliminarDeCompra (index) {
    carrito.splice(index, 1); // Eliminar el elemento del array
    actualizarCompraCarrito();
    actualizarContadorCarrito(); // Actualizar el contador carrito
    guardarCarritoLocalStorage();


  }


  function obtenerCarritoStorage() {
    // Verificar si hay elementos en localStorage al inicio
    document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos guardados en localStorage
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    

    // Cargar los elementos en el carrito
    if(carrito.length === 0){
        carrito.push(...carritoStorage);
    }


    const rutaActual = document.location.pathname;
  
    if (rutaActual.includes('carrito.html')) {
        // Lógica para carrito.html
        console.log('Estás en carrito.html');
        // Llama a la función correspondiente para carrito.html
        enCarrito = true;
        actualizarCompraCarrito();
      } 
     else {
        // Lógica para index.html
        console.log('Estás en index.html');
        // Llama a la función correspondiente para index.html
        enCarrito = false;
        mostrarProductos(productos);
      }
      

    // Actualizar el contador del carrito
    actualizarContadorCarrito();


    });
}

obtenerCarritoStorage();
