import { getCursos } from './productController.js'; //Para llamar a la data del JSON que ya se recolectó

// Referencia al cuerpo de la tabla donde se mostrarán los productos
const tablaCursosCuerpo = document.getElementById("tablaCursosCuerpo");
// Instancia el controlador para acceder a los métodos de datos (LocalStorage)

const cursosController = new CursosController();

/**
 * Renderiza la lista de productos en la tabla HTML
 */
async function renderizarTabla() {
    // Verificación de seguridad: si el elemento no existe en el HTML, detiene la función
    if (!tablaCursosCuerpo) return;

    // Limpia el contenido actual de la tabla para evitar duplicados al refrescar
    tablaCursosCuerpo.innerHTML = "";

    // Obtiene el array de objetos desde el controlador
    //const lista = cursosController.obtenerTodos();
    const lista = await getCursos();
    console.log(lista);
    if (!lista) return;


    // Itera sobre cada producto para crear una fila (tr) dinámicamente
    lista.forEach((curso) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${curso.idCurso}</td>
            <td><img src="${curso.urlImagenCurso}" width="50" style="object-fit: cover; height: 50px; border-radius: 4px;"></td>
            <td>${curso.nombreCurso}</td>
            <td>$${curso.costoCurso}</td>
            <td>
                <button class="btn btn-outline-cargar btn-sm mr-1" onclick="prepararEdicion(${curso.idCurso})">
                    <i class="fa fa-pencil"></i> Editar
                </button>
                <button style="background-color: var(--clr-primary); color: white;" class="btn  btn-sm" onclick="borrarRegistro(${curso.idCurso})">
                    <i class="fa fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        tablaCursosCuerpo.appendChild(fila);
    });
}

/**
 * 2. Carga los datos de un producto específico en el formulario del Modal
 * Se usa 'window.' para que la función sea accesible desde el atributo 'onclick' del HTML
 */
window.prepararEdicion = (id) => {
    // Busca el objeto exacto en la lista mediante su ID
    const curso = cursosController.obtenerTodos().find(c => c.id === id);

    if (curso) {
        // Asigna los valores del objeto a los inputs del formulario modal
        document.getElementById('editId').value = curso.id;
        document.getElementById('editTitulo').value = curso.titulo;
        document.getElementById('editDescripcion').value = curso.descripcion;
        document.getElementById('editPrecio').value = curso.precio;
        document.getElementById('editImagen').value = curso.imagenUrl;

        // Inicializa y muestra el modal usando la librería de Bootstrap 5
        const modal = new bootstrap.Modal(document.getElementById('editarModal'));
        modal.show();
    }
};

/**
 * 3. Escucha el envío (submit) del formulario de edición dentro del modal
 */
const editForm = document.getElementById('editarCursoFormulario');
editForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Recupera el ID (oculto) y los nuevos datos ingresados
    const id = parseInt(document.getElementById('editId').value);
    const datos = {
        titulo: document.getElementById('editTitulo').value,
        descripcion: document.getElementById('editDescripcion').value,
        precio: parseFloat(document.getElementById('editPrecio').value),
        imagenUrl: document.getElementById('editImagen').value
    };

    // Intenta actualizar a través del controlador
    if (cursosController.actualizarCurso(id, datos)) {
        alert('Producto actualizado con éxito');

        // Cierra el modal programáticamente
        const modalElement = document.getElementById('editarModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

        // Refresca la tabla para mostrar los datos actualizados
        renderizarTabla();
    }
});

/**
 * Función global para eliminar un registro
 */
/**
 * Función global asíncrona para eliminar un registro
 */
window.borrarRegistro = async (id) => {
    // 1. Pedimos confirmación al usuario
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este curso de la base de datos?");
    
    if (confirmacion) {
        // Mostramos un mensaje opcional de "cargando" si lo deseas
        console.log(`Eliminando curso con ID: ${id}...`);

        // 2. Usamos 'await' para esperar a que el controlador termine la petición fetch
        const exito = await cursosController.eliminarCurso(id);
        
        if (exito) {
            alert("Curso eliminado correctamente.");
            
            // 3. Refrescamos la tabla inmediatamente para mostrar los cambios reales
            // Como renderizarTabla() es async, también es buena práctica ponerle await
            await renderizarTabla(); 
        } else {
            alert("Hubo un error al intentar eliminar el curso.");
        }
    }
};

/**
 * Evento: Actualiza la tabla automáticamente cuando el usuario hace clic 
 * en la pestaña "Gestionar Existentes"
 */
