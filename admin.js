// admin.js - Panel con CRUD completo incluyendo Autoridades

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

function renderForm() {
    const formContainer = document.getElementById('formFields');
    const formTitle = document.getElementById('formTitle');
    
    if (currentTab === 'noticias') {
        formTitle.textContent = editingId ? '✏️ Editar Noticia' : '➕ Agregar Noticia';
        formContainer.innerHTML = `<input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><textarea id="contenido" placeholder="Contenido" rows="3" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea><input type="text" id="categoria" placeholder="Categoría" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><select id="destacada" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><option value="false">No destacada</option><option value="true">Destacada</option></select><input type="date" id="fecha" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">`;
    } else if (currentTab === 'aranceles') {
        formTitle.textContent = editingId ? '✏️ Editar Arancel' : '➕ Agregar Arancel';
        formContainer.innerHTML = `<input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><input type="number" id="monto" placeholder="Monto" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><textarea id="descripcion" placeholder="Descripción" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea>`;
    } else if (currentTab === 'requisitos') {
        formTitle.textContent = editingId ? '✏️ Editar Requisito' : '➕ Agregar Requisito';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><textarea id="descripcion_detallada" placeholder="Descripción" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea><input type="number" id="orden_prioridad" placeholder="Orden" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">`;
    } else if (currentTab === 'capacitaciones') {
        formTitle.textContent = editingId ? '✏️ Editar Capacitación' : '➕ Agregar Capacitación';
        formContainer.innerHTML = `<input type="text" id="nombre_curso" placeholder="Nombre del curso" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><input type="date" id="fecha_inicio" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><select id="modalidad" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><option value="Presencial">Presencial</option><option value="Virtual">Virtual</option><option value="Híbrido">Híbrido</option></select><input type="text" id="lugar" placeholder="Lugar" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><input type="number" id="arancel_curso" placeholder="Arancel" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><input type="text" id="instructor" placeholder="Instructor" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><input type="number" id="vacantes" placeholder="Vacantes" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">`;
    } else if (currentTab === 'profesionales') {
        formTitle.textContent = editingId ? '✏️ Editar Profesional' : '➕ Agregar Profesional';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><input type="text" id="especialidad" placeholder="Especialidad" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"><input type="text" id="localidad" placeholder="Localidad" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">`;
    } else if (currentTab === 'autoridades') {
        formTitle.textContent = editingId ? '✏️ Editar Autoridad' : '➕ Agregar Autoridad';
        formContainer.innerHTML = `
            <input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="text" id="cargo" placeholder="Cargo (Ej: Presidente)" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="number" id="orden" placeholder="Orden jerárquico (1, 2, 3...)" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <input type="url" id="foto" placeholder="URL de la foto" class="w-full px-4 py-2 border border-arena rounded-lg mb-3">
            <textarea id="descripcion" placeholder="Descripción" rows="2" class="w-full px-4 py-2 border border-arena rounded-lg mb-3"></textarea>
        `;
    }
    
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
        }
    }
}

function guardarItem() {
    if (currentTab === 'profesionales') {
        const profesionales = window.PROFESIONALES_ACTIVOS;
        const newData = {
            nombre: document.getElementById('nombre').value,
            especialidad: document.getElementById('especialidad').value,
            localidad: document.getElementById('localidad').value
        };
        
        if (editingId) {
            const index = profesionales.findIndex(p => p.id === editingId);
            if (index !== -1) profesionales[index] = { ...profesionales[index], ...newData };
        } else {
            const newId = Math.max(...profesionales.map(p => p.id), 0) + 1;
            profesionales.push({ id: newId, ...newData });
        }
        
        if (window.playSound) window.playSound('success');
        editingId = null;
        renderForm();
        cargarAdminList();
        alert('Profesional guardado correctamente');
        return;
    }
    
    if (currentTab === 'autoridades') {
        const autoridades = window.AUTORIDADES;
        const newData = {
            nombre: document.getElementById('nombre').value,
            cargo: document.getElementById('cargo').value,
            orden: parseInt(document.getElementById('orden').value),
            foto: document.getElementById('foto').value,
            descripcion: document.getElementById('descripcion').value
        };
        
        if (editingId) {
            const index = autoridades.findIndex(a => a.id === editingId);
            if (index !== -1) autoridades[index] = { ...autoridades[index], ...newData };
        } else {
            const newId = Math.max(...autoridades.map(a => a.id), 0) + 1;
            autoridades.push({ id: newId, ...newData });
        }
        
        if (window.playSound) window.playSound('success');
        editingId = null;
        renderForm();
        cargarAdminList();
        alert('Autoridad guardada correctamente');
        return;
    }
    
    const datos = window.DATOS_LOCALES[currentTab];
    const newData = {};
    const inputs = document.querySelectorAll('#formFields input, #formFields textarea, #formFields select');
    inputs.forEach(input => {
        if (input.id) {
            let value = input.value;
            if (input.id === 'monto' || input.id === 'arancel_curso' || input.id === 'orden_prioridad' || input.id === 'vacantes') value = parseFloat(value);
            newData[input.id] = value;
        }
    });
    
    if (editingId) {
        const index = datos.findIndex(d => d.id === editingId);
        if (index !== -1) datos[index] = { ...datos[index], ...newData };
    } else {
        const newId = Math.max(...datos.map(d => d.id), 0) + 1;
        datos.push({ id: newId, ...newData });
    }
    
    if (window.playSound) window.playSound('success');
    editingId = null;
    renderForm();
    cargarAdminList();
    alert('Guardado correctamente');
}

function cargarAdminList() {
    const container = document.getElementById('adminList');
    
    if (currentTab === 'profesionales') {
        const profesionales = window.PROFESIONALES_ACTIVOS || [];
        if (profesionales.length === 0) {
            container.innerHTML = '<p class="text-marronClaro text-center py-4">No hay profesionales cargados.</p>';
            return;
        }
        container.innerHTML = `<div class="space-y-3">${profesionales.map(p => `
            <div class="flex justify-between items-center p-3 bg-lightGray rounded-lg border border-arena">
                <div><p class="font-semibold text-marron">${p.nombre}</p><p class="text-marronClaro text-sm">${p.especialidad} • ${p.localidad}</p><small class="text-marronClaro">ID: ${p.id}</small></div>
                <div><button onclick="window.editarItem(${p.id})" class="text-oliva mr-3 hover:text-oliva/70"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${p.id})" class="text-terracota hover:text-terracota/70"><span class="material-icons text-sm">delete</span></button></div>
            </div>`).join('')}</div>`;
        return;
    }
    
    if (currentTab === 'autoridades') {
        const autoridades = window.AUTORIDADES || [];
        autoridades.sort((a, b) => a.orden - b.orden);
        if (autoridades.length === 0) {
            container.innerHTML = '<p class="text-marronClaro text-center py-4">No hay autoridades cargadas.</p>';
            return;
        }
        container.innerHTML = `<div class="space-y-3">${autoridades.map(a => `
            <div class="flex justify-between items-center p-3 bg-lightGray rounded-lg border border-arena">
                <div><p class="font-semibold text-marron">${a.nombre}</p><p class="text-marronClaro text-sm">${a.cargo} • Orden: ${a.orden}</p><small class="text-marronClaro">ID: ${a.id}</small></div>
                <div><button onclick="window.editarItem(${a.id})" class="text-oliva mr-3 hover:text-oliva/70"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${a.id})" class="text-terracota hover:text-terracota/70"><span class="material-icons text-sm">delete</span></button></div>
            </div>`).join('')}</div>`;
        return;
    }
    
    const datos = window.DATOS_LOCALES[currentTab];
    if (!datos || datos.length === 0) {
        container.innerHTML = '<p class="text-marronClaro text-center py-4">No hay elementos. Creá uno nuevo.</p>';
        return;
    }
    container.innerHTML = `<div class="space-y-3">${datos.map(item => `
        <div class="flex justify-between items-center p-3 bg-lightGray rounded-lg border border-arena">
            <div><p class="font-semibold text-marron">${item.titulo || item.nombre || item.nombre_curso}</p><small class="text-marronClaro">ID: ${item.id}</small></div>
            <div><button onclick="window.editarItem(${item.id})" class="text-oliva mr-3 hover:text-oliva/70"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${item.id})" class="text-terracota hover:text-terracota/70"><span class="material-icons text-sm">delete</span></button></div>
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
            const profesionales = window.PROFESIONALES_ACTIVOS;
            const index = profesionales.findIndex(p => p.id === id);
            if (index !== -1) profesionales.splice(index, 1);
        } else if (currentTab === 'autoridades') {
            const autoridades = window.AUTORIDADES;
            const index = autoridades.findIndex(a => a.id === id);
            if (index !== -1) autoridades.splice(index, 1);
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
        document.querySelectorAll('.admin-tab-btn').forEach(b => {
            b.classList.remove('border-terracota', 'text-marron');
            b.classList.add('text-marronClaro');
        });
        btn.classList.add('border-terracota', 'text-marron');
        btn.classList.remove('text-marronClaro');
        cargarAdminData(tab);
    });
});

checkAdminSession();