// admin.js - Panel con Dashboard, modal de edición y CRUD

let currentTab = 'dashboard';
let editingId = null;
let editingItem = null;

function initAdminPanel() {
    const user = Auth.requireAuth(['admin', 'encargado']);
    if (!user) return;
    const nameEl = document.getElementById('adminNameDisplay');
    if (nameEl) nameEl.textContent = user.nombre;
    cargarDashboard();
    mostrarTab('dashboard');
}

document.getElementById('btnLogout')?.addEventListener('click', () => {
    if (window.playSound) window.playSound('click');
    Auth.logout();
});

// ========== FUNCIÓN PARA SUBIR IMAGEN ==========
function subirImagenEnModal(callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/gif,image/webp';
    input.onchange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(ev) {
                callback(ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// ========== DASHBOARD (texto negro para legibilidad) ==========
function cargarDashboard() {
    const container = document.getElementById('dashboardContainer');
    const matriculados = window.MATRICULADOS || [];
    const noticias = window.DATOS_LOCALES.noticias || [];
    const capacitaciones = window.DATOS_LOCALES.capacitaciones || [];
    
    const totalMatriculados = matriculados.length;
    const activos = matriculados.filter(m => m.estado === 'Activo').length;
    const porRenovar = matriculados.filter(m => m.estado === 'Por renovar').length;
    const suspendidos = matriculados.filter(m => m.estado === 'Suspendido' || m.estado === 'Inactivo').length;
    const tasaActividad = totalMatriculados > 0 ? Math.round((activos / totalMatriculados) * 100) : 0;
    
    const hoy = new Date();
    const vencidos = matriculados.filter(m => new Date(m.fechaVencimiento) < hoy).length;
    
    const distribucion = {};
    matriculados.forEach(m => {
        distribucion[m.localidad] = (distribucion[m.localidad] || 0) + 1;
    });
    
    container.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 dashboard-stats">
            <div class="bg-gradient-to-br from-azulPrimario to-celeste rounded-xl p-4 shadow-md dashboard-card">
                <div class="flex items-center justify-between">
                    <span class="material-icons text-3xl opacity-80 text-white">badge</span>
                    <span class="text-2xl font-bold text-black">${totalMatriculados}</span>
                </div>
                <p class="text-black text-sm opacity-90 mt-2 font-semibold">Total Matriculados</p>
            </div>
            <div class="bg-gradient-to-br from-azulPrimario to-celeste rounded-xl p-4 shadow-md dashboard-card">
                <div class="flex items-center justify-between">
                    <span class="material-icons text-3xl opacity-80 text-white">check_circle</span>
                    <span class="text-2xl font-bold text-black">${activos}</span>
                </div>
                <p class="text-black text-sm opacity-90 mt-2 font-semibold">Activos</p>
            </div>
            <div class="bg-gradient-to-br from-azulPrimario to-celeste rounded-xl p-4 shadow-md dashboard-card">
                <div class="flex items-center justify-between">
                    <span class="material-icons text-3xl opacity-80 text-white">update</span>
                    <span class="text-2xl font-bold text-black">${porRenovar}</span>
                </div>
                <p class="text-black text-sm opacity-90 mt-2 font-semibold">Por renovar</p>
            </div>
            <div class="bg-gradient-to-br from-azulPrimario to-celeste rounded-xl p-4 shadow-md dashboard-card">
                <div class="flex items-center justify-between">
                    <span class="material-icons text-3xl opacity-80 text-white">cancel</span>
                    <span class="text-2xl font-bold text-black">${suspendidos}</span>
                </div>
                <p class="text-black text-sm opacity-90 mt-2 font-semibold">Suspendidos/Inactivos</p>
            </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-4 mt-4">
            <div class="bg-azulCard rounded-xl p-4 border border-azulBorde shadow-sm">
                <div class="flex items-center gap-2 mb-3">
                    <span class="material-icons text-azulPrimario">timeline</span>
                    <h3 class="font-semibold text-azulMarino">Tasa de Actividad</h3>
                </div>
                <div class="relative pt-1">
                    <div class="flex mb-2 items-center justify-between">
                        <span class="text-xs font-semibold inline-block text-azulPrimario">Profesionales activos</span>
                        <span class="text-xs font-semibold inline-block text-azulMarino">${tasaActividad}%</span>
                    </div>
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-azulClaro">
                        <div style="width:${tasaActividad}%" class="shadow-none flex flex-col text-center text-white justify-center bg-azulPrimario"></div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-azulBorde">
                    <div class="flex justify-between items-center">
                        <span class="text-azulSec flex items-center gap-1"><span class="material-icons text-sm">event</span> Matrículas vencidas</span>
                        <span class="font-semibold text-azulMarino">${vencidos}</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-azulCard rounded-xl p-4 border border-azulBorde shadow-sm">
                <div class="flex items-center gap-2 mb-3">
                    <span class="material-icons text-azulPrimario">content_paste</span>
                    <h3 class="font-semibold text-azulMarino">Contenido</h3>
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="text-azulSec flex items-center gap-1"><span class="material-icons text-sm">article</span> Noticias</span>
                        <span class="font-semibold text-azulMarino">${noticias.length}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-azulSec flex items-center gap-1"><span class="material-icons text-sm">school</span> Capacitaciones</span>
                        <span class="font-semibold text-azulMarino">${capacitaciones.length}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-azulSec flex items-center gap-1"><span class="material-icons text-sm">groups</span> Autoridades</span>
                        <span class="font-semibold text-azulMarino">${window.AUTORIDADES?.length || 0}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-azulCard rounded-xl p-4 border border-azulBorde shadow-sm mt-4">
            <div class="flex items-center gap-2 mb-3">
                <span class="material-icons text-azulPrimario">location_on</span>
                <h3 class="font-semibold text-azulMarino">Distribución por Localidad</h3>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                ${Object.entries(distribucion).map(([localidad, count]) => `
                    <div class="flex justify-between items-center p-2 bg-azulClaro rounded-lg">
                        <span class="text-azulSec text-sm">${localidad}</span>
                        <span class="font-semibold text-azulMarino text-sm">${count}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ========== MODAL DE EDICIÓN CON SUBIDA DE IMÁGENES ==========
function abrirModalEdicion(tab, id) {
    let datos, item, campos;
    
    if (tab === 'matriculados') {
        datos = window.MATRICULADOS;
        item = datos.find(d => d.id === id);
        campos = [
            { name: 'nroMatricula', label: 'N° Matrícula', type: 'text', value: item?.nroMatricula || '' },
            { name: 'nombre', label: 'Nombre completo', type: 'text', value: item?.nombre || '' },
            { name: 'dni', label: 'DNI', type: 'text', value: item?.dni || '' },
            { name: 'fechaMatriculacion', label: 'Fecha matriculación', type: 'date', value: item?.fechaMatriculacion || '' },
            { name: 'fechaVencimiento', label: 'Fecha vencimiento', type: 'date', value: item?.fechaVencimiento || '' },
            { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Por renovar', 'Suspendido', 'Inactivo'], value: item?.estado || 'Activo' },
            { name: 'especialidad', label: 'Especialidad', type: 'text', value: item?.especialidad || '' },
            { name: 'localidad', label: 'Localidad', type: 'text', value: item?.localidad || '' },
            { name: 'telefono', label: 'Teléfono', type: 'text', value: item?.telefono || '' },
            { name: 'email', label: 'Email', type: 'email', value: item?.email || '' }
        ];
    } else if (tab === 'noticias') {
        datos = window.DATOS_LOCALES.noticias;
        item = datos.find(d => d.id === id);
        campos = [
            { name: 'titulo', label: 'Título', type: 'text', value: item?.titulo || '' },
            { name: 'contenido', label: 'Contenido', type: 'textarea', value: item?.contenido || '' },
            { name: 'categoria', label: 'Categoría', type: 'text', value: item?.categoria || '' },
            { name: 'destacada', label: 'Destacada', type: 'select', options: ['false', 'true'], value: item?.destacada || 'false' },
            { name: 'fecha', label: 'Fecha', type: 'date', value: item?.fecha || '' },
            { name: 'imagen', label: 'Imagen', type: 'image', value: item?.imagen || '' }
        ];
    } else if (tab === 'autoridades') {
        datos = window.AUTORIDADES;
        item = datos.find(d => d.id === id);
        campos = [
            { name: 'nombre', label: 'Nombre', type: 'text', value: item?.nombre || '' },
            { name: 'cargo', label: 'Cargo', type: 'text', value: item?.cargo || '' },
            { name: 'orden', label: 'Orden', type: 'number', value: item?.orden || 0 },
            { name: 'descripcion', label: 'Descripción', type: 'textarea', value: item?.descripcion || '' },
            { name: 'foto', label: 'Foto', type: 'image', value: item?.foto || '' }
        ];
    } else if (tab === 'capacitaciones') {
        datos = window.DATOS_LOCALES.capacitaciones;
        item = datos.find(d => d.id === id);
        campos = [
            { name: 'nombre_curso', label: 'Nombre del curso', type: 'text', value: item?.nombre_curso || '' },
            { name: 'fecha_inicio', label: 'Fecha inicio', type: 'date', value: item?.fecha_inicio || '' },
            { name: 'modalidad', label: 'Modalidad', type: 'select', options: ['Presencial', 'Virtual', 'Híbrido'], value: item?.modalidad || 'Presencial' },
            { name: 'arancel_curso', label: 'Arancel', type: 'number', value: item?.arancel_curso || 0 },
            { name: 'instructor', label: 'Instructor', type: 'text', value: item?.instructor || '' },
            { name: 'vacantes', label: 'Vacantes', type: 'number', value: item?.vacantes || 0 },
            { name: 'imagen', label: 'Imagen', type: 'image', value: item?.imagen || '' }
        ];
    } else if (tab === 'profesionales') {
        datos = window.PROFESIONALES_ACTIVOS;
        item = datos.find(d => d.id === id);
        campos = [
            { name: 'nombre', label: 'Nombre', type: 'text', value: item?.nombre || '' },
            { name: 'especialidad', label: 'Especialidad', type: 'text', value: item?.especialidad || '' },
            { name: 'localidad', label: 'Localidad', type: 'text', value: item?.localidad || '' },
            { name: 'foto', label: 'Foto', type: 'image', value: item?.foto || '' }
        ];
    } else {
        return;
    }
    
    if (!item) return;
    
    editingId = id;
    editingItem = { ...item };
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay-admin';
    
    let camposHTML = '';
    for (const campo of campos) {
        if (campo.type === 'textarea') {
            camposHTML += `
                <div class="mb-3">
                    <label class="block text-azulMarino text-sm font-semibold mb-1">${campo.label}</label>
                    <textarea id="edit_${campo.name}" rows="3">${campo.value}</textarea>
                </div>
            `;
        } else if (campo.type === 'select') {
            camposHTML += `
                <div class="mb-3">
                    <label class="block text-azulMarino text-sm font-semibold mb-1">${campo.label}</label>
                    <select id="edit_${campo.name}">${campo.options.map(opt => `<option value="${opt}" ${campo.value === opt ? 'selected' : ''}>${opt}</option>`).join('')}</select>
                </div>
            `;
        } else if (campo.type === 'image') {
            camposHTML += `
                <div class="mb-3">
                    <label class="block text-azulMarino text-sm font-semibold mb-1">${campo.label}</label>
                    <input type="hidden" id="edit_${campo.name}" value="${campo.value}">
                    <button type="button" class="btn-upload" onclick="subirImagenEnModalCallback('edit_${campo.name}')">
                        <span class="material-icons text-sm">upload</span> Subir imagen
                    </button>
                    <div id="preview_edit_${campo.name}" class="mt-2">
                        ${campo.value ? `<img src="${campo.value}" class="preview-image">` : ''}
                    </div>
                </div>
            `;
        } else {
            camposHTML += `
                <div class="mb-3">
                    <label class="block text-azulMarino text-sm font-semibold mb-1">${campo.label}</label>
                    <input type="${campo.type}" id="edit_${campo.name}" value="${campo.value}">
                </div>
            `;
        }
    }
    
    modal.innerHTML = `
        <div class="modal-container-admin">
            <div class="modal-header-admin">
                <h3>Editar ${item.nombre || item.titulo || item.nroMatricula || item.nombre_curso}</h3>
                <span class="material-icons" id="closeModalAdmin">close</span>
            </div>
            <div class="modal-body-admin">
                ${camposHTML}
            </div>
            <div class="modal-footer-admin">
                <button class="btn-modal-cancel" id="cancelModalAdmin">Cancelar</button>
                <button class="btn-modal-save" id="saveModalAdmin">Guardar cambios</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('closeModalAdmin')?.addEventListener('click', () => modal.remove());
    document.getElementById('cancelModalAdmin')?.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    
    document.getElementById('saveModalAdmin')?.addEventListener('click', () => {
        for (const campo of campos) {
            const input = document.getElementById(`edit_${campo.name}`);
            if (input) {
                editingItem[campo.name] = input.value;
            }
        }
        
        if (tab === 'matriculados') {
            const index = window.MATRICULADOS.findIndex(d => d.id === id);
            if (index !== -1) window.MATRICULADOS[index] = { ...window.MATRICULADOS[index], ...editingItem };
            window.PROFESIONALES_ACTIVOS = window.MATRICULADOS.filter(m => m.estado === "Activo").map(m => ({ id: m.id, nombre: m.nombre, especialidad: m.especialidad, localidad: m.localidad, foto: "" }));
        } else if (tab === 'noticias') {
            const index = window.DATOS_LOCALES.noticias.findIndex(d => d.id === id);
            if (index !== -1) window.DATOS_LOCALES.noticias[index] = { ...window.DATOS_LOCALES.noticias[index], ...editingItem };
        } else if (tab === 'autoridades') {
            const index = window.AUTORIDADES.findIndex(d => d.id === id);
            if (index !== -1) window.AUTORIDADES[index] = { ...window.AUTORIDADES[index], ...editingItem };
        } else if (tab === 'capacitaciones') {
            const index = window.DATOS_LOCALES.capacitaciones.findIndex(d => d.id === id);
            if (index !== -1) window.DATOS_LOCALES.capacitaciones[index] = { ...window.DATOS_LOCALES.capacitaciones[index], ...editingItem };
        } else if (tab === 'profesionales') {
            const index = window.PROFESIONALES_ACTIVOS.findIndex(d => d.id === id);
            if (index !== -1) window.PROFESIONALES_ACTIVOS[index] = { ...window.PROFESIONALES_ACTIVOS[index], ...editingItem };
        }
        
        if (window.playSound) window.playSound('success');
        modal.remove();
        
        if (currentTab === 'dashboard') {
            cargarDashboard();
        } else {
            cargarAdminList();
        }
        alert('Elemento actualizado correctamente');
    });
}

window.subirImagenEnModalCallback = function(inputId) {
    subirImagenEnModal((base64) => {
        document.getElementById(inputId).value = base64;
        const previewDiv = document.getElementById(`preview_${inputId}`);
        if (previewDiv) {
            previewDiv.innerHTML = `<img src="${base64}" class="preview-image">`;
        }
    });
};

// ========== FUNCIONES DEL CRUD ==========
function renderForm() {
    const formContainer = document.getElementById('formFields');
    const formTitle = document.getElementById('formTitle');
    
    if (currentTab === 'noticias') {
        formTitle.textContent = editingId ? 'Editar Noticia' : 'Agregar Noticia';
        formContainer.innerHTML = `<input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="contenido" placeholder="Contenido" rows="3" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea><input type="text" id="categoria" placeholder="Categoría" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><select id="destacada" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><option value="false">No destacada</option><option value="true">Destacada</option></select><input type="date" id="fecha" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'aranceles') {
        formTitle.textContent = editingId ? 'Editar Arancel' : 'Agregar Arancel';
        formContainer.innerHTML = `<input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="monto" placeholder="Monto" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="descripcion" placeholder="Descripción" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea>`;
    } else if (currentTab === 'requisitos') {
        formTitle.textContent = editingId ? 'Editar Requisito' : 'Agregar Requisito';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="descripcion_detallada" placeholder="Descripción" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea><input type="number" id="orden_prioridad" placeholder="Orden" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'capacitaciones') {
        formTitle.textContent = editingId ? 'Editar Capacitación' : 'Agregar Capacitación';
        formContainer.innerHTML = `<input type="text" id="nombre_curso" placeholder="Nombre del curso" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="date" id="fecha_inicio" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><select id="modalidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><option value="Presencial">Presencial</option><option value="Virtual">Virtual</option><option value="Híbrido">Híbrido</option></select><input type="text" id="lugar" placeholder="Lugar" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="arancel_curso" placeholder="Arancel" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="instructor" placeholder="Instructor" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="vacantes" placeholder="Vacantes" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'profesionales') {
        formTitle.textContent = editingId ? 'Editar Profesional' : 'Agregar Profesional';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="especialidad" placeholder="Especialidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="localidad" placeholder="Localidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'autoridades') {
        formTitle.textContent = editingId ? 'Editar Autoridad' : 'Agregar Autoridad';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="cargo" placeholder="Cargo" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="orden" placeholder="Orden" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="descripcion" placeholder="Descripción" rows="2" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea>`;
    } else if (currentTab === 'matriculados') {
        formTitle.textContent = editingId ? 'Editar Matriculado' : 'Agregar Matriculado';
        formContainer.innerHTML = `
            <input type="text" id="nroMatricula" placeholder="N° Matrícula (ej: TO-001)" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <input type="text" id="dni" placeholder="DNI" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <input type="date" id="fechaMatriculacion" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <input type="date" id="fechaVencimiento" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <select id="estado" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
                <option value="Activo">Activo</option>
                <option value="Por renovar">Por renovar</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Inactivo">Inactivo</option>
            </select>
            <input type="text" id="especialidad" placeholder="Especialidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <input type="text" id="localidad" placeholder="Localidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <input type="text" id="telefono" placeholder="Teléfono" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
            <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">
        `;
    }
    
    if (editingId) cargarDatosParaEditar();
}

function cargarDatosParaEditar() {
    let datos;
    if (currentTab === 'profesionales') datos = window.PROFESIONALES_ACTIVOS;
    else if (currentTab === 'autoridades') datos = window.AUTORIDADES;
    else if (currentTab === 'matriculados') datos = window.MATRICULADOS;
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
            localidad: document.getElementById('localidad').value,
            foto: ""
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
            foto: "",
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
    
    if (currentTab === 'matriculados') {
        const matriculados = window.MATRICULADOS;
        const newData = {
            nroMatricula: document.getElementById('nroMatricula').value,
            nombre: document.getElementById('nombre').value,
            dni: document.getElementById('dni').value,
            fechaMatriculacion: document.getElementById('fechaMatriculacion').value,
            fechaVencimiento: document.getElementById('fechaVencimiento').value,
            estado: document.getElementById('estado').value,
            especialidad: document.getElementById('especialidad').value,
            localidad: document.getElementById('localidad').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value
        };
        
        if (editingId) {
            const index = matriculados.findIndex(m => m.id === editingId);
            if (index !== -1) matriculados[index] = { ...matriculados[index], ...newData };
        } else {
            const newId = Math.max(...matriculados.map(m => m.id), 0) + 1;
            matriculados.push({ id: newId, ...newData });
        }
        
        window.PROFESIONALES_ACTIVOS = window.MATRICULADOS.filter(m => m.estado === "Activo").map(m => ({
            id: m.id, nombre: m.nombre, especialidad: m.especialidad, localidad: m.localidad, foto: ""
        }));
        
        if (window.playSound) window.playSound('success');
        editingId = null;
        renderForm();
        cargarAdminList();
        alert('Matriculado guardado correctamente');
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
    
    if (currentTab === 'matriculados') {
        const matriculados = window.MATRICULADOS || [];
        if (matriculados.length === 0) {
            container.innerHTML = '<p class="text-azulSec text-center py-4">No hay matriculados cargados.</p>';
            return;
        }
        
        const getEstadoColor = (estado) => {
            if (estado === 'Activo') return 'text-green-600 bg-green-100';
            if (estado === 'Por renovar') return 'text-yellow-600 bg-yellow-100';
            return 'text-gray-500 bg-gray-100';
        };
        
        container.innerHTML = `<div class="space-y-3">${matriculados.map(m => `
            <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-azulBorde">
                <div>
                    <p class="font-semibold text-azulMarino">${m.nroMatricula} - ${m.nombre}</p>
                    <p class="text-azulSec text-sm">DNI: ${m.dni} | ${m.especialidad} | ${m.localidad}</p>
                    <p class="text-xs mt-1">Vence: ${m.fechaVencimiento} | <span class="px-1 py-0.5 rounded-full text-xs ${getEstadoColor(m.estado)}">${m.estado}</span></p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="window.generarConstancia(${JSON.stringify(m).replace(/"/g, '&quot;')})" class="bg-azulPrimario text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 hover:bg-azulPrimario/80">
                        <span class="material-icons text-sm">picture_as_pdf</span> PDF
                    </button>
                    <button onclick="window.abrirModalEdicion('${currentTab}', ${m.id})" class="text-azulPrimario"><span class="material-icons text-sm">edit</span></button>
                    <button onclick="window.eliminarItem(${m.id})" class="text-red-500"><span class="material-icons text-sm">delete</span></button>
                </div>
            </div>`).join('')}</div>`;
        return;
    }
    
    if (currentTab === 'profesionales') {
        const profesionales = window.PROFESIONALES_ACTIVOS || [];
        if (profesionales.length === 0) {
            container.innerHTML = '<p class="text-azulSec text-center py-4">No hay profesionales cargados.</p>';
            return;
        }
        container.innerHTML = `<div class="space-y-3">${profesionales.map(p => `
            <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-azulBorde">
                <div><p class="font-semibold text-azulMarino">${p.nombre}</p><p class="text-azulSec text-sm">${p.especialidad} • ${p.localidad}</p><small class="text-azulSec">ID: ${p.id}</small></div>
                <div><button onclick="window.abrirModalEdicion('${currentTab}', ${p.id})" class="text-azulPrimario mr-3"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${p.id})" class="text-red-500"><span class="material-icons text-sm">delete</span></button></div>
            </div>`).join('')}</div>`;
        return;
    }
    
    if (currentTab === 'autoridades') {
        const autoridades = window.AUTORIDADES || [];
        autoridades.sort((a, b) => a.orden - b.orden);
        if (autoridades.length === 0) {
            container.innerHTML = '<p class="text-azulSec text-center py-4">No hay autoridades cargadas.</p>';
            return;
        }
        container.innerHTML = `<div class="space-y-3">${autoridades.map(a => `
            <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-azulBorde">
                <div><p class="font-semibold text-azulMarino">${a.nombre}</p><p class="text-azulSec text-sm">${a.cargo} • Orden: ${a.orden}</p><small class="text-azulSec">ID: ${a.id}</small></div>
                <div><button onclick="window.abrirModalEdicion('${currentTab}', ${a.id})" class="text-azulPrimario mr-3"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${a.id})" class="text-red-500"><span class="material-icons text-sm">delete</span></button></div>
            </div>`).join('')}</div>`;
        return;
    }
    
    const datos = window.DATOS_LOCALES[currentTab];
    if (!datos || datos.length === 0) {
        container.innerHTML = '<p class="text-azulSec text-center py-4">No hay elementos. Creá uno nuevo.</p>';
        return;
    }
    container.innerHTML = `<div class="space-y-3">${datos.map(item => `
        <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-azulBorde">
            <div><p class="font-semibold text-azulMarino">${item.titulo || item.nombre || item.nombre_curso}</p><small class="text-azulSec">ID: ${item.id}</small></div>
            <div><button onclick="window.abrirModalEdicion('${currentTab}', ${item.id})" class="text-azulPrimario mr-3"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${item.id})" class="text-red-500"><span class="material-icons text-sm">delete</span></button></div>
        </div>`).join('')}</div>`;
}

window.eliminarItem = (id) => {
    if (confirm('¿Eliminar este elemento permanentemente?')) {
        if (currentTab === 'profesionales') {
            const index = window.PROFESIONALES_ACTIVOS.findIndex(p => p.id === id);
            if (index !== -1) window.PROFESIONALES_ACTIVOS.splice(index, 1);
        } else if (currentTab === 'autoridades') {
            const index = window.AUTORIDADES.findIndex(a => a.id === id);
            if (index !== -1) window.AUTORIDADES.splice(index, 1);
        } else if (currentTab === 'matriculados') {
            const index = window.MATRICULADOS.findIndex(m => m.id === id);
            if (index !== -1) window.MATRICULADOS.splice(index, 1);
            window.PROFESIONALES_ACTIVOS = window.MATRICULADOS.filter(m => m.estado === "Activo").map(m => ({
                id: m.id, nombre: m.nombre, especialidad: m.especialidad, localidad: m.localidad, foto: ""
            }));
        } else {
            const datos = window.DATOS_LOCALES[currentTab];
            const index = datos.findIndex(d => d.id === id);
            if (index !== -1) datos.splice(index, 1);
        }
        if (window.playSound) window.playSound('success');
        if (editingId === id) { editingId = null; renderForm(); }
        if (currentTab === 'dashboard') cargarDashboard();
        else cargarAdminList();
        alert('Eliminado correctamente');
    }
};

function cargarAdminData(tab) {
    currentTab = tab;
    editingId = null;
    renderForm();
    cargarAdminList();
}

function mostrarTab(tab) {
    const dashboardDiv = document.getElementById('tab-dashboard');
    const formListDiv = document.getElementById('tab-form-list');
    
    if (tab === 'dashboard') {
        dashboardDiv.style.display = 'block';
        formListDiv.style.display = 'none';
        cargarDashboard();
    } else {
        dashboardDiv.style.display = 'none';
        formListDiv.style.display = 'block';
        cargarAdminData(tab);
    }
}

window.abrirModalEdicion = abrirModalEdicion;

document.getElementById('btnSave')?.addEventListener('click', guardarItem);

document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.admin-tab-btn').forEach(b => {
            b.classList.remove('border-azulPrimario', 'text-azulMarino');
            b.classList.add('text-azulSec');
        });
        btn.classList.add('border-azulPrimario', 'text-azulMarino');
        btn.classList.remove('text-azulSec');
        mostrarTab(tab);
        currentTab = tab;
    });
});

document.querySelectorAll('.admin-mobile-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        mostrarTab(tab);
        currentTab = tab;
        cerrarAdminMenu();
        document.querySelectorAll('.admin-tab-btn').forEach(b => {
            b.classList.remove('border-azulPrimario', 'text-azulMarino');
            b.classList.add('text-azulSec');
            if (b.getAttribute('data-tab') === tab) {
                b.classList.add('border-azulPrimario', 'text-azulMarino');
                b.classList.remove('text-azulSec');
            }
        });
    });
});

const adminMenuBtn = document.getElementById('menuAdminBtn');
const adminMobileMenu = document.getElementById('adminMobileMenu');
const closeAdminMenuBtn = document.getElementById('closeAdminMenuBtn');

function openAdminMenu() { if (adminMobileMenu) adminMobileMenu.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function cerrarAdminMenu() { if (adminMobileMenu) adminMobileMenu.classList.add('hidden'); document.body.style.overflow = ''; }

adminMenuBtn?.addEventListener('click', openAdminMenu);
closeAdminMenuBtn?.addEventListener('click', cerrarAdminMenu);
adminMobileMenu?.addEventListener('click', (e) => { if (e.target === adminMobileMenu) cerrarAdminMenu(); });

window.generarConstancia = function(matriculado) {
    alert('Función PDF - Se generará el documento');
};

initAdminPanel();