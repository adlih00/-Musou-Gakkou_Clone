const tablaCursosCuerpo = document.getElementById("tablaCursosCuerpo");

function renderizarTabla() {
    // Si no tienes el elemento en el HTML aún, asegúrate de agregarlo como vimos antes
    if(!tablaCursosCuerpo) return; 
    cursosController = new CursosController();
    tablaCursosCuerpo.innerHTML = "";
    const lista = cursosController.obtenerTodos();

    lista.forEach((curso) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${curso.id}</td>
            <td><img src="${curso.imagenUrl}" width="50" style="object-fit: cover; height: 50px; border-radius: 4px;"></td>
            <td>${curso.titulo}</td>
            <td>$${curso.precio}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="borrarRegistro(${curso.id})">
                    <i class="fa fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        tablaCursosCuerpo.appendChild(fila);
    });
}

// Función global para el botón de eliminar
window.borrarRegistro = (id) => {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
        cursosController.eliminarCurso(id);
        renderizarTabla(); // Refrescar vista
    }
};

// Escuchar el cambio de pestaña para actualizar la tabla automáticamente
const pestañaGestion = document.getElementById('gestion-tab');
if(pestañaGestion) {
    pestañaGestion.addEventListener('shown.bs.tab', renderizarTabla);
}

// --- Tu lógica existente del Formulario ---
const form = document.getElementById('nuevoCursoFormulario');
form.addEventListener('submit', (e) => {
    e.preventDefault();
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
    cursosController.agregarCurso(curso);
    form.reset();
    alert('Curso agregado');
    // Si estamos viendo la tabla, la actualizamos
    renderizarTabla();
});

// Exportar cursos
document.getElementById('exportarCursos').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(cursosController.exportarCursos());
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "productos.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});

// Importar cursos desde archivo JSON
document.getElementById('importarArchivo').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      cursosController.importarCursos(json);
      document.getElementById('mensaje').innerText = 'Cursos importados correctamente.';
    } catch(err) {
      document.getElementById('mensaje').innerText = 'Error al importar JSON';
    }
  };
  reader.readAsText(file);
});