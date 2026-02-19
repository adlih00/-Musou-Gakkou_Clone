
export async function getUsuario(id){
    const API_URL = `http://localhost:8080/api/v1/usuario/${id}`
        try {
        const response = await fetch(API_URL, { 
            headers: { 
                'Accept': 'application/json' 
            } 
        });
        if (!response.ok) throw new Error(`HTTP ${res.status}`);
        const usuario = await response.json();
        return usuario;
    } catch (err) {
        console.error(err);
        return [];
    }
}

    export async function agregarUsuario(usuario) {
        const API_URL = `http://localhost:8080/api/v1/nuevo-usuario`
        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });
            return await respuesta.json();
        } catch (error) {
            console.error("Error en el POST:", error);
        }
    }

export async function getUsuarios(){
    const API_URL = `http://localhost:8080/api/v1/usuarios`
        try {
        const response = await fetch(API_URL, { 
            headers: { 
                'Accept': 'application/json' 
            } 
        });
        if (!response.ok) throw new Error(`HTTP ${res.status}`);
        const usuario = await response.json();
        return usuario;
    } catch (err) {
        console.error(err);
        return [];
    }
}