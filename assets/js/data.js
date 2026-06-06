// data.js - COTOLAR

window.DATOS_LOCALES = {
    noticias: [
        { 
            id: 1, 
            titulo: "Jornada de Actualización en Neurorehabilitación 2025", 
            contenido: "El COTOLAR invita a todos los profesionales matriculados a participar de la jornada anual de actualización en técnicas de neurorehabilitación. Cupos limitados.\n\nLa jornada contará con expositores nacionales e internacionales, talleres prácticos y espacios de intercambio.",
            destacada: true, 
            fecha: "2025-05-28",
            categoria: "Capacitación",
            imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.noticiaslosrios.cl%2Fwp-content%2Fuploads%2F2018%2F05%2FTerapia-Ocupacional.jpg&f=1&nofb=1&ipt=2808fe971ed05c70c1f824c688078489a226f158e9a6563a07b918b5a9b19556"
        },
        { 
            id: 2, 
            titulo: "Nuevo proceso de matriculación: requisitos actualizados", 
            contenido: "Se informa que a partir del 1° de junio entran en vigencia los nuevos requisitos para la matriculación inicial y la renovación anual de matrícula profesional.",
            destacada: true, 
            fecha: "2025-05-15",
            categoria: "Institucional",
            imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.eldia.com%2F102020%2F1602791168236.jpg&f=1&nofb=1&ipt=8f28efbbd8821d38bb089ad3260581daa5f1f819009eebb0445dd9162013f916"
        },
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
        { 
            id: 1, 
            nombre_curso: "Jornada de Actualización en Neurorehabilitación 2025", 
            modalidad: "Presencial", 
            arancel_curso: 12000, 
            instructor: "Lic. María Eugenia Pérez", 
            fecha_inicio: "2025-07-10",
            lugar: "Centro de Convenciones, La Rioja Capital",
            vacantes: 80,
            imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ellitoral.com%2Fimages%2F2025%2F09%2F10%2FuwJG0VxwR_870x580__1.jpg&f=1&nofb=1&ipt=f4ca5cf8591622cacb55932d98c6b9338d756de04a39b69838b20d96172ad065",
            contenido: "Jornada intensiva con expertos en neurorehabilitación."
        },
        { 
            id: 2, 
            nombre_curso: "Terapia Ocupacional en Salud Mental Comunitaria", 
            modalidad: "Virtual", 
            arancel_curso: 8500, 
            instructor: "Dra. Laura Gómez", 
            fecha_inicio: "2025-08-05",
            lugar: "Plataforma Zoom",
            vacantes: 50,
            imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmision.uandes.cl%2Fimages%2Fdefault-source%2Fimagenes-noticias%2Fnoticia-terapia-ocupacional-uandes.png%3Fsfvrsn%3Df421269e_3&f=1&nofb=1&ipt=fca17f0755df5c39edb27667b963a55b7a0685389497bc3de6de623445b82970",
            contenido: "Curso teórico-práctico sobre intervenciones en salud mental."
        }
    ],
    
    normativa: {
        id: 1,
        codigoEtica: "CÓDIGO DE ÉTICA DE TERAPIA OCUPACIONAL DE LA REPÚBLICA ARGENTINA\n\nArtículo 1°: El Terapeuta Ocupacional tiene como objetivo principal la promoción, prevención, habilitación y rehabilitación de las personas con discapacidad o en situación de vulnerabilidad, respetando su dignidad y autonomía.",
        ley: "LEY NACIONAL DE TERAPIA OCUPACIONAL N° 27.123\n\nArtículo 1°: Declárese de interés nacional la formación, el desarrollo y la práctica profesional de la Terapia Ocupacional en todo el territorio de la República Argentina."
    }
};

// MATRICULADOS
window.MATRICULADOS = [
    { id: 1, nroMatricula: "TO-001", nombre: "Lic. María Eugenia Pérez", dni: "30123456", fechaMatriculacion: "2023-01-15", fechaVencimiento: "2025-12-31", estado: "Activo", especialidad: "Neurorehabilitación", localidad: "Capital", telefono: "380-4123456", email: "maria.perez@cotolar.org" },
    { id: 2, nroMatricula: "TO-002", nombre: "Lic. Carlos Rodríguez", dni: "31234567", fechaMatriculacion: "2023-03-20", fechaVencimiento: "2025-12-31", estado: "Activo", especialidad: "Pediatría", localidad: "Capital", telefono: "380-4234567", email: "carlos.rodriguez@cotolar.org" },
    { id: 3, nroMatricula: "TO-003", nombre: "Dra. Laura Gómez", dni: "32345678", fechaMatriculacion: "2022-06-10", fechaVencimiento: "2025-06-30", estado: "Por renovar", especialidad: "Salud Mental", localidad: "Chilecito", telefono: "382-4345678", email: "laura.gomez@cotolar.org" },
    { id: 4, nroMatricula: "TO-004", nombre: "Lic. Ana Martínez", dni: "33456789", fechaMatriculacion: "2024-01-05", fechaVencimiento: "2025-12-31", estado: "Activo", especialidad: "Geriatría", localidad: "Capital", telefono: "380-4456789", email: "ana.martinez@cotolar.org" },
    { id: 5, nroMatricula: "TO-005", nombre: "Lic. Roberto Sánchez", dni: "34567890", fechaMatriculacion: "2024-02-15", fechaVencimiento: "2025-12-31", estado: "Activo", especialidad: "Discapacidad", localidad: "Aimogasta", telefono: "382-4567890", email: "roberto.sanchez@cotolar.org" }
];

