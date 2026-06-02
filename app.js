// app.js - Navegación y carga de datos

let currentSection = 'inicio';

function cargarNoticias() {
    const container = document.getElementById('noticiasContainer');
    const noticias = window.DATOS_LOCALES.noticias;
    
    container.innerHTML = noticias.map(noticia => `
        <div class="bg-white rounded-2xl p-5 border border-arena shadow-md hover:shadow-lg transition-all duration-300">
            <div class="flex justify-between items-start mb-3">
                <span class="bg-terracota/10 text-terracota text-xs px-2 py-1 rounded-full">${noticia.categoria || 'Noticia'}</span>
                ${noticia.destacada ? '<span class="bg-mostaza/10 text-mostaza text-xs px-2 py-1 rounded-full">⭐ Destacada</span>' : ''}
            </div>
            <h3 class="text-lg font-bold text-marron mb-2">${noticia.titulo}</h3>
            <p class="text-marronClaro text-sm mb-3">📅 ${new Date(noticia.fecha).toLocaleDateString('es-AR')}</p>
            <p class="text-marron/70">${noticia.contenido.substring(0, 120)}${noticia.contenido.length > 120 ? '...' : ''}</p>
            <button class="text-terracota text-sm font-semibold mt-3 hover:underline" onclick="alert('Comunicate al correo info@cotolar.org')">Leer más →</button>
        </div>
    `).join('');
}

function cargarAranceles() {
    const container = document.getElementById('arancelesContainer');
    const aranceles = window.DATOS_LOCALES.aranceles;
    
    container.innerHTML = aranceles.map(a => `
        <div class="bg-white rounded-2xl p-5 border border-arena shadow-md">
            <h3 class="text-lg font-bold text-marron">${a.titulo}</h3>
            <p class="text-terracota text-2xl font-bold mt-2">$${a.monto.toLocaleString()}</p>
            <p class="text-marronClaro text-sm mt-2">${a.descripcion}</p>
        </div>
    `).join('');
}

function cargarRequisitos() {
    const container = document.getElementById('requisitosContainer');
    const requisitos = window.DATOS_LOCALES.requisitos.sort((a,b) => a.orden_prioridad - b.orden_prioridad);
    
    container.innerHTML = requisitos.map(r => `
        <div class="bg-white rounded-2xl p-5 border border-arena shadow-md flex items-start gap-4">
            <div class="w-8 h-8 bg-terracota rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">${r.orden_prioridad}</div>
            <div>
                <h3 class="font-bold text-marron">${r.nombre}</h3>
                <p class="text-marronClaro text-sm">${r.descripcion_detallada}</p>
            </div>
        </div>
    `).join('');
}

function cargarCapacitaciones() {
    const container = document.getElementById('capacitacionesContainer');
    const cursos = window.DATOS_LOCALES.capacitaciones;
    
    container.innerHTML = cursos.map(c => `
        <div class="bg-white rounded-2xl p-5 border border-arena shadow-md hover:shadow-lg transition-all duration-300">
            <h3 class="text-lg font-bold text-marron">${c.nombre_curso}</h3>
            <div class="flex gap-2 mt-2 flex-wrap">
                <span class="bg-terracota/10 text-terracota text-xs px-2 py-1 rounded-full">${c.modalidad}</span>
                <span class="text-marronClaro text-xs">📅 ${new Date(c.fecha_inicio).toLocaleDateString('es-AR')}</span>
                <span class="text-marronClaro text-xs">👥 ${c.vacantes} vacantes</span>
            </div>
            <p class="text-terracota font-bold mt-3">$${c.arancel_curso.toLocaleString()}</p>
            <p class="text-marronClaro text-sm mt-2">👨‍🏫 ${c.instructor}</p>
            <p class="text-marronClaro text-xs mt-1">📍 ${c.lugar}</p>
        </div>
    `).join('');
}

function cargarProfesionales() {
    const container = document.getElementById('profesionalesContainer');
    if (!container) return;
    
    const profesionales = window.PROFESIONALES_ACTIVOS || [];
    
    container.innerHTML = profesionales.map(prof => `
        <div class="bg-white rounded-xl p-4 border border-arena shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-3">
                <span class="material-icons text-terracota text-3xl">account_circle</span>
                <div>
                    <p class="font-semibold text-marron text-sm">${prof.nombre}</p>
                    <p class="text-marronClaro text-xs">${prof.especialidad}</p>
                    <p class="text-marronClaro text-xs mt-1 flex items-center gap-1">
                        <span class="material-icons text-xs">location_on</span> ${prof.localidad}
                    </p>
                </div>
            </div>
        </div>
    `).join('');
    
    const totalSpan = document.getElementById('totalProfesionales');
    if (totalSpan) {
        totalSpan.textContent = profesionales.length;
    }
}

function cambiarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion-publica').forEach(sec => sec.classList.add('hidden'));
    
    // Mostrar la sección seleccionada
    const seccionElement = document.getElementById(`seccion-${seccion}`);
    if (seccionElement) {
        seccionElement.classList.remove('hidden');
    }
    
    // Actualizar estilo de los botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('border-terracota', 'text-marron');
        btn.classList.add('text-marronClaro');
        if(btn.getAttribute('data-section') === seccion) {
            btn.classList.add('border-terracota', 'text-marron');
            btn.classList.remove('text-marronClaro');
        }
    });
    
    currentSection = seccion;
    if (window.playSound) window.playSound('click');
    
    // Si es la sección de profesionales, recargar por si hay cambios
    if (seccion === 'profesionales') {
        cargarProfesionales();
    }
}

// Inicializar navegación
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        cambiarSeccion(section);
    });
});

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    if (window.DATOS_LOCALES) {
        cargarNoticias();
        cargarAranceles();
        cargarRequisitos();
        cargarCapacitaciones();
    }
    cargarProfesionales();
});