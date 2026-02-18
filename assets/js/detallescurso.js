import { getCursos } from './productController.js'; //Para llamar a la data del JSON que ya se recolectó
import { getCarrito } from './productController.js';
import { getCurso } from './productController.js';
import { getRecursos } from './productController.js';
import { getRecurso } from './productController.js';

const path = window.location.pathname;
if (path.includes("Recurso")){
  document.addEventListener('DOMContentLoaded', initRecursos)
  console.log("initRecurso")
}
else{
  document.addEventListener('DOMContentLoaded', init); //Esperamos a que el DOM cargue antes de intetar manipularlo
  console.log("initCurso")
}

async function init() {
    const productos = await getCursos(); // Esperamos la info
    // console.log(productos); //Imprime para debug
    if (!productos) return; // Si no carga la info, no hace nada
    const queryParams = new URLSearchParams(window.location.search); // Recupera la URL
    const cursoId = queryParams.get('id'); //Separa el ID del curso de la URL
    console.log(cursoId);

    // Buscamos el curso específico dentro de los productos
    //const cursoSeleccionado = productos.find(curso => curso.id == cursoId);

    const cursoSeleccionado = await getCurso(cursoId);
    if (!cursoSeleccionado) return;
    console.log(cursoSeleccionado);
    //Se obtiene la referencia de los contenedores HTML
    const contenedorTitulo = document.getElementById("contenedor-titulo")
    const contenedorImagenSeleccionada = document.getElementById("contenedor-imagen-curso")
    const contenedorPrecio = document.getElementById("contenedor-precio")
    const contenedorInfoAdicional = document.getElementById("contenedor-info-adicional");
    const contenedoresExtra =[document.getElementById("contenedor-tarjeta1"),document.getElementById("contenedor-tarjeta2"),document.getElementById("contenedor-tarjeta3"),document.getElementById("contenedor-tarjeta4")]
    /*const contenedorExtra1 = document.getElementById("contenedor-tarjeta1")
    const contenedorExtra2 = document.getElementById("contenedor-tarjeta2")
    const contenedorExtra3 = document.getElementById("contenedor-tarjeta3")
    const contenedorExtra4 = document.getElementById("contenedor-tarjeta4")*/

    //Filtramos para las tarjetas de abajo
    const otrosProductos = productos.filter(producto => producto.id != cursoId)
    const max = otrosProductos.length;
    const min = 0;
    const productosNoRepetidos = new Set();
    while (productosNoRepetidos.size < 4 && productosNoRepetidos.size < max){ //Seleccionamos elementos random y validamos que no se repitan
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            productosNoRepetidos.add(otrosProductos[randomNumber]);
            productosNoRepetidos.forEach(elemento =>{
                if (elemento == undefined){
                    productosNoRepetidos.delete(elemento)
                }
            }

            )
    }
    //const productosNoRepetidosArray = [...productosNoRepetidos]
    console.log(productosNoRepetidos)

    //Se coloca la información del producto seleccionado en los contenedores
    contenedorTitulo.innerHTML = cursoSeleccionado.nombreCurso;
    contenedorImagenSeleccionada.src = cursoSeleccionado.urlImagenCurso;
    contenedorPrecio.innerHTML = `$${cursoSeleccionado.costoCurso} MXN`
    contenedorInfoAdicional.innerHTML = cursoSeleccionado.detalleCurso;
    let i = 0;
    for (const elemento of productosNoRepetidos){
        contenedoresExtra[i].innerHTML =
        `
        <a href="./pages/detalleCurso.html?id=${elemento.idCurso}">
            <div class="card tarjeta-curso h-100">
                <img src="${elemento.urlImagenCurso}" class="card-img-top imagen-curso-extra" alt="${elemento.nombreCurso}">
                <div class="card-body d-none d-lg-block">
                    <h5 class="card-title">${elemento.nombreCurso} ${elemento.modalidadCurso}</h5>
                    <p class="card-text fw-bold">$${elemento.costoCurso}</p>
                </div>
            </div>
        </a>`
            i++
    }
}
document.addEventListener('DOMContentLoaded', init); //Esperamos a que el DOM cargue antes de intetar manipularlo

// Funciones para desplegar mensaje al añadir al carrito
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible justify-content-center" role="alert" style="margin-top:15px">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="margin:0px; padding-top:0px; padding-bottom:0px; height:100%; width:auto"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    const queryParams = new URLSearchParams(window.location.search); // Recupera la URL
    const id = queryParams.get('id'); //Separa el ID del curso de la URL
    //console.log(id);
    //appendAlert('Producto añadido al carrito', 'secondary')
    const storedCarrito = localStorage.getItem('miCarrito');
    let carrito = storedCarrito ? JSON.parse(storedCarrito) : [];
    
    /* let existe = false;
  for(let i = 0; i<carrito.length;i++){
    if (carrito[i].id == id)
      existe = true;
  }
  if (!existe){
      appendAlert('Producto añadido al carrito', 'secondary');
      agregarCarrito(id,carrito)
  }
  else{
      appendAlert('Ya existe en el carrito', 'danger');
  } */
    let existe = carrito.some(item => item && item.idCurso == id);

    if (!existe) {
        appendAlert('Producto añadido al carrito', 'secondary');
        agregarCarrito(id, carrito);
        //console.log(carrito);
    } else {
        appendAlert('Este curso ya está en tu carrito', 'warning');
    }

    //agregarCarrito(id,carrito)
  })
}

