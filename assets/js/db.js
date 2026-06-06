window.DB = (function () {
    const STORAGE_KEY = 'cotolar_db';
    let _data = null;

    function _defaultData() {
        return {
            users: [
                {
                    id: 1,
                    nombre: 'Administrador COTOLAR',
                    dni: '12345678',
                    email: 'admin@cotolar.org',
                    password: 'admin123',
                    rol: 'admin',
                    telefono: '3804123456',
                    fechaNacimiento: '1980-01-01',
                    localidad: 'La Rioja Capital',
                    foto: '',
                    fechaRegistro: new Date().toISOString()
                },
                {
                    id: 2,
                    nombre: 'Ana García',
                    dni: '23456789',
                    email: 'docente@cotolar.org',
                    password: 'docente123',
                    rol: 'docente',
                    telefono: '3804987654',
                    fechaNacimiento: '1990-05-15',
                    localidad: 'La Rioja Capital',
                    foto: '',
                    matricula: 'MAT-0042',
                    especialidad: 'Terapia Ocupacional Pediátrica',
                    estadoPago: 'al_dia',
                    fechaRegistro: new Date().toISOString()
                }
            ],
            pagos: [
                { id: 1, usuarioId: 2, concepto: 'Cuota anual 2024', monto: 15000, estado: 'pagado', fecha: '2024-03-01' },
                { id: 2, usuarioId: 2, concepto: 'Cuota anual 2025', monto: 18000, estado: 'pendiente', fecha: '2025-03-01' }
            ]
        };
    }

    function _save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(_data));
    }

    function _sanitize(user) {
        const { password, ...safe } = user;
        return safe;
    }

    function init() {
        const stored = localStorage.getItem(STORAGE_KEY);
        _data = stored ? JSON.parse(stored) : _defaultData();
        if (!stored) _save();
    }

    function registrar(datos) {
        if (!_data) init();
        if (_data.users.find(u => u.email === datos.email))
            return { ok: false, msg: 'El correo electrónico ya está registrado.' };
        if (_data.users.find(u => u.dni === datos.dni))
            return { ok: false, msg: 'El DNI ya está registrado.' };

        const usuario = {
            id: Date.now(),
            rol: 'docente',
            foto: '',
            matricula: '',
            especialidad: '',
            estadoPago: 'pendiente',
            fechaRegistro: new Date().toISOString(),
            ...datos
        };
        _data.users.push(usuario);
        _save();
        return { ok: true, user: _sanitize(usuario) };
    }

    function login(email, password) {
        if (!_data) init();
        const user = _data.users.find(u => u.email === email && u.password === password);
        if (!user) return { ok: false, msg: 'Correo o contraseña incorrectos.' };
        return { ok: true, user: _sanitize(user) };
    }

    function getUser(id) {
        if (!_data) init();
        const u = _data.users.find(u => u.id === id);
        return u ? _sanitize(u) : null;
    }

    function updateUser(id, datos) {
        if (!_data) init();
        const idx = _data.users.findIndex(u => u.id === id);
        if (idx === -1) return { ok: false, msg: 'Usuario no encontrado.' };
        const { id: _id, rol: _rol, ...safeData } = datos;
        _data.users[idx] = { ..._data.users[idx], ...safeData };
        _save();
        return { ok: true, user: _sanitize(_data.users[idx]) };
    }

    function getPagosByUser(usuarioId) {
        if (!_data) init();
        return (_data.pagos || []).filter(p => p.usuarioId === usuarioId);
    }

    function getAllUsers() {
        if (!_data) init();
        return _data.users.map(_sanitize);
    }

    init();
    return { registrar, login, getUser, updateUser, getPagosByUser, getAllUsers };
})();
