// app.js - Navegación y carga de datos COTOLAR

let currentSection = 'inicio';

function cargarNoticias() {
    const container = document.getElementById('noticiasContainer');
    const noticias = window.DATOS_LOCALES.noticias;
    
    container.innerHTML = noticias.map(noticia => `
        <div class="bg-white border border-borderGray rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-start mb-3">
                <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded">${noticia.categoria || 'Noticia'}</span>
                ${noticia.destacada ? '<span class="bg-gold/10 text-gold text-xs px-2 py-1 rounded">⭐ Destacada</span>' : ''}
            </div>
            <h3 class="text-lg font-bold text-darkGray mb-2">${noticia.titulo}</h3>
            <p class="text-mediumGray text-sm mb-3">${new Date(noticia.fecha).toLocaleDateString('es-AR')}</p>
            <p class="text-darkGray/70">${noticia.contenido.substring(0, 120)}${noticia.contenido.length > 120 ? '...' : ''}</p>
            <button class="text-primary text-sm font-semibold mt-3 hover:underline" onclick="alert('Comunicate al 380 412-3456 para más información')">Leer más →</button>
        </div>
    `).join('');
}

function cargarAranceles() {
    const container = document.getElementById('arancelesContainer');
    const aranceles = window.DATOS_LOCALES.aranceles;
    
    container.innerHTML = aranceles.map(a => `
        <div class="bg-white border border-borderGray rounded-lg p-5 shadow-sm">
            <h3 class="text-lg font-bold text-darkGray">${a.titulo}</h3>
            <p class="text-primary text-2xl font-bold mt-2">$${a.monto.toLocaleString()}</p>
            <p class="text-mediumGray text-sm mt-2">${a.descripcion}</p>
        </div>
    `).join('');
}

function cargarRequisitos() {
    const container = document.getElementById('requisitosContainer');
    const requisitos = window.DATOS_LOCALES.requisitos.sort((a,b) => a.orden_prioridad - b.orden_prioridad);
    
    container.innerHTML = requisitos.map(r => `
        <div class="bg-white border border-borderGray rounded-lg p-5 shadow-sm flex items-start gap-4">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">${r.orden_prioridad}</div>
            <div>
                <h3 class="font-bold text-darkGray">${r.nombre}</h3>
                <p class="text-mediumGray text-sm">${r.descripcion_detallada}</p>
            </div>
        </div>
    `).join('');
}

function cargarCapacitaciones() {
    const container = document.getElementById('capacitacionesContainer');
    const cursos = window.DATOS_LOCALES.capacitaciones;
    
    container.innerHTML = cursos.map(c => `
        <div class="bg-white border border-borderGray rounded-lg p-5 shadow-sm hover:shadow-md transition">
            <h3 class="text-lg font-bold text-darkGray">${c.nombre_curso}</h3>
            <div class="flex gap-2 mt-2 flex-wrap">
                <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded">${c.modalidad}</span>
                <span class="text-mediumGray text-xs">📅 ${new Date(c.fecha_inicio).toLocaleDateString('es-AR')}</span>
                <span class="text-mediumGray text-xs">👥 ${c.vacantes} vacantes</span>
            </div>
            <p class="text-primary font-bold mt-3">$${c.arancel_curso.toLocaleString()}</p>
            <p class="text-mediumGray text-sm mt-2">👨‍🏫 ${c.instructor}</p>
            <p class="text-mediumGray text-xs mt-1">📍 ${c.lugar}</p>
        </div>
    `).join('');
}

function cambiarSeccion(seccion) {
    document.querySelectorAll('.seccion-publica').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(`seccion-${seccion}`).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('border-primary', 'text-darkGray');
        btn.classList.add('text-mediumGray');
        if(btn.getAttribute('data-section') === seccion) {
            btn.classList.add('border-primary', 'text-darkGray');
            btn.classList.remove('text-mediumGray');
        }
    });
    
    currentSection = seccion;
    if (window.playSound) window.playSound('click');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        cambiarSeccion(section);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.DATOS_LOCALES) {
        cargarNoticias();
        cargarAranceles();
        cargarRequisitos();
        cargarCapacitaciones();
    }
});