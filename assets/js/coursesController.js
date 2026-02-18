/**
 * Clase CursosController
 * Gestiona la lógica de persistencia y manipulación de los productos (cursos/recursos).
 */
class CursosController {
    constructor() {
        // Al instanciar la clase, intentamos recuperar los datos del localStorage

        //const almacenado = localStorage.getItem('cursos');

        // Si hay datos, los convertimos de JSON (texto) a un Array de objetos JS. 
        // Si no hay nada, inicializamos un array vacío.
        //this.cursos = almacenado ? JSON.parse(almacenado) : [];
        this.apiUrl = "http://localhost:8080/api/v1";
    }


    //// GET: Obtener todos desde el Back
    async obtenerTodos() {
        try {
            const respuesta = await fetch(`${this.apiUrl}/cursos`);
            if (!respuesta.ok) throw new Error("Error al obtener datos");
            return await respuesta.json();
        } catch (error) {
            console.error("Error en el GET:", error);
            return [];
        }
    }
    // POST: Guardar en la BD del Back
    async agregarCurso(curso) {
        try {
            const respuesta = await fetch(`${this.apiUrl}/cursos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(curso)
            });
            return await respuesta.json();
        } catch (error) {
            console.error("Error en el POST:", error);
        }
    }
//Conecta con @DeleteMapping("/borrar-curso/{idCurso}") en Java
    async eliminarCurso(id) {
        try {
            // Realizamos la petición al servidor
            const respuesta = await fetch(`${this.apiUrl}/borrar-curso/${id}`, {
                method: 'DELETE'
            });
            // Si el status es 204 (No Content), fue un éxito total.
            // No intentes hacer await respuesta.json() porque lanzará error.
            if (respuesta.status === 204 || respuesta.ok) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("Error en el DELETE:", error);
            return false;
        }
    }

    //Conecta con @DeleteMapping("/borrar-recurso/{idRecurso}") en Java
    async eliminarRecurso(id) {
        try {
            // Realizamos la petición al servidor
            const respuesta = await fetch(`${this.apiUrl}/borrar-recurso/${id}`, {
                method: 'DELETE'
            });
            // Si el status es 204 (No Content), fue un éxito total.
            // No intentes hacer await respuesta.json() porque lanzará error.
            if (respuesta.status === 204 || respuesta.ok) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("Error en el DELETE:", error);
            return false;
        }
    }

    /**
     * Crea un nuevo curso y lo añade a la lista.
     * Usa desestructuración de objetos para recibir los parámetros.
     */
    /*agregarCurso({ titulo, tipo, descripcion, detalle, precio, horario, calificacion, fechaInicio, imagenUrl }) {
        // Generamos un ID único basado en el timestamp actual (milisegundos)
        const id = Date.now();

        // Creamos el nuevo objeto de curso
        const curso = { id, titulo, tipo, descripcion, detalle, precio, horario, calificacion, fechaInicio, imagenUrl };

        // Lo añadimos al array de la clase
        this.cursos.push(curso);

        // Guardamos los cambios en localStorage
        this.guardar();*/
    }

    /**
     * Convierte el array de objetos a una cadena JSON y lo guarda en el navegador.
     *//*
    guardar() {
        localStorage.setItem('cursos', JSON.stringify(this.cursos));
    }

    /**
     * Devuelve la lista completa de cursos actualmente cargados.
     * @returns {Array} Lista de objetos de cursos.
     *//*
    obtenerTodos() {
        return this.cursos;
    }

    /**
     * Reemplaza toda la base de datos actual con un nuevo arreglo de datos.
     * Útil para la función de "Cargar JSON".
     * @param {Array} arregloJson - El nuevo arreglo de datos a importar.
     *//*
    importarCursos(arregloJson) {
        this.cursos = arregloJson;
        this.guardar();
    }

    /**
     * Convierte la lista de cursos a un formato de texto legible para exportar a archivo.
     * @returns {string} JSON formateado con sangría de 2 espacios.
     *//*
    exportarCursos() {
        return JSON.stringify(this.cursos, null, 2);
    }

    /**
     * Busca un curso por ID y actualiza solo las propiedades modificadas.
     * @param {number} id - ID del curso a editar.
     * @param {Object} datosActualizados - Objeto con los nuevos valores.
     * @returns {boolean} True si se actualizó, False si no se encontró el ID.
     *//*
    actualizarCurso(id, datosActualizados) {
        // Buscamos la posición del curso en el array
        const index = this.cursos.findIndex(curso => curso.id === id);

        if (index !== -1) {
            // Utilizamos el "Spread Operator" (...) para mantener el ID original 
            // y mezclar los datos antiguos con los nuevos datos recibidos.
            this.cursos[index] = { ...this.cursos[index], ...datosActualizados };

            // Persistimos los cambios
            this.guardar();
            return true;
        }
        return false;
    }
}
*/
}