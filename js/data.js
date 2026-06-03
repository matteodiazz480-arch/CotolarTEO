// data.js - COTOLAR con soporte para imágenes

window.DATOS_LOCALES = {
    noticias: [
        { 
            id: 1, 
            titulo: "Jornada de Actualización en Neurorehabilitación 2025", 
            contenido: "El COTOLAR invita a todos los profesionales matriculados a participar de la jornada anual de actualización en técnicas de neurorehabilitación. Cupos limitados.\n\nLa jornada contará con expositores nacionales e internacionales, talleres prácticos y espacios de intercambio. Se entregarán certificados de asistencia.\n\n📅 Fecha: 10 de julio de 2025\n📍 Lugar: Centro de Convenciones, La Rioja Capital\n💰 Arancel: $12.000 para matriculados, $15.000 para no matriculados\n\n📌 Inscripciones abiertas hasta el 5 de julio.",
            destacada: true, 
            fecha: "2025-05-28",
            categoria: "Capacitación",
            imagen: ""
        },
        { 
            id: 2, 
            titulo: "Nuevo proceso de matriculación: requisitos actualizados", 
            contenido: "Se informa que a partir del 1° de junio entran en vigencia los nuevos requisitos para la matriculación inicial y la renovación anual de matrícula profesional.\n\n✅ Cambios principales:\n• Se incorpora curso de Ética Profesional obligatorio\n• Actualización de aranceles\n• Nuevos plazos de presentación\n\n📌 Para más información, comunicarse al 380 412-3456.",
            destacada: true, 
            fecha: "2025-05-15",
            categoria: "Institucional",
            imagen: ""
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
            imagen: "",
            contenido: "Jornada intensiva con expertos en neurorehabilitación. Se abordarán las últimas técnicas y avances en el tratamiento de pacientes con daño neurológico."
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
            contenido: "Curso teórico-práctico sobre intervenciones de Terapia Ocupacional en dispositivos de salud mental comunitarios."
        }
    ],
    
    normativa: {
        id: 1,
        codigoEtica: "CÓDIGO DE ÉTICA DE TERAPIA OCUPACIONAL DE LA REPÚBLICA ARGENTINA\n\nArtículo 1°: El Terapeuta Ocupacional tiene como objetivo principal la promoción, prevención, habilitación y rehabilitación de las personas con discapacidad o en situación de vulnerabilidad, respetando su dignidad y autonomía.\n\nArtículo 2°: Debe mantener una conducta ética y profesional en todo momento, actuando con honestidad, responsabilidad y respeto hacia sus pacientes, colegas y otros profesionales de la salud.\n\nArtículo 3°: La confidencialidad de la información del paciente es un deber fundamental, solo puede ser revelada con consentimiento expreso o por mandato judicial.\n\nArtículo 4°: El Terapeuta Ocupacional debe mantener actualizados sus conocimientos a través de la formación continua y capacitación permanente.\n\nArtículo 5°: Debe denunciar cualquier práctica profesional que vaya en contra de la ética o que ponga en riesgo la salud de los pacientes.\n\nArtículo 6°: Las relaciones con otros profesionales deben basarse en el respeto mutuo y la colaboración interdisciplinaria.\n\nArtículo 7°: Está prohibido utilizar la posición profesional para obtener beneficios personales indebidos.\n\nArtículo 8°: El incumplimiento de este código será sancionado según lo establecido por el Colegio de Terapia Ocupacional.",
        
        ley: "LEY NACIONAL DE TERAPIA OCUPACIONAL N° 27.123\n\nCAPÍTULO I - DISPOSICIONES GENERALES\n\nArtículo 1°: Declárese de interés nacional la formación, el desarrollo y la práctica profesional de la Terapia Ocupacional en todo el territorio de la República Argentina.\n\nArtículo 2°: La Terapia Ocupacional es una profesión del área de la salud que tiene por objeto el estudio, prevención, tratamiento y rehabilitación de personas con limitaciones en su desempeño ocupacional.\n\nCAPÍTULO II - DEL EJERCICIO PROFESIONAL\n\nArtículo 5°: Para ejercer la Terapia Ocupacional se requiere:\na) Poseer título de Terapeuta Ocupacional expedido por universidad reconocida.\nb) Estar matriculado en el colegio profesional correspondiente.\nc) Cumplir con los requisitos de formación continua establecidos.\n\nArtículo 8°: El ejercicio profesional incluye:\na) Evaluación y diagnóstico ocupacional.\nb) Diseño e implementación de planes de intervención.\nc) Asesoramiento y consultoría.\nd) Docencia e investigación en Terapia Ocupacional.\n\nCAPÍTULO III - DE LOS COLEGIOS PROFESIONALES\n\nArtículo 12°: Los colegios profesionales son los organismos encargados de:\na) Regular y fiscalizar el ejercicio profesional.\nb) Llevar el registro de matriculados.\nc) Promover la formación continua.\nd) Velar por el cumplimiento del código de ética.\n\nCAPÍTULO IV - SANCIONES\n\nArtículo 20°: Las sanciones aplicables por infracciones a la presente ley son:\na) Apercibimiento.\nb) Multa.\nc) Suspensión de la matrícula.\nd) Cancelación de la matrícula."
    }
};

