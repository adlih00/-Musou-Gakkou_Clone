class CarritoController {
  constructor() {
    const guardado = localStorage.getItem('carrito');
    this.carrito = guardado ? JSON.parse(guardado) : [];
  }

  agregarProducto(producto) {
    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
      });
    }
    this.guardar();
  }

  eliminarProducto(id) {
    this.carrito = this.carrito.filter(p => p.id !== id);
    this.guardar();
  }

  cambiarCantidad(id, cantidad) {
    const producto = this.carrito.find(p => p.id === id);
    if (producto && cantidad > 0) {
      producto.cantidad = cantidad;
      this.guardar();
    }
  }

  obtenerCarrito() {
    return this.carrito;
  }

  obtenerTotal() {
    return this.carrito.reduce((total, p) => total + p.precio * 1, 0);
  }

  vaciar() {
    this.carrito = [];
    this.guardar();
  }

  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  async finalizarCompra(usuarioId) {
    const datosGuardados = localStorage.getItem('miCarrito');
    const productos = JSON.parse(datosGuardados) || [];
    
    // Mapeamos los productos al formato de Java
    const nuevaOrden = {
        totalOrden: productos.reduce((acc, p) => acc + p.precio, 0),
        fechaOrden: new Date().toISOString(),
        usuario: { idUsuario: parseInt(usuarioId) }, // Objeto usuario para la relación @ManyToOne
        // Si tienes una relación @ManyToMany para los cursos:
        ordenesTieneCursos: productos.map(p => ({ idCurso: p.idCurso || p.id })) 
    };
    console.log("Enviando esta orden:", nuevaOrden);
    try {
        const response = await fetch("http://localhost:8080/api/v1/nueva-orden", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaOrden)
        });
        return response.ok;
    } catch (error) {
        console.error("Error enviando la orden:", error);
        return false;
    }
}

}