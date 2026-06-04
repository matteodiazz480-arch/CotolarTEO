// app.js - Navegación y carga de datos con imágenes

let currentSection = 'inicio';

function cargarNoticias() {
    const container = document.getElementById('noticiasContainer');
    const noticias = window.DATOS_LOCALES.noticias;
    
    container.innerHTML = noticias.map(noticia => `
        <div class="bg-white rounded-2xl border border-azulBorde shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer" onclick="abrirModalNoticia(${JSON.stringify(noticia).replace(/"/g, '&quot;')})">
            ${noticia.imagen ? `<div class="h-48 overflow-hidden"><img src="${noticia.imagen}" alt="${noticia.titulo}" class="w-full h-full object-cover"></div>` : '<div class="h-48 bg-gradient-to-r from-azulPrimario/20 to-celeste/20 flex items-center justify-center"><span class="material-icons text-azulMarino text-6xl">newspaper</span></div>'}
            <div class="p-5">
                <div class="flex justify-between items-start mb-3">
                    <span class="bg-azulPrimario/10 text-azulPrimario text-xs px-2 py-1 rounded-full">${noticia.categoria || 'Noticia'}</span>
                    ${noticia.destacada ? '<span class="bg-mostaza/10 text-mostaza text-xs px-2 py-1 rounded-full">⭐ Destacada</span>' : ''}
                </div>
                <h3 class="text-lg font-bold text-azulMarino mb-2">${noticia.titulo}</h3>
                <p class="text-azulSec text-sm mb-3">📅 ${new Date(noticia.fecha).toLocaleDateString('es-AR')}</p>
                <p class="text-azulMarino/70 line-clamp-3">${noticia.contenido.substring(0, 120)}${noticia.contenido.length > 120 ? '...' : ''}</p>
                <div class="text-azulPrimario text-sm font-semibold mt-3 inline-flex items-center gap-1 hover:underline">
                    Leer más <span class="material-icons text-sm">arrow_forward</span>
                </div>
            </div>
        </div>
    `).join('');
}

function cargarAranceles() {
    const container = document.getElementById('arancelesContainer');
    const aranceles = window.DATOS_LOCALES.aranceles;
    
    container.innerHTML = aranceles.map(a => `
        <div class="bg-white rounded-2xl p-5 border border-azulBorde shadow-md">
            <h3 class="text-lg font-bold text-azulMarino">${a.titulo}</h3>
            <p class="text-azulPrimario text-2xl font-bold mt-2">$${a.monto.toLocaleString()}</p>
            <p class="text-azulSec text-sm mt-2">${a.descripcion}</p>
        </div>
    `).join('');
}

function cargarRequisitos() {
    const container = document.getElementById('requisitosContainer');
    const requisitos = window.DATOS_LOCALES.requisitos.sort((a,b) => a.orden_prioridad - b.orden_prioridad);
    
    container.innerHTML = requisitos.map(r => `
        <div class="bg-white rounded-2xl p-5 border border-azulBorde shadow-md flex items-start gap-4">
            <div class="w-8 h-8 bg-azulPrimario rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">${r.orden_prioridad}</div>
            <div>
                <h3 class="font-bold text-azulMarino">${r.nombre}</h3>
                <p class="text-azulSec text-sm">${r.descripcion_detallada}</p>
            </div>
        </div>
    `).join('');
}

