// admin.js - Panel con CRUD completo incluyendo Matriculados

let currentTab = 'noticias';
let editingId = null;

// ========== GENERAR CONSTANCIA PDF ==========
function generarConstanciaPDF(matriculado) {
    // Crear un elemento temporal para el contenido del PDF
    const contenido = `
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Constancia de Matrícula - ${matriculado.nroMatricula}</title>
            <style>
                body {
                    font-family: 'Times New Roman', Georgia, serif;
                    margin: 0;
                    padding: 40px;
                    background: white;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    border: 2px solid #2980B9;
                    padding: 30px;
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #2980B9;
                    padding-bottom: 20px;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #154360;
                }
                .subtitulo {
                    font-size: 14px;
                    color: #2E86C1;
                    margin-top: 5px;
                }
                .titulo-documento {
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    margin: 30px 0;
                    color: #154360;
                    text-transform: uppercase;
                }
                .contenido {
                    margin: 30px 0;
                    line-height: 1.8;
                }
                .datos {
                    background: #EAF2F8;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                }
                .firma {
                    margin-top: 50px;
                    text-align: center;
                }
                .firma-linea {
                    width: 250px;
                    margin: 20px auto 0;
                    border-top: 1px solid #000;
                    padding-top: 10px;
                }
                .footer {
                    text-align: center;
                    font-size: 11px;
                    color: #666;
                    margin-top: 40px;
                    border-top: 1px solid #ccc;
                    padding-top: 15px;
                }
                .estado-activo {
                    color: green;
                    font-weight: bold;
                }
                .estado-por-renovar {
                    color: orange;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">COTOLAR</div>
                    <div class="subtitulo">Colegio de Terapistas Ocupacionales de La Rioja</div>
                    <div class="subtitulo">Ley Provincial N° 5511 | Fundado 20/12/1990</div>
                </div>
                
                <div class="titulo-documento">CONSTANCIA DE MATRÍCULA</div>
                
                <div class="contenido">
                    <p>El Colegio de Terapistas Ocupacionales de La Rioja <strong>COTOLAR</strong>, conforme a las facultades otorgadas por la <strong>Ley Provincial N° 5511</strong>,</p>
                    
                    <p style="text-align: center; margin: 25px 0;"><strong>CERTIFICA</strong></p>
                    
                    <p>Que el/la profesional <strong>${matriculado.nombre}</strong>, DNI N° <strong>${matriculado.dni}</strong>, se encuentra debidamente matriculado/a en esta institución con el N° de Matrícula <strong>${matriculado.nroMatricula}</strong>.</p>
                    
                    <div class="datos">
                        <p><strong>📋 Datos del profesional:</strong></p>
                        <p>• Matrícula N°: ${matriculado.nroMatricula}</p>
                        <p>• Fecha de matriculación: ${new Date(matriculado.fechaMatriculacion).toLocaleDateString('es-AR')}</p>
                        <p>• Fecha de vencimiento: ${new Date(matriculado.fechaVencimiento).toLocaleDateString('es-AR')}</p>
                        <p>• Especialidad: ${matriculado.especialidad}</p>
                        <p>• Localidad: ${matriculado.localidad}</p>
                        <p>• Estado: <span class="${matriculado.estado === 'Activo' ? 'estado-activo' : 'estado-por-renovar'}">${matriculado.estado}</span></p>
                    </div>
                    
                    <p>El/la profesional se encuentra habilitado/a para ejercer la Terapia Ocupacional en todo el ámbito de la provincia de La Rioja, cumpliendo con las normativas vigentes y el Código de Ética.</p>
                    
                    <p>Se extiende la presente constancia a solicitud del interesado para los fines que estime convenientes.</p>
                </div>
                
                <div class="firma">
                    <div class="firma-linea">Lic. María José Fernández</div>
                    <div>PRESIDENTE</div>
                </div>
                
                <div class="footer">
                    <p>Av. Ramírez de Velazco 123 - La Rioja Capital</p>
                    <p>contacto@cotolar.org.ar | www.cotolar.org.ar</p>
                    <p>Documento emitido el ${new Date().toLocaleDateString('es-AR')} a las ${new Date().toLocaleTimeString('es-AR')}</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Crear blob y descargar
    const blob = new Blob([contenido], { type: 'application/pdf' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `Constancia_Matricula_${matriculado.nroMatricula}_${matriculado.nombre.replace(/\s/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    if (window.playSound) window.playSound('success');
    alert('Constancia generada correctamente');
}


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
        formContainer.innerHTML = `<input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="contenido" placeholder="Contenido" rows="3" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea><input type="text" id="categoria" placeholder="Categoría" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><select id="destacada" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><option value="false">No destacada</option><option value="true">Destacada</option></select><input type="date" id="fecha" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'aranceles') {
        formTitle.textContent = editingId ? '✏️ Editar Arancel' : '➕ Agregar Arancel';
        formContainer.innerHTML = `<input type="text" id="titulo" placeholder="Título" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="monto" placeholder="Monto" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="descripcion" placeholder="Descripción" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea>`;
    } else if (currentTab === 'requisitos') {
        formTitle.textContent = editingId ? '✏️ Editar Requisito' : '➕ Agregar Requisito';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="descripcion_detallada" placeholder="Descripción" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea><input type="number" id="orden_prioridad" placeholder="Orden" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'capacitaciones') {
        formTitle.textContent = editingId ? '✏️ Editar Capacitación' : '➕ Agregar Capacitación';
        formContainer.innerHTML = `<input type="text" id="nombre_curso" placeholder="Nombre del curso" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="date" id="fecha_inicio" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><select id="modalidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><option value="Presencial">Presencial</option><option value="Virtual">Virtual</option><option value="Híbrido">Híbrido</option></select><input type="text" id="lugar" placeholder="Lugar" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="arancel_curso" placeholder="Arancel" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="instructor" placeholder="Instructor" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="vacantes" placeholder="Vacantes" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'profesionales') {
        formTitle.textContent = editingId ? '✏️ Editar Profesional' : '➕ Agregar Profesional';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="especialidad" placeholder="Especialidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="localidad" placeholder="Localidad" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3">`;
    } else if (currentTab === 'autoridades') {
        formTitle.textContent = editingId ? '✏️ Editar Autoridad' : '➕ Agregar Autoridad';
        formContainer.innerHTML = `<input type="text" id="nombre" placeholder="Nombre completo" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="text" id="cargo" placeholder="Cargo" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><input type="number" id="orden" placeholder="Orden" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"><textarea id="descripcion" placeholder="Descripción" rows="2" class="w-full px-4 py-2 border border-azulBorde rounded-lg mb-3"></textarea>`;
    } else if (currentTab === 'matriculados') {
        formTitle.textContent = editingId ? '✏️ Editar Matriculado' : '➕ Agregar Matriculado';
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
        
        // Actualizar también PROFESIONALES_ACTIVOS para mantener consistencia
        window.PROFESIONALES_ACTIVOS = window.MATRICULADOS.filter(m => m.estado === "Activo").map(m => ({
            id: m.id,
            nombre: m.nombre,
            especialidad: m.especialidad,
            localidad: m.localidad,
            foto: ""
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
        if (estado === 'Suspendido') return 'text-red-600 bg-red-100';
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
                <button onclick="window.generarConstancia(${JSON.stringify(m).replace(/"/g, '&quot;')})" class="bg-green-600 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 hover:bg-green-700">
                    <span class="material-icons text-sm">picture_as_pdf</span> PDF
                </button>
                <button onclick="window.editarItem(${m.id})" class="text-azulPrimario"><span class="material-icons text-sm">edit</span></button>
                <button onclick="window.eliminarItem(${m.id})" class="text-red-500"><span class="material-icons text-sm">delete</span></button>
            </div>
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
                <div><button onclick="window.editarItem(${a.id})" class="text-azulPrimario mr-3"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${a.id})" class="text-red-500"><span class="material-icons text-sm">delete</span></button></div>
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
            <div><button onclick="window.editarItem(${item.id})" class="text-azulPrimario mr-3"><span class="material-icons text-sm">edit</span></button><button onclick="window.eliminarItem(${item.id})" class="text-red-500"><span class="material-icons text-sm">delete</span></button></div>
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
        } else if (currentTab === 'matriculados') {
            const index = window.MATRICULADOS.findIndex(m => m.id === id);
            if (index !== -1) window.MATRICULADOS.splice(index, 1);
            // Actualizar profesionales activos
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
            b.classList.remove('border-azulPrimario', 'text-azulMarino');
            b.classList.add('text-azulSec');
        });
        btn.classList.add('border-azulPrimario', 'text-azulMarino');
        btn.classList.remove('text-azulSec');
        cargarAdminData(tab);
    });
});

window.generarConstancia = generarConstanciaPDF;
checkAdminSession();