// Autoridades ordenadas por jerarquía
window.AUTORIDADES = [
    { id: 1, nombre: "Lic. María José Fernández", cargo: "Presidente", orden: 1, foto: "", descripcion: "Presidente del COTOLAR período 2024-2028" },
    { id: 2, nombre: "Dr. Carlos Alberto Méndez", cargo: "Vicepresidente", orden: 2, foto: "", descripcion: "Vicepresidente del Colegio" },
    { id: 3, nombre: "Lic. Laura Beatriz González", cargo: "Secretaria General", orden: 3, foto: "", descripcion: "Secretaria General" },
    { id: 4, nombre: "Lic. Roberto Carlos Díaz", cargo: "Tesorero", orden: 4, foto: "", descripcion: "Tesorero del Colegio" },
    { id: 5, nombre: "Lic. Ana Silvia Romero", cargo: "Vocal Titular", orden: 5, foto: "", descripcion: "Vocal Titular" },
    { id: 6, nombre: "Dr. Pablo Ezequiel Sosa", cargo: "Vocal Suplente", orden: 6, foto: "", descripcion: "Vocal Suplente" },
    { id: 7, nombre: "Lic. Verónica del Carmen Luna", cargo: "Revisora de Cuentas", orden: 7, foto: "", descripcion: "Revisora de Cuentas" }
];

// Profesionales activos
window.PROFESIONALES_ACTIVOS = [
    { id: 1, nombre: "Lic. María Eugenia Pérez", especialidad: "Neurorehabilitación", localidad: "Capital", foto: "" },
    { id: 2, nombre: "Lic. Carlos Rodríguez", especialidad: "Pediatría", localidad: "Capital", foto: "" },
    { id: 3, nombre: "Dra. Laura Gómez", especialidad: "Salud Mental", localidad: "Chilecito", foto: "" },
    { id: 4, nombre: "Lic. Ana Martínez", especialidad: "Geriatría", localidad: "Capital", foto: "" },
    { id: 5, nombre: "Lic. Roberto Sánchez", especialidad: "Discapacidad", localidad: "Aimogasta", foto: "" },
    { id: 6, nombre: "Lic. Silvia López", especialidad: "Laboral", localidad: "Capital", foto: "" },
    { id: 7, nombre: "Lic. Fernando Díaz", especialidad: "Neurodesarrollo", localidad: "Castro Barros", foto: "" },
    { id: 8, nombre: "Lic. Marcela Romero", especialidad: "Comunitaria", localidad: "Chamical", foto: "" },
    { id: 9, nombre: "Lic. Pablo González", especialidad: "Educación", localidad: "Capital", foto: "" },
    { id: 10, nombre: "Lic. Verónica Fernández", especialidad: "Clínica", localidad: "Chepes", foto: "" },
    { id: 11, nombre: "Lic. Daniel Morales", especialidad: "Rehabilitación", localidad: "Villa Unión", foto: "" },
    { id: 12, nombre: "Lic. Carolina Flores", especialidad: "Infantil", localidad: "Capital", foto: "" }
];

// Usuarios válidos
window.USUARIOS_VALIDOS = [
    { email: "admin@cotolar.org", password: "admin123", nombre: "Administrador COTOLAR" }
];

window.verificarLogin = function(email, password) {
    return window.USUARIOS_VALIDOS.find(u => u.email === email && u.password === password);
};