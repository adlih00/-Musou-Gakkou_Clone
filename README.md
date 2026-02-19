<h1>Proyecto E-Commerce</h1>

<p>
Este repositorio contiene el código fuente para una plataforma de comercio electrónico.
La aplicación es una solución <strong>Full Stack</strong> que utiliza <strong>React</strong> para el frontend
y <strong>SQL</strong> para la base de datos.
</p>

<hr>

<h2>Estructura del Repositorio</h2>

<pre>
mi-ecommerce-repo/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── database/
│   ├── script_creacion.sql
│   ├── seeds.sql
│   └── diagrama_er.png
│
├── docs/
│   ├── wireframes/
│   └── requerimientos.md
│
├── .gitignore
└── README.md
</pre>

<h2>Flujo de trabajo</h2>

<p>Antes de comenzar cualquier desarrollo, ejecuta:</p>

<pre>
git checkout develop
git pull origin develop
git checkout -b rama-tu-nombre
</pre>

<ol>
    <li>Trabaja únicamente en tu rama.</li>
    <li>Ejecuta pruebas unitarias.</li>
    <li>Realiza commits pequeños y semánticos (convención Angular).</li>
</ol>

<h3>Ejemplo</h3>

<pre>
git status
git checkout rama-tu-nombre
git add .
git commit -m "feat: implementación de login con JWT"
git push origin rama-tu-nombre
</pre>

<p><strong>Nota:</strong> No hacer push directo a <strong>develop</strong> ni <strong>main</strong>.</p>

<h2>Definición de ramas</h2>

<pre>
main          → producción
develop       → integración
rama-tu-nombre → desarrollo individual
documentacion → documentación
feature/*     → nuevas funcionalidades
hotfix/*      → correcciones urgentes
</pre>

<h2>Pull Requests</h2>

<pre>
Nombre:
Fecha:

Descripción:
#issue:

Cambios realizados:

Checklist:
- [ ] tarea 1
- [ ] tarea 2

Comentarios:
</pre>

<h2>Issues</h2>

<pre>
Nombre:
Descripcion:
Titulo: [FEAT]
Etiquetas:
Asignaciones:

Tareas:
- [ ] Crear rama
- [ ] Implementar funcionalidad
- [ ] Pruebas
- [ ] Documentar

Criterios de aceptación:
- Funcionalidad completa y validada

Notas:
</pre>
