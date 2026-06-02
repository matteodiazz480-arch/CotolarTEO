// admin.js - Panel con CRUD y subida de imágenes

let currentTab = 'noticias';
let editingId = null;

function checkAdminSession() {
    const session = localStorage.getItem('adminSession');
    if (session) {
        try {
            const user = JSON.parse(session);
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
            cargarAdminData('noticias');
        } catch(e) { localStorage.removeItem('adminSession'); }
    }
}

document.getElementById('btnAdminLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const user = window.verificarLogin(email, password);
    if (user) {
        if (window.playSound) window.playSound('success');
        localStorage.setItem('adminSession', JSON.stringify(user));
        checkAdminSession();
    } else {
        if (window.playSound) window.playSound('error');
        alert('Acceso denegado. Verificá tus credenciales.');
    }
});

document.getElementById('btnLogout')?.addEventListener('click', () => {
    localStorage.removeItem('adminSession');
    if (window.playSound) window.playSound('click');
    location.reload();
});

function agregarBotonesSubidaImagen() {
    // Botón para subir imagen en noticias
    const imagenNoticia = document.getElementById('imagenNoticia');
    if (imagenNoticia && !imagenNoticia.hasListener) {
        const btnSubir = document.createElement('button');
        btnSubir.type = 'button';
        btnSubir.className = 'bg-oliva text-white px-3 py-1 rounded-lg text-sm mb-3 flex items-center gap-1';
        btnSubir.innerHTML = '<span class="material-icons text-sm">upload</span> Subir imagen';
        btnSubir.onclick = () => {
            crearSelectorImagen((base64) => {
                document.getElementById('imagenNoticia').value = base64;
                mostrarPreviewImagen(base64, 'previewNoticia');
            });
        };
        imagenNoticia.parentNode.insertBefore(btnSubir, imagenNoticia.nextSibling);
        imagenNoticia.hasListener = true;
    }
}

function mostrarPreviewImagen(base64, containerId) {
    let preview = document.getElementById(containerId);
    if (!preview) {
        preview = document.createElement('div');
        preview.id = containerId;
        preview.className = 'mt-2 mb-3';
        const input = document.getElementById(containerId.replace('preview', '')) || document.querySelector(`#${containerId.replace('preview', '')}`);
        if (input) input.parentNode.insertBefore(preview, input.nextSibling);
    }
    if (base64) {
        preview.innerHTML = `<img src="${base64}" class="w-24 h-24 object-cover rounded-lg border border-arena">`;
    } else {
        preview.innerHTML = '';
    }
}

