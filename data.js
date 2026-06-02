// data.js - COTOLAR

window.DATOS_LOCALES = {
    noticias: [
        { id: 1, titulo: "Jornada de Actualización en Neurorehabilitación 2025", contenido: "El COTOLAR invita a todos los profesionales matriculados a participar de la jornada anual de actualización en técnicas de neurorehabilitación. Cupos limitados.", destacada: true, fecha: "2025-05-28", categoria: "Capacitación" },
        { id: 2, titulo: "Nuevo proceso de matriculación: requisitos actualizados", contenido: "Se informa que a partir del 1° de junio entran en vigencia los nuevos requisitos para la matriculación inicial y la renovación anual de matrícula profesional.", destacada: true, fecha: "2025-05-15", categoria: "Institucional" },
        { id: 3, titulo: "Convenio con la Universidad Nacional de La Rioja", contenido: "El Colegio firmó un convenio de colaboración académica con la UNLaR para promover la formación continua y la inserción laboral de los nuevos egresados de Terapia Ocupacional.", destacada: false, fecha: "2025-05-03", categoria: "Convenios" }
    ],
    aranceles: [
        { id: 1, titulo: "Matrícula Inicial", monto: 15000, descripcion: "Primera inscripción al colegio profesional" },
        { id: 2, titulo: "Renovación Anual", monto: 8500, descripcion: "Mantenimiento de matrícula - pago anual" },
        { id: 3, titulo: "Certificado de Buena Conducta", monto: 2000, descripcion: "Para presentación ante otras instituciones" }
    ],
    requisitos: [
        { id: 1, nombre: "Título de Terapia Ocupacional", descripcion_detallada: "Original y copia autenticada del título universitario (expedido por universidad reconocida)", orden_prioridad: 1 },
        { id: 2, nombre: "DNI actualizado", descripcion_detallada: "Frente y dorso. Si es extranjero, DNI vigente o pasaporte con residencia.", orden_prioridad: 2 },
        { id: 3, nombre: "Foto 4x4 reciente", descripcion_detallada: "Fondo blanco, actualizada en los últimos 6 meses.", orden_prioridad: 3 },
        { id: 4, nombre: "Comprobante de pago", descripcion_detallada: "Del arancel de matriculación correspondiente.", orden_prioridad: 4 },
        { id: 5, nombre: "Curso de Ética Profesional", descripcion_detallada: "Certificado del curso obligatorio dictado por el colegio (válido por 2 años)", orden_prioridad: 5 }
    ],
    capacitaciones: [
        { id: 1, nombre_curso: "Jornada de Actualización en Neurorehabilitación 2025", modalidad: "Presencial", arancel_curso: 12000, instructor: "Lic. María Eugenia Pérez", fecha_inicio: "2025-07-10", lugar: "Centro de Convenciones, La Rioja Capital", vacantes: 80 },
        { id: 2, nombre_curso: "Terapia Ocupacional en Salud Mental Comunitaria", modalidad: "Virtual", arancel_curso: 8500, instructor: "Dra. Laura Gómez", fecha_inicio: "2025-08-05", lugar: "Plataforma Zoom", vacantes: 50 }
    ]
};

window.PROFESIONALES_ACTIVOS = [
    { id: 1, nombre: "Lic. María Eugenia Pérez", especialidad: "Neurorehabilitación", localidad: "Capital" },
    { id: 2, nombre: "Lic. Carlos Rodríguez", especialidad: "Pediatría", localidad: "Capital" },
    { id: 3, nombre: "Dra. Laura Gómez", especialidad: "Salud Mental", localidad: "Chilecito" },
    { id: 4, nombre: "Lic. Ana Martínez", especialidad: "Geriatría", localidad: "Capital" },
    { id: 5, nombre: "Lic. Roberto Sánchez", especialidad: "Discapacidad", localidad: "Aimogasta" },
    { id: 6, nombre: "Lic. Silvia López", especialidad: "Laboral", localidad: "Capital" },
    { id: 7, nombre: "Lic. Fernando Díaz", especialidad: "Neurodesarrollo", localidad: "Castro Barros" },
    { id: 8, nombre: "Lic. Marcela Romero", especialidad: "Comunitaria", localidad: "Chamical" },
    { id: 9, nombre: "Lic. Pablo González", especialidad: "Educación", localidad: "Capital" },
    { id: 10, nombre: "Lic. Verónica Fernández", especialidad: "Clínica", localidad: "Chepes" },
    { id: 11, nombre: "Lic. Daniel Morales", especialidad: "Rehabilitación", localidad: "Villa Unión" },
    { id: 12, nombre: "Lic. Carolina Flores", especialidad: "Infantil", localidad: "Capital" }
];

window.USUARIOS_VALIDOS = [
    { email: "admin@cotolar.org", password: "admin123", nombre: "Administrador COTOLAR" }
];

window.verificarLogin = function(email, password) {
    return window.USUARIOS_VALIDOS.find(u => u.email === email && u.password === password);
};