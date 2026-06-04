// modal.js - Sistema de modales para leer más noticias

let modalActivo = null;

function cerrarModal() {
    if (modalActivo) {
        modalActivo.remove();
        modalActivo = null;
        if (window.playSound) window.playSound('click');
    }
}

function abrirModalNoticia(noticia) {
    cerrarModal();
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2>${noticia.titulo}</h2>
                <span class="material-icons" id="closeModalBtn">close</span>
            </div>
            <div class="modal-body">
                ${noticia.imagen ? `<img src="${noticia.imagen}" alt="${noticia.titulo}">` : '<div class="bg-azulClaro h-48 rounded-2xl flex items-center justify-center"><span class="material-icons text-azulSec text-5xl">newspaper</span></div>'}
                <span class="fecha">📅 ${new Date(noticia.fecha).toLocaleDateString('es-AR')} | ${noticia.categoria || 'Noticia'}</span>
                <div class="contenido">${noticia.contenido}</div>
                <button class="modal-close-btn">Cerrar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modalActivo = modal;
    
    modal.querySelector('#closeModalBtn')?.addEventListener('click', cerrarModal);
    modal.querySelector('.modal-close-btn')?.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(); });
    
    if (window.playSound) window.playSound('click');
}