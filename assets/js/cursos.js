import { getCursos } from './productController.js'; //Para llamar a la data del JSON que ya se recolectó


async function init() {
    const cursos = await getCursos(); // Esperamos la info
     console.log(cursos); //Imprime para debug
    if (!cursos) return; // Si no carga la info, no hace nada
    //let cursos = productos.filter(item => item.tipo === "Curso"); // Separamos los cursos de los recursos

    const contenedor = document.getElementById("contenedor-cursos"); // Referencia del contenedor para manipular HTML
    const inputBusqueda = document.getElementById('input-busqueda'); // Referencia del buscador para filtrar input del usuario
    const botonLupa = document.getElementById('boton-lupa'); // Referencia del botón buscar para cuando el usuario hace clic

    //Display de los contenidos sin filtrar
    contenedor.innerHTML = generarHTML(cursos);

    // Filtrado 
    document.querySelectorAll('.btn-check').forEach(input => { // Filtrado por mejor valorado o mayor/menor precio
        input.addEventListener('change', (e) => {
            switch(e.target.id){
                //case "option1": cursos.sort((a, b) => b.calificacion - a.calificacion); break; //Mejor valorados
                case "option2": cursos.sort((a, b) => a.costoCurso - b.costoCurso); break; //Mayor precio
                case "option3": cursos.sort((a, b) => b.costoCurso - a.costoCurso); break; //Menor precio
            }
            contenedor.innerHTML = generarHTML(cursos); //Llama a la función para desplegar contenido filtrado
        });
    });

    // Evento para cuando dan clic en buscar
    botonLupa.addEventListener('click', () => { 
        const texto = inputBusqueda.value.toLowerCase().trim();
        console.log(texto) //trim borra los espacios en blanco
        const filtrados = cursos.filter(curso => curso.nombreCurso.toLowerCase().includes(texto) || curso.modalidadCurso.toLowerCase().includes(texto)); //Filtra de acuerdo al input del usuario
        
        if (filtrados.length === 0) { //Desplegar mensaje en caso de que no haya ninguna respuesta compatible
            contenedor.innerHTML = `<div class="alert alert-light">Sin coincidencias para ${texto}</div>`; 
        } else {
            contenedor.innerHTML = generarHTML(filtrados); //Despliega las coincidencias encontradas
        }
    });
}

// Se asegura de que el js actúe DESPUES de haber cargado el HTML

document.addEventListener('DOMContentLoaded', init);



    function generarHTML(lista){ // Función para  generar y actualizar HTML según lo filtrado
    let contenido = ""; //Inicializamos variable 
    //Reescribe el HTML con el contenido reordenado
    lista.forEach( curso =>{ //for each para cada "tarjeta" o producto
      contenido += `
      
      <div class="col-12 col-sm-6 col-lg-4 p-3"> <!--Responsividad con Bootstrap-->
      <a href="./pages/detalleCurso.html?id=${curso.idCurso}"> <!--Para que al hacer clic en el curso correspondiente mande a detalles del curso-->
        <div class="card tarjeta-curso h-100" id=${curso.nombreCurso}>	<!--Cada tarjeta tiene el id del curso para css o si se necesita acceder con js	-->						
          <img src=${curso.urlImagenCurso} class="card-img-top imagen-curso" alt=${curso.nombreCurso}> <!-- Llama a la imagen correspondiente del curso-->
          <div class="card-body">
            <h5 class="card-title">${curso.nombreCurso}</h5> <!--Mostramos el nombre del curso-->
            <p class="card-text"> Modalidad ${curso.modalidadCurso}</p> <!--Despliega su modalidad (Intensivo o sabatino)-->
            <p class="card-text fw-bold">$${curso.costoCurso}</p> <!--Precio del curso-->
            <p class="card-text">${curso.descripcionCurso}</p>
            <i data-star="5"></i> 
        </div>
      </div>
      </a>
    </div>`;
        });
    return contenido; //devuelve todo el String de HTML relleno con los parámetros que van cambiando

}