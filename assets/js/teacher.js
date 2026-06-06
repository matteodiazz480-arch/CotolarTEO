(function () {
    const user = Auth.requireAuth(['docente']);
    if (!user) return;

    const currentUserId = user.id;

    function playSound(name) {
        const el = document.getElementById('sound-' + name);
        if (el) { el.currentTime = 0; el.play().catch(() => {}); }
    }

    const headerNombre = document.getElementById('headerNombre');
    if (headerNombre) headerNombre.textContent = user.nombre;

    document.getElementById('btnLogout').addEventListener('click', () => {
        playSound('click');
        Auth.logout();
    });

    // ===== TABS =====
    const tabs = document.querySelectorAll('.teacher-tab');
    const contents = document.querySelectorAll('.teacher-content');

    function activateTab(targetId) {
        tabs.forEach(t => {
            t.classList.remove('bg-azulPrimario', 'text-white');
            t.classList.add('text-azulSec');
        });
        contents.forEach(c => c.classList.add('hidden'));
        const activeTab = document.querySelector(`.teacher-tab[data-tab="${targetId}"]`);
        if (activeTab) {
            activeTab.classList.add('bg-azulPrimario', 'text-white');
            activeTab.classList.remove('text-azulSec');
        }
        const content = document.getElementById('tab-' + targetId);
        if (content) content.classList.remove('hidden');
        if (targetId === 'pagos') loadPagos();
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activateTab(tab.dataset.tab);
            playSound('click');
        });
    });

    activateTab('perfil');

    // ===== PERFIL =====
    function formatDate(dateStr) {
        if (!dateStr) return '—';
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
    }

    function renderDatoItem(label, value) {
        return `<div>
            <p class="text-azulSec text-xs font-medium uppercase tracking-wide">${label}</p>
            <p class="text-azulMarino font-semibold text-sm mt-0.5">${value || '—'}</p>
        </div>`;
    }

    function loadProfile() {
        const fullUser = DB.getUser(currentUserId) || user;

        const photoEl = document.getElementById('profilePhoto');
        if (fullUser.foto) photoEl.src = fullUser.foto;
        syncDeleteBtn(!!fullUser.foto);

        document.getElementById('perfilNombre').textContent = fullUser.nombre;
        document.getElementById('perfilEspecialidad').textContent = fullUser.especialidad || 'Terapia Ocupacional';

        const matriculaEl = document.getElementById('perfilMatricula').querySelector('span');
        matriculaEl.textContent = fullUser.matricula ? fullUser.matricula : 'Sin matrícula asignada';

        const estadoEl = document.getElementById('estadoPagoChip');
        if (fullUser.estadoPago === 'al_dia') {
            estadoEl.className = 'mt-2 rounded-full px-4 py-1 text-sm font-semibold inline-block bg-green-100 text-green-700';
            estadoEl.textContent = '✓ Pagos al día';
        } else {
            estadoEl.className = 'mt-2 rounded-full px-4 py-1 text-sm font-semibold inline-block bg-amber-100 text-amber-700';
            estadoEl.textContent = '⚠ Pago pendiente';
        }

        document.getElementById('datosPersonalesList').innerHTML =
            renderDatoItem('Nombre completo', fullUser.nombre) +
            renderDatoItem('DNI', fullUser.dni) +
            renderDatoItem('Fecha de nacimiento', formatDate(fullUser.fechaNacimiento)) +
            renderDatoItem('Localidad', fullUser.localidad);

        document.getElementById('datosContactoList').innerHTML =
            renderDatoItem('Correo electrónico', fullUser.email) +
            renderDatoItem('Teléfono', fullUser.telefono);

        document.getElementById('editNombre').value = fullUser.nombre || '';
        document.getElementById('editTelefono').value = fullUser.telefono || '';
        document.getElementById('editLocalidad').value = fullUser.localidad || '';
        document.getElementById('editEspecialidad').value = fullUser.especialidad || '';
        document.getElementById('editFechaNac').value = fullUser.fechaNacimiento || '';
    }

    // ===== FOTO DE PERFIL =====
    const DEFAULT_PHOTO = '/assets/icons/icon.svg';

    function syncDeleteBtn(hasFoto) {
        const btn = document.getElementById('btnDeletePhoto');
        if (hasFoto) btn.classList.remove('hidden');
        else btn.classList.add('hidden');
    }

    document.getElementById('btnChangePhoto').addEventListener('click', () => {
        document.getElementById('photoInput').click();
    });

    document.getElementById('btnDeletePhoto').addEventListener('click', () => {
        if (!confirm('¿Querés eliminar tu foto de perfil?')) return;
        DB.updateUser(currentUserId, { foto: '' });
        Auth.updateSession({ foto: '' });
        document.getElementById('profilePhoto').src = DEFAULT_PHOTO;
        syncDeleteBtn(false);
        playSound('click');
    });

    document.getElementById('photoInput').addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { alert('Seleccioná una imagen válida.'); return; }
        if (file.size > 3 * 1024 * 1024) { alert('La imagen no puede superar 3 MB.'); return; }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            document.getElementById('profilePhoto').src = base64;
            DB.updateUser(currentUserId, { foto: base64 });
            Auth.updateSession({ foto: base64 });
            syncDeleteBtn(true);
            playSound('success');
        };
        reader.readAsDataURL(file);
        this.value = '';
    });

    // ===== GUARDAR DATOS =====
    document.getElementById('btnGuardar').addEventListener('click', () => {
        const nombre = document.getElementById('editNombre').value.trim();
        const telefono = document.getElementById('editTelefono').value.trim();
        const localidad = document.getElementById('editLocalidad').value.trim();
        const especialidad = document.getElementById('editEspecialidad').value.trim();
        const fechaNacimiento = document.getElementById('editFechaNac').value;
        const password = document.getElementById('editPassword').value;
        const passwordConfirm = document.getElementById('editPasswordConfirm').value;

        const alertEl = document.getElementById('editAlert');

        function showAlert(msg, type) {
            alertEl.className = `mb-4 rounded-xl px-4 py-3 text-sm font-medium ${type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'}`;
            alertEl.textContent = msg;
            alertEl.classList.remove('hidden');
        }

        if (!nombre) { showAlert('El nombre es obligatorio.', 'error'); return; }
        if (password && password.length < 6) { showAlert('La contraseña debe tener al menos 6 caracteres.', 'error'); return; }
        if (password && password !== passwordConfirm) { showAlert('Las contraseñas no coinciden.', 'error'); return; }

        const updates = { nombre, telefono, localidad, especialidad, fechaNacimiento };
        if (password) updates.password = password;

        const result = DB.updateUser(currentUserId, updates);
        if (result.ok) {
            Auth.updateSession(updates);
            if (headerNombre) headerNombre.textContent = nombre;
            document.getElementById('editPassword').value = '';
            document.getElementById('editPasswordConfirm').value = '';
            showAlert('✓ Datos actualizados correctamente.', 'success');
            setTimeout(() => alertEl.classList.add('hidden'), 3000);
            loadProfile();
            playSound('success');
        }
    });

    // ===== PAGOS =====
    const MP_LINK = 'https://mpago.la/1dFtWRq';

    function loadPagos() {
        const fullUser = DB.getUser(currentUserId) || user;
        const pagos    = DB.getPagosByUser(currentUserId);
        const estadoCard = document.getElementById('estadoCuotaCard');
        const container  = document.getElementById('pagosContainer');

        // ── Tarjeta de estado actual ──
        const pendiente = pagos.find(p => p.estado !== 'pagado');
        const alDia     = fullUser.estadoPago === 'al_dia';

        const chipClass = alDia
            ? 'bg-green-100 text-green-700'
            : 'bg-amber-100 text-amber-700';
        const chipText  = alDia ? '✓ Al día' : '⚠ Pago pendiente';

        const detallePendiente = pendiente
            ? `<p class="text-azulMarino text-sm mt-1">Concepto: <strong>${pendiente.concepto}</strong></p>
               <p class="text-azulMarino text-sm">Monto: <strong>$${pendiente.monto.toLocaleString('es-AR')}</strong> — Vence: <strong>${formatDate(pendiente.fecha)}</strong></p>`
            : `<p class="text-green-600 text-sm font-medium mt-1">Tus pagos están al día. ¡Gracias!</p>`;

        const notaMp = !alDia
            ? `<p class="text-xs text-azulSec mt-4">Al hacer clic en "Pagar Cuota" serás redirigido a <strong>Mercado Pago</strong> de forma segura. Una vez confirmado el pago, avisá al administrador para actualizar tu estado.</p>`
            : '';

        estadoCard.innerHTML = `
            <h2 class="text-xl font-bold text-azulMarino mb-4 flex items-center gap-2">
                <span class="material-icons text-azulPrimario">payments</span> Estado de tu cuota
            </h2>
            <div class="flex flex-col sm:flex-row sm:items-start gap-5">
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-azulSec font-medium">Estado:</span>
                        <span class="px-3 py-1 rounded-full text-sm font-semibold ${chipClass}">${chipText}</span>
                    </div>
                    ${detallePendiente}
                </div>
                <a href="${MP_LINK}" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center justify-center gap-2 bg-azulPrimario text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-azulPrimario/80 active:scale-95 transition-all text-base whitespace-nowrap shrink-0">
                    <span class="material-icons">credit_card</span>
                    Pagar Cuota
                </a>
            </div>
            ${notaMp}
        `;

        // ── Historial ──
        if (!pagos.length) {
            container.innerHTML = '<p class="text-azulSec text-center py-8">No hay registros de pagos.</p>';
            return;
        }

        container.innerHTML = pagos.map(p => {
            const ok = p.estado === 'pagado';
            return `<div class="pago-card ${ok ? 'pagado' : 'pendiente'}">
                <div>
                    <p class="font-semibold text-azulMarino">${p.concepto}</p>
                    <p class="text-sm text-azulSec mt-0.5">Vencimiento: ${formatDate(p.fecha)}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-azulMarino">$${p.monto.toLocaleString('es-AR')}</p>
                    <span class="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${ok ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">
                        ${ok ? '✓ Pagado' : '⚠ Pendiente'}
                    </span>
                </div>
            </div>`;
        }).join('');
    }

    loadProfile();
})();
