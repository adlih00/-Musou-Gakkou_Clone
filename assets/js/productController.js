//Archivo para llamar el JSON o la Database y de ahí exportarlo a los demás

// dataController.js
let cache = null;
export async function getCursos() {
    // If we already have the data, return it immediately
    //if (cache) return cache;
    const API_URL = `http://localhost:8080/api/v1/cursos`
    /*try {
        const response = await fetch("./assets/json/cursos.json"); //Ruta al JSON
        if (!response.ok) throw new Error('Network response was not ok');
        
        cache = await response.json();
        return cache;
    } catch (error) {
        console.error("Failed to load courses:", error);
        return [];
    }
*/
        try {
        const response = await fetch(API_URL, { 
            headers: { 
                'Accept': 'application/json' 
            } 
        });
        if (!response.ok) throw new Error(`HTTP ${res.status}`);
        const products = await response.json();
        return products;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getRecursos() {
    // If we already have the data, return it immediately
    //if (cache) return cache;
    const API_URL = `http://localhost:8080/api/v1/recursos`
    /*try {
        const response = await fetch("./assets/json/cursos.json"); //Ruta al JSON
        if (!response.ok) throw new Error('Network response was not ok');
        
        cache = await response.json();
        return cache;
    } catch (error) {
        console.error("Failed to load courses:", error);
        return [];
    }
*/
        try {
        const response = await fetch(API_URL, { 
            headers: { 
                'Accept': 'application/json' 
            } 
        });
        if (!response.ok) throw new Error(`HTTP ${res.status}`);
        const products = await response.json();
        return products;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getRecurso(idRecurso) {
    // If we already have the data, return it immediately
    //if (cache) return cache;
    const API_URL = `http://localhost:8080/api/v1/recursos/${idRecurso}`
    /*try {
        const response = await fetch("./assets/json/cursos.json"); //Ruta al JSON
        if (!response.ok) throw new Error('Network response was not ok');
        
        cache = await response.json();
        return cache;
    } catch (error) {
        console.error("Failed to load courses:", error);
        return [];
    }
*/
        try {
        const response = await fetch(API_URL, { 
            headers: { 
                'Accept': 'application/json' 
            } 
        });
        if (!response.ok) throw new Error(`HTTP ${res.status}`);
        const products = await response.json();
        return products;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getCurso(idCurso) {
    // If we already have the data, return it immediately
    //if (cache) return cache;
    const API_URL = `http://localhost:8080/api/v1/cursos/${idCurso}`
    /*try {
        const response = await fetch("./assets/json/cursos.json"); //Ruta al JSON
        if (!response.ok) throw new Error('Network response was not ok');
        
        cache = await response.json();
        return cache;
    } catch (error) {
        console.error("Failed to load courses:", error);
        return [];
    }
*/
        try {
        const response = await fetch(API_URL, { 
            headers: { 
                'Accept': 'application/json' 
            } 
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const products = await response.json();
        return products;
    } catch (err) {
        console.error(err);
        return [];
    }
}


async function getCarrito(){
      // If we already have the data, return it immediately
    //if (cache) return cache;

    try {
        const response = await fetch("./assets/json/carrito.json"); //Ruta al JSON
        if (!response.ok) throw new Error('Network response was not ok');
        
        cache = await response.json();
        return cache;
    } catch (error) {
        console.error("Failed to load courses:", error);
        return [];
    }  
}

export {getCarrito};