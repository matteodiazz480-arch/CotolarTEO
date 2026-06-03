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
            imagen: ""
        },
        { 
            id: 2, 
            titulo: "Nuevo proceso de matriculación: requisitos actualizados", 
            contenido: "Se informa que a partir del 1° de junio entran en vigencia los nuevos requisitos para la matriculación inicial y la renovación anual de matrícula profesional.",
            destacada: true, 
            fecha: "2025-05-15",
            categoria: "Institucional",
            imagen: ""
        },
        { 
            id: 3, 
            titulo: "Convenio con la Universidad Nacional de La Rioja", 
            contenido: "El Colegio firmó un convenio de colaboración académica con la UNLaR para promover la formación continua y la inserción laboral de los nuevos egresados de Terapia Ocupacional.",
            destacada: false, 
            fecha: "2025-05-03",
            categoria: "Convenios",
            imagen: ""
        }
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
            imagen: "",
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
            imagen: "",
            contenido: "Curso teórico-práctico sobre intervenciones en salud mental."
        }
    ],
    
    normativa: {
        id: 1,
        codigoEtica: "CÓDIGO DE ÉTICA DE TERAPIA OCUPACIONAL DE LA REPÚBLICA ARGENTINA\n\nArtículo 1°: El Terapeuta Ocupacional tiene como objetivo principal la promoción, prevención, habilitación y rehabilitación de las personas con discapacidad o en situación de vulnerabilidad, respetando su dignidad y autonomía.\n\nArtículo 2°: Debe mantener una conducta ética y profesional en todo momento, actuando con honestidad, responsabilidad y respeto hacia sus pacientes, colegas y otros profesionales de la salud.\n\nArtículo 3°: La confidencialidad de la información del paciente es un deber fundamental, solo puede ser revelada con consentimiento expreso o por mandato judicial.",
        
        ley: "LEY NACIONAL DE TERAPIA OCUPACIONAL N° 27.123\n\nArtículo 1°: Declárese de interés nacional la formación, el desarrollo y la práctica profesional de la Terapia Ocupacional en todo el territorio de la República Argentina.\n\nArtículo 2°: La Terapia Ocupacional es una profesión del área de la salud que tiene por objeto el estudio, prevención, tratamiento y rehabilitación de personas con limitaciones en su desempeño ocupacional."
    }
};

// MATRICULADOS (nueva tabla para gestión)
window.MATRICULADOS = [
    { 
        id: 1, 
        nroMatricula: "TO-001", 
        nombre: "Lic. María Eugenia Pérez", 
        dni: "30123456", 
        fechaMatriculacion: "2023-01-15",
        fechaVencimiento: "2025-12-31",
        estado: "Activo",
        especialidad: "Neurorehabilitación",
        localidad: "Capital",
        telefono: "380-4123456",
        email: "maria.perez@cotolar.org"
    },
    { 
        id: 2, 
        nroMatricula: "TO-002", 
        nombre: "Lic. Carlos Rodríguez", 
        dni: "31234567", 
        fechaMatriculacion: "2023-03-20",
        fechaVencimiento: "2025-12-31",
        estado: "Activo",
        especialidad: "Pediatría",
        localidad: "Capital",
        telefono: "380-4234567",
        email: "carlos.rodriguez@cotolar.org"
    },
    { 
        id: 3, 
        nroMatricula: "TO-003", 
        nombre: "Dra. Laura Gómez", 
        dni: "32345678", 
        fechaMatriculacion: "2022-06-10",
        fechaVencimiento: "2025-06-30",
        estado: "Por renovar",
        especialidad: "Salud Mental",
        localidad: "Chilecito",
        telefono: "382-4345678",
        email: "laura.gomez@cotolar.org"
    },
    { 
        id: 4, 
        nroMatricula: "TO-004", 
        nombre: "Lic. Ana Martínez", 
        dni: "33456789", 
        fechaMatriculacion: "2024-01-05",
        fechaVencimiento: "2025-12-31",
        estado: "Activo",
        especialidad: "Geriatría",
        localidad: "Capital",
        telefono: "380-4456789",
        email: "ana.martinez@cotolar.org"
    },
    { 
        id: 5, 
        nroMatricula: "TO-005", 
        nombre: "Lic. Roberto Sánchez", 
        dni: "34567890", 
        fechaMatriculacion: "2024-02-15",
        fechaVencimiento: "2025-12-31",
        estado: "Activo",
        especialidad: "Discapacidad",
        localidad: "Aimogasta",
        telefono: "382-4567890",
        email: "roberto.sanchez@cotolar.org"
    }
];

// Autoridades
window.AUTORIDADES = [
    { id: 1, nombre: "Lic. María José Fernández", cargo: "Presidente", orden: 1, foto: "", descripcion: "Presidente del COTOLAR período 2024-2028" },
    { id: 2, nombre: "Dr. Carlos Alberto Méndez", cargo: "Vicepresidente", orden: 2, foto: "", descripcion: "Vicepresidente del Colegio" },
    { id: 3, nombre: "Lic. Laura Beatriz González", cargo: "Secretaria General", orden: 3, foto: "", descripcion: "Secretaria General" },
    { id: 4, nombre: "Lic. Roberto Carlos Díaz", cargo: "Tesorero", orden: 4, foto: "", descripcion: "Tesorero del Colegio" },
    { id: 5, nombre: "Lic. Ana Silvia Romero", cargo: "Vocal Titular", orden: 5, foto: "", descripcion: "Vocal Titular" },
    { id: 6, nombre: "Dr. Pablo Ezequiel Sosa", cargo: "Vocal Suplente", orden: 6, foto: "", descripcion: "Vocal Suplente" },
    { id: 7, nombre: "Lic. Verónica del Carmen Luna", cargo: "Revisora de Cuentas", orden: 7, foto: "", descripcion: "Revisora de Cuentas" }
];

// Profesionales activos (versión simplificada, mantiene compatibilidad)
window.PROFESIONALES_ACTIVOS = window.MATRICULADOS.filter(m => m.estado === "Activo").map(m => ({
    id: m.id,
    nombre: m.nombre,
    especialidad: m.especialidad,
    localidad: m.localidad,
    foto: ""
}));

// Usuarios válidos
window.USUARIOS_VALIDOS = [
    { email: "admin@cotolar.org", password: "admin123", nombre: "Administrador COTOLAR" }
];

window.verificarLogin = function(email, password) {
    return window.USUARIOS_VALIDOS.find(u => u.email === email && u.password === password);
};