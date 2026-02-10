
class CursosController {
    constructor() {
        const almacenado = localStorage.getItem('cursos');
        this.cursos = almacenado ? JSON.parse(almacenado) : [];
    }

    // NUEVO MÉTODO para quitar curso
    eliminarCurso(id) {
        this.cursos = this.cursos.filter(curso => curso.id !== id);
        this.guardar();
    }

    agregarCurso({titulo, tipo, descripcion, detalle, precio, horario, calificacion, fechaInicio, imagenUrl}) {
        const id = Date.now();
        const curso = {id, titulo, tipo, descripcion, detalle, precio, horario, calificacion, fechaInicio, imagenUrl};
        this.cursos.push(curso);
        this.guardar();
    }

    guardar() {
        localStorage.setItem('cursos', JSON.stringify(this.cursos));
    }

    obtenerTodos() {
        return this.cursos;
    }

    importarCursos(arregloJson) {
        this.cursos = arregloJson;
        this.guardar();
    }

    exportarCursos() {
        return JSON.stringify(this.cursos, null, 2);
    }
}

