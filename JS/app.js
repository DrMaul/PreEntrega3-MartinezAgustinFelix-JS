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
                <div class="card-img" onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio}, '${producto.img}')">
                    <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <a class="card-button d-flex" onclick="agregarAlCarrito('${producto.id}','${producto.nombre}', ${producto.precio}, '${producto.img}')">
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
function agregarAlCarrito(id, nombre, precio, img) {

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoExistente.cantidad += 1;
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        carrito.push({ id, nombre, precio, img, cantidad: 1 });
      }

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

    //Variable que almacena el total del precio segun la cantidad elegida de un producto  
    const precioTotal = producto.precio * producto.cantidad;

      item.innerHTML = `
      <div class="row">
        <div class="col-9">
            <div class="d-flex flex-column align-items-start">
                <h5>${producto.nombre}</h5>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio Total: $${precioTotal}</p>
            </div>
        </div>
        <div class="col-3">
            <div class="d-flex align-item-center">
                <span class=" my-button bg-danger text-white" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </span>
            </div>
            
        </div>
      </div>
      
        
        
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
    
    const producto = carrito[index];

  if (producto.cantidad > 1) {
    // Si la cantidad es mayor que 1, decrementa la cantidad en 1
    producto.cantidad--;
  } else {
    // Si la cantidad es 1, elimina el producto del carrito
    carrito.splice(index, 1);
  }

  //Si estoy en carrito.html actualizo la tabla
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


// Actualizar el listado del carrito.html
  function actualizarCompraCarrito() {

    const listaCompra = document.getElementById('listaCompra');

    //Elementos del "ticket"
    const totalProductos = document.getElementById('totalProductos');
    const totalEnvio = document.getElementById('totalEnvio');
    const totalServicio = document.getElementById('totalServicio');
    const totalCompraSaldo = document.getElementById('totalCompraSaldo');

    //Defino variables de valor de envío y costo de servicio
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

        //Cuando haya al menos 1 elemento, primero muestro los encabezados de la tabla
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

    let precioTotal = 0;
    const arrayPrecioTotal = []
  
    // Agregar cada producto del carrito a la tabla
    carrito.map((producto, index) => {
        const item = document.createElement('tr');
        item.classList.add('item-carrito');

        precioTotal = producto.precio * producto.cantidad;
        arrayPrecioTotal.push(precioTotal);

        item.innerHTML = `
        <td class="img-item-carrito">
        <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
        </td>
        <td class="text-center item-descrip">${producto.nombre}</td>
        <td class="text-center item-descrip">$${producto.precio}</td>
        <td class="text-center item-descrip">${producto.cantidad}</td>
        <td class="text-center item-descrip">$${precioTotal}</td>
        <td class="text-center">
            <span class="float-end align-self-center my-button bg-danger text-white" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})">
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
    const totalProd = arrayPrecioTotal.reduce((total, precio) => total + precio, 0);
    totalProductos.innerText = `$${totalProd.toFixed(2)}`;

    //Mostramos el costo de envio
    totalEnvio.innerText = `$${envio.toFixed(2)}`;

    //Mostramos el costo de servicio
    totalServicio.innerText = `$${servicio.toFixed(2)}`;

    // Sumamos todas las variables para informar el total de la compra
    let totalComprado = totalProd + envio + servicio;
    totalCompraSaldo.innerText = `$${totalComprado.toFixed(2)}`;
  }

 

//Función para obtener los elementos del storage
  function obtenerCarritoStorage() {
    // Verificar si hay elementos en localStorage al inicio
    document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos guardados en localStorage
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    

    // Cargar los elementos en el carrito
    if(carrito.length === 0){
        carrito.push(...carritoStorage);
    }


    //Chequeo la ruta desde la cual estoy accediendo
    const rutaActual = document.location.pathname;
  
    //Si estoy en carrito.html activo el booleano y llamo a la función actualizarCompraCarrito
    if (rutaActual.includes('carrito.html')) {
        console.log('Estás en carrito.html');
        enCarrito = true;
        actualizarCompraCarrito();
      } 
     else { //Si no estoy en carrito.html (de momento la otra opcion es index.html), desactivo el booleano y llamo a mostrarProductos
        console.log('Estás en index.html');
        enCarrito = false;
        mostrarProductos(productos);
      }

      /**
       Tuve que implementar esta funcionalidad, ya que al estar conectando app.js desde dos archivos (index.html y carrito.html)
       me generaba problemas al llamar a elementos del DOM unicos desde cada documento.
       Por eso tuve que condicionar desde que ruta estoy accediendo al codigo, y asi llamar a sus funciones.
       El booleano lo implemente xq al eliminar un producto del modal, no se me eliminaba de la sección "tu carrito" ya que
       ya que la funcion eliminarDelCarrito no hacia el llamado a actualizarCompraCarrito, y no podia llamar a esa funcion desde index por el problema anterior
       por lo tanto con el booleano, cuando sea true puedo hacer el llamado a actualizarCompraCarrito desde eliminarDelCarrito
       * 
       */
      

    // Actualizar el contador del carrito
    actualizarContadorCarrito();


    });
}

obtenerCarritoStorage();
