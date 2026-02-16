// Referencia al cuerpo de la tabla donde se mostrarán los productos
const tablaCursosCuerpo = document.getElementById("tablaCursosCuerpo");
const cursosController = new CursosController(); 

/**
 * Renderiza la lista de productos en la tabla HTML
 */
function renderizarTabla() {
    // Verificación de seguridad: si el elemento no existe en el HTML, detiene la función
    if(!tablaCursosCuerpo) return; 

    // Instancia el controlador para acceder a los métodos de datos (LocalStorage)
    //cursosController = new CursosController();
    
    // Limpia el contenido actual de la tabla para evitar duplicados al refrescar
    tablaCursosCuerpo.innerHTML = "";
    
    // Obtiene el array de objetos desde el controlador
    const lista = cursosController.obtenerTodos();

    // Itera sobre cada producto para crear una fila (tr) dinámicamente
    lista.forEach((curso) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${curso.id}</td>
            <td><img src="${curso.imagenUrl}" width="50" style="object-fit: cover; height: 50px; border-radius: 4px;"></td>
            <td>${curso.titulo}</td>
            <td>$${curso.precio}</td>
            <td>
                <button class="btn btn-warning btn-sm mr-1" onclick="prepararEdicion(${curso.id})">
                    <i class="fa fa-pencil"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="borrarRegistro(${curso.id})">
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
window.borrarRegistro = (id) => {
    // Pide confirmación al usuario antes de borrar
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
        cursosController.eliminarCurso(id);
        renderizarTabla(); // Actualiza la vista inmediatamente
    }
};

/**
 * Evento: Actualiza la tabla automáticamente cuando el usuario hace clic 
 * en la pestaña "Gestionar Existentes"
 */
const pestañaGestion = document.getElementById('gestion-tab');
if(pestañaGestion) {
    pestañaGestion.addEventListener('shown.bs.tab', renderizarTabla);
}

/**
 * Lógica para el Formulario de Registro (Crear nuevo producto)
 */
const form = document.getElementById('nuevoCursoFormulario');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Crea un objeto con la estructura requerida por el controlador
    const curso = {
        titulo: document.getElementById('tituloCurso').value,
        tipo: document.querySelector('input[name="tipoProducto"]:checked').value,
        descripcion: document.getElementById('descripcionCurso').value,
        detalle: document.getElementById('detalleCurso').value,
        precio: parseFloat(document.getElementById('precioCurso').value),
        horario: document.getElementById('horarioCurso').value,
        calificacion: document.getElementById('calificacionCurso').value,
        fechaInicio: document.getElementById('fechaInicioCurso').value,
        imagenUrl: document.getElementById('imagenCurso').value
    };
    
    // Guarda el curso y limpia el formulario
    cursosController.agregarCurso(curso);
    form.reset();
    alert('Curso agregado con éxito');
    
    // Refresca la tabla por si el usuario está en la pestaña de gestión
    renderizarTabla();
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
        } catch(err) {
            document.getElementById('mensaje').innerText = 'Error: El archivo no tiene un formato JSON válido.';
        }
    };
    reader.readAsText(file);
});