const pestañaGestion = document.getElementById('gestion-tab');
if (pestañaGestion) {
    pestañaGestion.addEventListener('shown.bs.tab', renderizarTabla);
}

/**
 * Lógica para el Formulario de Registro (Crear nuevo producto)
 */
//let API_URL = `http://localhost:8080/api/v1/nuevo-curso`;
const form = document.getElementById('nuevoCursoFormulario');
console.log(document.querySelector('input[name="tipoProducto"]:checked').value);
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (document.querySelector('input[name="tipoProducto"]:checked').value === "curso") {
        let API_URL = `http://localhost:8080/api/v1/nuevo-curso`;
        // Crea un objeto con la estructura requerida por el controlador
        const curso = {
            nombreCurso: document.getElementById('tituloCurso').value,
            //tipo: document.querySelector('input[name="tipoProducto"]:checked').value,
            descripcionCurso: document.getElementById('descripcionCurso').value,
            detalleCurso: document.getElementById('detalleCurso').value,
            costoCurso: parseFloat(document.getElementById('precioCurso').value),
            //horario: document.getElementById('horarioCurso').value,
            //calificacion: document.getElementById('calificacionCurso').value,
            inicioCurso: document.getElementById('fechaInicioCurso').value,
            finCurso: document.getElementById('fechaFinCurso').value,
            urlImagenCurso: document.getElementById('imagenCurso').value,
            modalidadCurso: "presencial"
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(curso)
            });

            if (!res.ok) {
                throw new Error(`Error en la petición: ${res.status}`);
            }

            const savedProduct = await res.json();
            console.log('Curso registrado:', savedProduct);

            alert('Curso registrado con éxito');

            /*  nameInput.value = '';
              imageUrlInput.value = '';
              priceInput.value = '';
              descriptionInput.value = '';*/

        } catch (err) {
            console.error(err);
            alert('Hubo un error al registrar el curso.');
        }

        // Guarda el curso y limpia el formulario
        cursosController.agregarCurso(curso);

        form.reset();
        //alert('Curso agregado con éxito');

        // Refresca la tabla por si el usuario está en la pestaña de gestión
        renderizarTabla();
    } else {
        let API_URL = `http://localhost:8080/api/v1/nuevo-recurso`;
        const recurso = {
            nombreRecurso: document.getElementById('tituloCurso').value,
            //tipo: document.querySelector('input[name="tipoProducto"]:checked').value,
            descripcionRecurso: document.getElementById('descripcionCurso').value,
            detalleRecurso: document.getElementById('detalleCurso').value,
            costoRecurso: parseFloat(document.getElementById('precioCurso').value),
            //horario: document.getElementById('horarioCurso').value,
            //calificacion: document.getElementById('calificacionCurso').value,
            //inicioCurso: document.getElementById('fechaInicioCurso').value,
            //finCurso: document.getElementById('fechaFinCurso').value,
            urlImagenRecurso: document.getElementById('imagenCurso').value,
            //modalidadCurso: "presencial"
        };
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recurso)
            });

            if (!res.ok) {
                throw new Error(`Error en la petición: ${res.status}`);
            }

            const savedProduct = await res.json();
            console.log('Recurso registrado:', savedProduct);

            alert('Recurso registrado con éxito');

            /*  nameInput.value = '';
              imageUrlInput.value = '';
              priceInput.value = '';
              descriptionInput.value = '';*/

        } catch (err) {
            console.error(err);
            alert('Hubo un error al registrar el recurso.');
        }
    }
});

/**
 * Exportar datos: Genera un archivo .json descargable
 */
document.getElementById('exportarCursos').addEventListener('click', () => {
    // Convierte los datos a una cadena URI compatible con descarga de archivos
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(cursosController.exportarCursos());
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "productos.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click(); // Simula el clic de descarga
    downloadAnchorNode.remove();
});

/**
 * Importar datos: Lee un archivo JSON seleccionado por el usuario
 */
document.getElementById('importarArchivo').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            // Parsea el contenido del archivo a un objeto JS
            const json = JSON.parse(e.target.result);
            cursosController.importarCursos(json);
            document.getElementById('mensaje').innerText = 'Cursos importados correctamente.';
            renderizarTabla(); // Actualiza la tabla con los nuevos datos cargados
        } catch (err) {
            document.getElementById('mensaje').innerText = 'Error: El archivo no tiene un formato JSON válido.';
        }
    };
    reader.readAsText(file);
});