function renderForm() {
    const formContainer = document.getElementById('formFields');
    const formTitle = document.getElementById('formTitle');
    
    if (currentTab === 'noticias') {
        formTitle.textContent = editingId ? '✏️ Editar Noticia' : '➕ Agregar Noticia';
        formContainer.innerHTML = `
            <input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <textarea id="contenido" placeholder="Contenido completo" rows="5" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea>
            <input type="text" id="categoria" placeholder="Categoría" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="date" id="fecha" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <select id="destacada" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><option value="false">No destacada</option><option value="true">Destacada</option></select>
            <label class="text-marron text-sm font-semibold mb-1 block">Imagen de la noticia</label>
            <input type="hidden" id="imagenNoticia">
            <div id="previewNoticia"></div>
        `;
    } else if (currentTab === 'capacitaciones') {
        formTitle.textContent = editingId ? '✏️ Editar Capacitación' : '➕ Agregar Capacitación';
        formContainer.innerHTML = `
            <input type="text" id="nombre_curso" placeholder="Nombre del curso" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <textarea id="contenido" placeholder="Descripción del curso" rows="3" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea>
            <input type="date" id="fecha_inicio" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <select id="modalidad" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><option value="Presencial">Presencial</option><option value="Virtual">Virtual</option><option value="Híbrido">Híbrido</option></select>
            <input type="text" id="lugar" placeholder="Lugar" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="number" id="arancel_curso" placeholder="Arancel" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="text" id="instructor" placeholder="Instructor" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="number" id="vacantes" placeholder="Vacantes" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <label class="text-marron text-sm font-semibold mb-1 block">Imagen del curso</label>
            <input type="hidden" id="imagen">
            <div id="previewImagen"></div>
        `;
    } else if (currentTab === 'autoridades') {
        formTitle.textContent = editingId ? '✏️ Editar Autoridad' : '➕ Agregar Autoridad';
        formContainer.innerHTML = `
            <input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="text" id="cargo" placeholder="Cargo (Ej: Presidente)" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="number" id="orden" placeholder="Orden jerárquico (1, 2, 3...)" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <textarea id="descripcion" placeholder="Descripción" rows="2" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea>
            <label class="text-marron text-sm font-semibold mb-1 block">Foto de perfil</label>
            <input type="hidden" id="foto">
            <div id="previewFoto"></div>
        `;
    } else if (currentTab === 'profesionales') {
        formTitle.textContent = editingId ? '✏️ Editar Profesional' : '➕ Agregar Profesional';
        formContainer.innerHTML = `
            <input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="text" id="especialidad" placeholder="Especialidad" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="text" id="localidad" placeholder="Localidad" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <label class="text-marron text-sm font-semibold mb-1 block">Foto de perfil</label>
            <input type="hidden" id="foto">
            <div id="previewFoto"></div>
        `;
    } else {
        // Resto de tabs sin imágenes
        formContainer.innerHTML = `<input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><textarea id="descripcion" placeholder="Descripción" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea><input type="number" id="monto" placeholder="Monto" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">`;
    }
    
    setTimeout(() => {
        if (currentTab === 'noticias') {
            const btnSubir = document.createElement('button');
            btnSubir.type = 'button';
            btnSubir.className = 'bg-oliva text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1';
            btnSubir.innerHTML = '<span class="material-icons text-sm">upload</span> Subir imagen';
            btnSubir.onclick = () => {
                crearSelectorImagen((base64) => {
                    document.getElementById('imagenNoticia').value = base64;
                    mostrarPreviewImagen(base64, 'previewNoticia');
                });
            };
            const container = document.getElementById('formFields');
            const previewDiv = document.getElementById('previewNoticia');
            if (previewDiv) previewDiv.parentNode.insertBefore(btnSubir, previewDiv);
        } else if (currentTab === 'capacitaciones') {
            const btnSubir = document.createElement('button');
            btnSubir.type = 'button';
            btnSubir.className = 'bg-oliva text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1';
            btnSubir.innerHTML = '<span class="material-icons text-sm">upload</span> Subir imagen';
            btnSubir.onclick = () => {
                crearSelectorImagen((base64) => {
                    document.getElementById('imagen').value = base64;
                    mostrarPreviewImagen(base64, 'previewImagen');
                });
            };
            const container = document.getElementById('formFields');
            const previewDiv = document.getElementById('previewImagen');
            if (previewDiv) previewDiv.parentNode.insertBefore(btnSubir, previewDiv);
        } else if (currentTab === 'autoridades' || currentTab === 'profesionales') {
            const btnSubir = document.createElement('button');
            btnSubir.type = 'button';
            btnSubir.className = 'bg-oliva text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1';
            btnSubir.innerHTML = '<span class="material-icons text-sm">upload</span> Subir foto';
            btnSubir.onclick = () => {
                crearSelectorImagen((base64) => {
                    document.getElementById('foto').value = base64;
                    mostrarPreviewImagen(base64, 'previewFoto');
                });
            };
            const previewDiv = document.getElementById('previewFoto');
            if (previewDiv) previewDiv.parentNode.insertBefore(btnSubir, previewDiv);
        }
    }, 50);
    
    if (editingId) cargarDatosParaEditar();
}

function cargarDatosParaEditar() {
    let datos;
    if (currentTab === 'profesionales') datos = window.PROFESIONALES_ACTIVOS;
    else if (currentTab === 'autoridades') datos = window.AUTORIDADES;
    else datos = window.DATOS_LOCALES[currentTab];
    
    const item = datos.find(d => d.id === editingId);
    if (item) {
        for (let key in item) {
            const input = document.getElementById(key);
            if (input) input.value = item[key];
            if (key === 'imagen' || key === 'foto') {
                mostrarPreviewImagen(item[key], `preview${key.charAt(0).toUpperCase() + key.slice(1)}`);
            }
        }
    }
}

