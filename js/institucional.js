// institucional.js - Datos de autoridades para página institucional

// Consejo Directivo (orden jerárquico)
window.CONSEJO_DIRECTIVO = [
    { id: 1, nombre: "Lic. María José Fernández", cargo: "Presidente", orden: 1 },
    { id: 2, nombre: "Dr. Carlos Alberto Méndez", cargo: "Vicepresidente", orden: 2 },
    { id: 3, nombre: "Lic. Laura Beatriz González", cargo: "Secretaria General", orden: 3 },
    { id: 4, nombre: "Lic. Roberto Carlos Díaz", cargo: "Tesorero", orden: 4 },
    { id: 5, nombre: "Lic. Ana Silvia Romero", cargo: "Vocal Titular", orden: 5 },
    { id: 6, nombre: "Dr. Pablo Ezequiel Sosa", cargo: "Vocal Suplente", orden: 6 },
    { id: 7, nombre: "Lic. Verónica del Carmen Luna", cargo: "Revisora de Cuentas", orden: 7 }
];

// Tribunal de Disciplina
window.TRIBUNAL_DISCIPLINA = [
    { id: 1, nombre: "Lic. Ramón Eduardo Páez", cargo: "Presidente del Tribunal", orden: 1 },
    { id: 2, nombre: "Lic. Silvia Mabel Tapia", cargo: "Vocal Titular", orden: 2 },
    { id: 3, nombre: "Dr. Miguel Ángel Herrera", cargo: "Vocal Suplente", orden: 3 }
];

// Cargar consejo directivo
function cargarConsejoDirectivo() {
    const container = document.getElementById('consejoDirectivoContainer');
    if (!container) return;
    
    const consejo = window.CONSEJO_DIRECTIVO || [];
    consejo.sort((a, b) => a.orden - b.orden);
    
    container.innerHTML = consejo.map(m => `
        <div class="bg-azulClaro rounded-lg p-4 border border-azulBorde">
            <p class="font-bold text-azulMarino">${m.cargo}</p>
            <p class="text-azulSec">${m.nombre}</p>
        </div>
    `).join('');
}

// Cargar tribunal de disciplina
function cargarTribunal() {
    const container = document.getElementById('tribunalContainer');
    if (!container) return;
    
    const tribunal = window.TRIBUNAL_DISCIPLINA || [];
    tribunal.sort((a, b) => a.orden - b.orden);
    
    container.innerHTML = tribunal.map(m => `
        <div class="bg-azulClaro rounded-lg p-4 border border-azulBorde">
            <p class="font-bold text-azulMarino">${m.cargo}</p>
            <p class="text-azulSec">${m.nombre}</p>
        </div>
    `).join('');
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarConsejoDirectivo();
    cargarTribunal();
});