// AUTORIDADES con fotos de ejemplo
window.AUTORIDADES = [
    { id: 1, nombre: "Lic. María José Fernández", cargo: "Presidente", orden: 1, foto: "https://randomuser.me/api/portraits/women/68.jpg", descripcion: "Presidente del COTOLAR período 2024-2028" },
    { id: 2, nombre: "Dr. Carlos Alberto Méndez", cargo: "Vicepresidente", orden: 2, foto: "https://randomuser.me/api/portraits/men/32.jpg", descripcion: "Vicepresidente del Colegio" },
    { id: 3, nombre: "Lic. Laura Beatriz González", cargo: "Secretaria General", orden: 3, foto: "https://randomuser.me/api/portraits/women/45.jpg", descripcion: "Secretaria General" },
    { id: 4, nombre: "Lic. Roberto Carlos Díaz", cargo: "Tesorero", orden: 4, foto: "https://randomuser.me/api/portraits/men/52.jpg", descripcion: "Tesorero del Colegio" },
    { id: 5, nombre: "Lic. Ana Silvia Romero", cargo: "Vocal Titular", orden: 5, foto: "https://randomuser.me/api/portraits/women/23.jpg", descripcion: "Vocal Titular" },
    { id: 6, nombre: "Dr. Pablo Ezequiel Sosa", cargo: "Vocal Suplente", orden: 6, foto: "https://randomuser.me/api/portraits/men/41.jpg", descripcion: "Vocal Suplente" },
    { id: 7, nombre: "Lic. Verónica del Carmen Luna", cargo: "Revisora de Cuentas", orden: 7, foto: "https://randomuser.me/api/portraits/women/89.jpg", descripcion: "Revisora de Cuentas" }
];

// PROFESIONALES ACTIVOS con fotos
window.PROFESIONALES_ACTIVOS = [
    { id: 1, nombre: "Lic. María Eugenia Pérez", especialidad: "Neurorehabilitación", localidad: "Capital", foto: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, nombre: "Lic. Carlos Rodríguez", especialidad: "Pediatría", localidad: "Capital", foto: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 3, nombre: "Dra. Laura Gómez", especialidad: "Salud Mental", localidad: "Chilecito", foto: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, nombre: "Lic. Ana Martínez", especialidad: "Geriatría", localidad: "Capital", foto: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, nombre: "Lic. Roberto Sánchez", especialidad: "Discapacidad", localidad: "Aimogasta", foto: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 6, nombre: "Lic. Silvia López", especialidad: "Laboral", localidad: "Capital", foto: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 7, nombre: "Lic. Fernando Díaz", especialidad: "Neurodesarrollo", localidad: "Castro Barros", foto: "https://randomuser.me/api/portraits/men/7.jpg" },
    { id: 8, nombre: "Lic. Marcela Romero", especialidad: "Comunitaria", localidad: "Chamical", foto: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: 9, nombre: "Lic. Pablo González", especialidad: "Educación", localidad: "Capital", foto: "https://randomuser.me/api/portraits/men/9.jpg" },
    { id: 10, nombre: "Lic. Verónica Fernández", especialidad: "Clínica", localidad: "Chepes", foto: "https://randomuser.me/api/portraits/women/10.jpg" },
    { id: 11, nombre: "Lic. Daniel Morales", especialidad: "Rehabilitación", localidad: "Villa Unión", foto: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 12, nombre: "Lic. Carolina Flores", especialidad: "Infantil", localidad: "Capital", foto: "https://randomuser.me/api/portraits/women/12.jpg" }
];

window.USUARIOS_VALIDOS = [
    { email: "admin@cotolar.org", password: "admin123", nombre: "Administrador COTOLAR" }
];

window.verificarLogin = function(email, password) {
    return window.USUARIOS_VALIDOS.find(u => u.email === email && u.password === password);
};