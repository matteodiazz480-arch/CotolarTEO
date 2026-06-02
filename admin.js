// admin.js - Panel con login funcional y sonidos

let currentTab = 'noticias';
let editingId = null;

// ----- LOGIN -----
function checkAdminSession() {
    const session = localStorage.getItem('adminSession');
    if (session) {
        try {
            const user = JSON.parse(session);
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
            document.getElementById('adminNameDisplay').textContent = user.nombre;
            cargarAdminData('noticias');
        } catch(e) {
            localStorage.removeItem('adminSession');
        }
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

// ----- CRUD -----
function renderForm() {
    const formContainer = document.getElementById('formFields');
    const formTitle = document.getElementById('formTitle');
    
    if (currentTab === 'noticias') {
        formTitle.textContent = editingId ? '✏️ Editar Noticia' : '➕ Agregar Noticia';
        formContainer.innerHTML = `
            <input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <textarea id="contenido" placeholder="Contenido" rows="3" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3"></textarea>
            <input type="text" id="categoria" placeholder="Categoría" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <select id="destacada" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
                <option value="false">No destacada</option>
                <option value="true">Destacada</option>
            </select>
            <input type="date" id="fecha" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
        `;
    } else if (currentTab === 'aranceles') {
        formTitle.textContent = editingId ? '✏️ Editar Arancel' : '➕ Agregar Arancel';
        formContainer.innerHTML = `
            <input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <input type="number" id="monto" placeholder="Monto" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <textarea id="descripcion" placeholder="Descripción" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3"></textarea>
        `;
    } else if (currentTab === 'requisitos') {
        formTitle.textContent = editingId ? '✏️ Editar Requisito' : '➕ Agregar Requisito';
        formContainer.innerHTML = `
            <input type="text" id="nombre" placeholder="Nombre" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <textarea id="descripcion_detallada" placeholder="Descripción" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3"></textarea>
            <input type="number" id="orden_prioridad" placeholder="Orden" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
        `;
    } else if (currentTab === 'capacitaciones') {
        formTitle.textContent = editingId ? '✏️ Editar Capacitación' : '➕ Agregar Capacitación';
        formContainer.innerHTML = `
            <input type="text" id="nombre_curso" placeholder="Nombre del curso" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <input type="date" id="fecha_inicio" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <select id="modalidad" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Híbrido">Híbrido</option>
            </select>
            <input type="text" id="lugar" placeholder="Lugar" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <input type="number" id="arancel_curso" placeholder="Arancel" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <input type="text" id="instructor" placeholder="Instructor" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
            <input type="number" id="vacantes" placeholder="Vacantes" class="w-full px-4 py-2 border border-borderGray rounded-lg mb-3">
        `;
    }
    
    if (editingId) cargarDatosParaEditar();
}

function cargarDatosParaEditar() {
    const datos = window.DATOS_LOCALES[currentTab];
    const item = datos.find(d => d.id === editingId);
    if (item) {
        for (let key in item) {
            const input = document.getElementById(key);
            if (input) input.value = item[key];
        }
    }
}

function guardarItem() {
    const datos = window.DATOS_LOCALES[currentTab];
    const newData = {};
    const inputs = document.querySelectorAll('#formFields input, #formFields textarea, #formFields select');
    inputs.forEach(input => {
        if (input.id) {
            let value = input.value;
            if (input.id === 'monto' || input.id === 'arancel_curso' || input.id === 'orden_prioridad' || input.id === 'vacantes') {
                value = parseFloat(value);
            }
            newData[input.id] = value;
        }
    });
    
    if (editingId) {
        const index = datos.findIndex(d => d.id === editingId);
        if (index !== -1) {
            datos[index] = { ...datos[index], ...newData };
        }
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
    const datos = window.DATOS_LOCALES[currentTab];
    const container = document.getElementById('adminList');
    
    if (!datos || datos.length === 0) {
        container.innerHTML = '<p class="text-mediumGray text-center py-4">No hay elementos. Creá uno nuevo.</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="space-y-3">
            ${datos.map(item => `
                <div class="flex justify-between items-center p-3 bg-lightGray rounded-lg border border-borderGray">
                    <div>
                        <p class="font-semibold text-darkGray">${item.titulo || item.nombre || item.nombre_curso}</p>
                        <small class="text-mediumGray">ID: ${item.id}</small>
                    </div>
                    <div>
                        <button onclick="window.editarItem(${item.id})" class="text-gold mr-3 hover:text-gold/70">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="window.eliminarItem(${item.id})" class="text-primary hover:text-primaryDark">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

window.editarItem = (id) => {
    editingId = id;
    renderForm();
    if (window.playSound) window.playSound('click');
};

window.eliminarItem = (id) => {
    if (confirm('¿Eliminar este elemento permanentemente?')) {
        const datos = window.DATOS_LOCALES[currentTab];
        const index = datos.findIndex(d => d.id === id);
        if (index !== -1) datos.splice(index, 1);
        if (window.playSound) window.playSound('success');
        if (editingId === id) {
            editingId = null;
            renderForm();
        }
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
    btn.addEventListener('click', (e) => {
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.admin-tab-btn').forEach(b => {
            b.classList.remove('border-primary', 'text-darkGray');
            b.classList.add('text-mediumGray');
        });
        btn.classList.add('border-primary', 'text-darkGray');
        btn.classList.remove('text-mediumGray');
        cargarAdminData(tab);
    });
});

checkAdminSession();