function cargarCapacitaciones() {
    const container = document.getElementById('capacitacionesContainer');
    const cursos = window.DATOS_LOCALES.capacitaciones;
    
    if (!container) return;
    
    container.innerHTML = cursos.map(curso => `
        <div class="bg-white rounded-2xl border border-azulBorde shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            ${curso.imagen ? 
                `<div class="h-44 overflow-hidden">
                    <img src="${curso.imagen}" alt="${curso.nombre_curso}" class="w-full h-full object-cover">
                </div>` : 
                `<div class="h-44 bg-gradient-to-r from-azulPrimario/20 to-celeste/20 flex items-center justify-center">
                    <span class="material-icons text-azulMarino text-5xl">school</span>
                </div>`
            }
            <div class="p-5">
                <h3 class="text-lg font-bold text-azulMarino">${curso.nombre_curso}</h3>
                <div class="flex gap-2 mt-2 flex-wrap">
                    <span class="bg-azulPrimario/10 text-azulPrimario text-xs px-2 py-1 rounded-full">${curso.modalidad}</span>
                    <span class="text-azulSec text-xs">📅 ${new Date(curso.fecha_inicio).toLocaleDateString('es-AR')}</span>
                    <span class="text-azulSec text-xs">👥 ${curso.vacantes} vacantes</span>
                </div>
                <p class="text-azulPrimario font-bold mt-3">$${curso.arancel_curso.toLocaleString()}</p>
                <p class="text-azulSec text-sm mt-2">👨‍🏫 ${curso.instructor}</p>
                <p class="text-azulSec text-xs mt-1">📍 ${curso.lugar}</p>
                ${curso.contenido ? `<p class="text-azulMarino/70 text-sm mt-3 line-clamp-2">${curso.contenido.substring(0, 100)}${curso.contenido.length > 100 ? '...' : ''}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function cargarProfesionales() {
    const container = document.getElementById('profesionalesContainer');
    if (!container) return;
    
    const profesionales = window.PROFESIONALES_ACTIVOS || [];
    
    container.innerHTML = profesionales.map(prof => `
        <div class="bg-white rounded-xl p-4 border border-azulBorde shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-azulClaro flex-shrink-0">
                ${prof.foto ? `<img src="${prof.foto}" alt="${prof.nombre}" class="w-full h-full object-cover">` : '<div class="w-full h-full flex items-center justify-center"><span class="material-icons text-azulPrimario text-3xl">account_circle</span></div>'}
            </div>
            <div>
                <p class="font-semibold text-azulMarino text-sm">${prof.nombre}</p>
                <p class="text-azulSec text-xs">${prof.especialidad}</p>
                <p class="text-azulSec text-xs flex items-center gap-1"><span class="material-icons text-xs">location_on</span> ${prof.localidad}</p>
            </div>
        </div>
    `).join('');
    
    const totalSpan = document.getElementById('totalProfesionales');
    if (totalSpan) totalSpan.textContent = profesionales.length;
}

function cargarAutoridades() {
    const container = document.getElementById('autoridadesContainer');
    if (!container) return;
    
    const autoridades = window.AUTORIDADES || [];
    autoridades.sort((a, b) => a.orden - b.orden);
    
    container.innerHTML = autoridades.map(auth => `
        <div class="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-azulBorde flex items-center gap-4">
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-azulClaro border-2 border-azulPrimario flex-shrink-0">
                ${auth.foto ? `<img src="${auth.foto}" alt="${auth.nombre}" class="w-full h-full object-cover">` : '<div class="w-full h-full flex items-center justify-center"><span class="material-icons text-azulPrimario text-4xl">person</span></div>'}
            </div>
            <div>
                <div class="inline-block bg-azulPrimario/10 text-azulPrimario text-xs px-2 py-1 rounded-full mb-1">${auth.cargo}</div>
                <h3 class="font-bold text-azulMarino text-base md:text-lg">${auth.nombre}</h3>
                <p class="text-azulSec text-xs md:text-sm mt-1">${auth.descripcion || ''}</p>
            </div>
        </div>
    `).join('');
}

function cargarNormativa() {
    const container = document.getElementById('normativaContainer');
    if (!container) return;
    
    const normativa = window.DATOS_LOCALES.normativa;
    
    container.innerHTML = `
        <div class="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-md border border-azulBorde mb-6">
            <h2 class="text-xl font-bold text-azulMarino mb-4 flex items-center gap-2">
                <span class="material-icons text-azulPrimario">article</span> Código de Ética
            </h2>
            <div class="text-azulSec text-sm whitespace-pre-line leading-relaxed">${normativa.codigoEtica}</div>
        </div>
        <div class="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-md border border-azulBorde">
            <h2 class="text-xl font-bold text-azulMarino mb-4 flex items-center gap-2">
                <span class="material-icons text-azulPrimario">gavel</span> Ley Nacional N° 27.123
            </h2>
            <div class="text-azulSec text-sm whitespace-pre-line leading-relaxed">${normativa.ley}</div>
        </div>
    `;
}

function cambiarSeccion(seccion) {
    document.querySelectorAll('.seccion-publica').forEach(sec => sec.classList.add('hidden'));
    const seccionElement = document.getElementById(`seccion-${seccion}`);
    if (seccionElement) seccionElement.classList.remove('hidden');
    
    if (window.playSound) window.playSound('click');
    
    if (seccion === 'profesionales') cargarProfesionales();
    if (seccion === 'autoridades') cargarAutoridades();
    if (seccion === 'normativa') cargarNormativa();
    if (seccion === 'capacitaciones') cargarCapacitaciones();
}

window.cambiarSeccion = cambiarSeccion;

document.querySelectorAll('.nav-btn-desktop').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        if (section) cambiarSeccion(section);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.DATOS_LOCALES) {
        cargarNoticias();
        cargarAranceles();
        cargarRequisitos();
        cargarCapacitaciones();
        cargarNormativa();
    }
    cargarProfesionales();
    cargarAutoridades();
});