/* async function agregarCarrito(id,carrito){
  //const alertTrigger = document.getElementById('liveAlertBtn')
  const productos = await getProducts();
  
  //console.log("Carrito: "+ storedCarrito)
  const cursoSeleccionado = productos.find(curso => curso.id == id);
  carrito.push(cursoSeleccionado);
  //let carrito = await getCarrito(); // Esperamos la info
  
  //let carrito = {};
  //let jsonObject = JSON.parse(carrito);
  //let productoJSON = JSON.stringify(cursoSeleccionado);
  //Object.assign(carrito,cursoSeleccionado);
  localStorage.setItem('miCarrito', JSON.stringify(carrito));

} */
async function agregarCarrito(id, carrito) {
  // Obtenemos los productos desde el Back (usando tu productController.js)
  const productos = await getCursos(); 
  // IMPORTANTE: Cambiamos 'curso.id' por 'curso.idCurso' 
  const cursoSeleccionado = productos.find(curso => curso.idCurso == id);
  
 /*  if (!productos || productos.length === 0) {
    console.error("No se pudieron cargar los productos");
    return;
  }
 */
  if (cursoSeleccionado) {
    // Revisamos si ya existe un objeto en el carrito con el mismo ID Y la misma MODALIDAD
    const yaExiste = carrito.some(item => 
      item.idCurso === cursoSeleccionado.idCurso && 
      item.modalidadCurso === cursoSeleccionado.modalidadCurso
    );
    if (yaExiste) {
      alert("Este curso (en esta modalidad) ya está en tu carrito.");
      return; // Detenemos la ejecución para que no se agregue
    }
    // si no existe
    // Creamos un objeto estandarizado antes de meterlo al carrito
      const productoParaCarrito = {
          idCurso: cursoSeleccionado.idCurso,
          titulo: cursoSeleccionado.nombreCurso,
          precio: cursoSeleccionado.costoCurso,
          imagenUrl: cursoSeleccionado.urlImagenCurso,
          modalidad: cursoSeleccionado.modalidadCurso,
          tipo: "Curso"
      };
      carrito.push(productoParaCarrito);
      // Guardamos en el localStorage usando el nombre que usa tu carrito.js ('miCarrito')
      localStorage.setItem('miCarrito', JSON.stringify(carrito));
      console.log("Producto agregado con éxito");
      console.log(productoParaCarrito);
      // Feedback visual
      //alert(`Agregado: ${productoParaCarrito.titulo}`);
  } else {
      console.error("No se encontró el curso con ID:", id);
      alert("Hubo un error al intentar agregar el curso.");
  }
}

async function initRecursos() {
    const productos = await getRecursos(); // Esperamos la info
    console.log(productos); //Imprime para debug
    if (!productos) return; // Si no carga la info, no hace nada
    const queryParams = new URLSearchParams(window.location.search); // Recupera la URL
    const recursoId = queryParams.get('id'); //Separa el ID del curso de la URL
    console.log(recursoId);

    // Buscamos el curso específico dentro de los productos
    //const cursoSeleccionado = productos.find(curso => curso.id == cursoId);

    const recursoSeleccionado = await getRecurso(recursoId);
    if (!recursoSeleccionado) return;
    console.log(recursoSeleccionado);
    //Se obtiene la referencia de los contenedores HTML
    const contenedorTitulo = document.getElementById("contenedor-titulo")
    const contenedorImagenSeleccionada = document.getElementById("contenedor-imagen-curso")
    const contenedorPrecio = document.getElementById("contenedor-precio")
    const contenedorInfoAdicional = document.getElementById("contenedor-info-adicional");
    const contenedoresExtra =[document.getElementById("contenedor-tarjeta1"),document.getElementById("contenedor-tarjeta2"),document.getElementById("contenedor-tarjeta3"),document.getElementById("contenedor-tarjeta4")]
    /*const contenedorExtra1 = document.getElementById("contenedor-tarjeta1")
    const contenedorExtra2 = document.getElementById("contenedor-tarjeta2")
    const contenedorExtra3 = document.getElementById("contenedor-tarjeta3")
    const contenedorExtra4 = document.getElementById("contenedor-tarjeta4")*/

    //Filtramos para las tarjetas de abajo
    const otrosProductos = productos.filter(producto => producto.id != recursoId)
    const max = otrosProductos.length;
    const min = 0;
    const productosNoRepetidos = new Set();
    while (productosNoRepetidos.size < 4 && productosNoRepetidos.size < max){ //Seleccionamos elementos random y validamos que no se repitan
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            productosNoRepetidos.add(otrosProductos[randomNumber]);
            productosNoRepetidos.forEach(elemento =>{
                if (elemento == undefined){
                    productosNoRepetidos.delete(elemento)
                }
            }

            )
    }
    //const productosNoRepetidosArray = [...productosNoRepetidos]
    console.log(productosNoRepetidos)

    //Se coloca la información del producto seleccionado en los contenedores
    contenedorTitulo.innerHTML = recursoSeleccionado.nombreRecurso;
    contenedorImagenSeleccionada.src = recursoSeleccionado.urlImagenRecurso;
    contenedorPrecio.innerHTML = `$${recursoSeleccionado.costoRecurso} MXN`
    contenedorInfoAdicional.innerHTML = recursoSeleccionado.detalleRecurso;
    let i = 0;
    for (const elemento of productosNoRepetidos){
        contenedoresExtra[i].innerHTML =
        `
        <a href="./pages/detalleRecurso.html?id=${elemento.idRecurso}">
            <div class="card tarjeta-curso h-100">
                <img src="${elemento.urlImagenRecurso}" class="card-img-top imagen-curso-extra" alt="${elemento.nombreRecurso}">
                <div class="card-body d-none d-lg-block">
                    <h5 class="card-title">${elemento.nombreRecurso}</h5>
                    <p class="card-text fw-bold">$${elemento.costoRecurso}</p>
                </div>
            </div>
        </a>`
            i++
    }
}