function guardarItem() {
    const newData = {};
    const inputs = document.querySelectorAll('#formFields input, #formFields textarea, #formFields select');
    inputs.forEach(input => {
        if (input.id) newData[input.id] = input.value;
    });
    
    if (currentTab === 'profesionales') {
        const profesionales = window.PROFESIONALES_ACTIVOS;
        if (editingId) {
            const index = profesionales.findIndex(p => p.id === editingId);
            if (index !== -1) profesionales[index] = { ...profesionales[index], ...newData };
        } else {
            const newId = Math.max(...profesionales.map(p => p.id), 0) + 1;
            profesionales.push({ id: newId, ...newData });
        }
    } else if (currentTab === 'autoridades') {
        const autoridades = window.AUTORIDADES;
        newData.orden = parseInt(newData.orden);
        if (editingId) {
            const index = autoridades.findIndex(a => a.id === editingId);
            if (index !== -1) autoridades[index] = { ...autoridades[index], ...newData };
        } else {
            const newId = Math.max(...autoridades.map(a => a.id), 0) + 1;
            autoridades.push({ id: newId, ...newData });
        }
    } else if (currentTab === 'noticias') {
        const noticias = window.DATOS_LOCALES.noticias;
        newData.imagen = document.getElementById('imagenNoticia')?.value || '';
        if (editingId) {
            const index = noticias.findIndex(n => n.id === editingId);
            if (index !== -1) noticias[index] = { ...noticias[index], ...newData };
        } else {
            const newId = Math.max(...noticias.map(n => n.id), 0) + 1;
            noticias.push({ id: newId, ...newData });
        }
    } else if (currentTab === 'capacitaciones') {
        const capacitaciones = window.DATOS_LOCALES.capacitaciones;
        newData.imagen = document.getElementById('imagen')?.value || '';
        if (editingId) {
            const index = capacitaciones.findIndex(c => c.id === editingId);
            if (index !== -1) capacitaciones[index] = { ...capacitaciones[index], ...newData };
        } else {
            const newId = Math.max(...capacitaciones.map(c => c.id), 0) + 1;
            capacitaciones.push({ id: newId, ...newData });
        }
    } else {
        const datos = window.DATOS_LOCALES[currentTab];
        if (editingId) {
            const index = datos.findIndex(d => d.id === editingId);
            if (index !== -1) datos[index] = { ...datos[index], ...newData };
        } else {
            const newId = Math.max(...datos.map(d => d.id), 0) + 1;
            datos.push({ id: newId, ...newData });
        }
    }
    
    if (window.playSound) window.playSound('success');
    editingId = null;
    renderForm();
    cargarAdminList();
    alert('Guardado correctamente');
}

function cargarAdminList() {
    const container = document.getElementById('adminList');
    let datos, tituloItem;
    
    if (currentTab === 'profesionales') {
        datos = window.PROFESIONALES_ACTIVOS;
        tituloItem = (item) => `${item.nombre} - ${item.especialidad}`;
    } else if (currentTab === 'autoridades') {
        datos = window.AUTORIDADES;
        datos.sort((a, b) => a.orden - b.orden);
        tituloItem = (item) => `${item.cargo}: ${item.nombre}`;
    } else if (currentTab === 'noticias') {
        datos = window.DATOS_LOCALES.noticias;
        tituloItem = (item) => item.titulo;
    } else if (currentTab === 'capacitaciones') {
        datos = window.DATOS_LOCALES.capacitaciones;
        tituloItem = (item) => item.nombre_curso;
    } else {
        datos = window.DATOS_LOCALES[currentTab];
        tituloItem = (item) => item.titulo || item.nombre || 'Elemento';
    }
    
    if (!datos || datos.length === 0) {
        container.innerHTML = '<p class="text-marronClaro text-center py-4">No hay elementos. Creá uno nuevo.</p>';
        return;
    }
    
    container.innerHTML = `<div class="space-y-3">${datos.map(item => `
        <div class="flex justify-between items-center p-3 bg-lightGray rounded-lg border border-arena">
            <div><p class="font-semibold text-marron">${tituloItem(item)}</p><small class="text-marronClaro">ID: ${item.id}</small></div>
            <div><button onclick="window.editarItem(${item.id})" class="text-oliva mr-3"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${item.id})" class="text-terracota"><span class="material-icons text-sm">delete</span></button></div>
        </div>`).join('')}</div>`;
}

window.editarItem = (id) => {
    editingId = id;
    renderForm();
    if (window.playSound) window.playSound('click');
};

window.eliminarItem = (id) => {
    if (confirm('¿Eliminar este elemento permanentemente?')) {
        if (currentTab === 'profesionales') {
            const index = window.PROFESIONALES_ACTIVOS.findIndex(p => p.id === id);
            if (index !== -1) window.PROFESIONALES_ACTIVOS.splice(index, 1);
        } else if (currentTab === 'autoridades') {
            const index = window.AUTORIDADES.findIndex(a => a.id === id);
            if (index !== -1) window.AUTORIDADES.splice(index, 1);
        } else {
            const datos = window.DATOS_LOCALES[currentTab];
            const index = datos.findIndex(d => d.id === id);
            if (index !== -1) datos.splice(index, 1);
        }
        if (window.playSound) window.playSound('success');
        if (editingId === id) { editingId = null; renderForm(); }
        cargarAdminList();
        alert('Eliminado correctamente');
    }
};

function cargarAdminData(tab) {
    currentTab = tab;
    editingId = null;
    renderForm();
    cargarAdminList();
}

document.getElementById('btnSave')?.addEventListener('click', guardarItem);
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('border-terracota', 'text-marron'));
        btn.classList.add('border-terracota', 'text-marron');
        cargarAdminData(tab);
    });
});

checkAdminSession();