// chat.js - Asistente COTOLAR - Respuestas completas para todo

function inicializarChat() {
    const bubble = document.getElementById('chatBubble');
    const panel = document.getElementById('chatPanel');
    const closeBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendChatBtn');
    const input = document.getElementById('chatInput');
    
    if (!bubble || !panel) return;
    
    const toggleChat = () => {
        panel.classList.toggle('open');
        if (window.playSound) window.playSound('click');
    };
    
    bubble.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', toggleChat);
    
    const sendMessage = async (question) => {
        if (!question.trim()) return;
        addMessage(question, 'user');
        if (window.playSound) window.playSound('click');
        input.value = '';
        
        showTypingIndicator();
        setTimeout(async () => {
            const respuesta = await buscarRespuesta(question);
            removeTypingIndicator();
            addMessage(respuesta, 'bot');
            if (window.playSound) window.playSound('notification');
        }, 500);
    };
    
    if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(input.value));
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(input.value); });
    
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => { sendMessage(btn.getAttribute('data-question')); });
    });
}

function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<span>●</span><span>●</span><span>●</span>';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function addMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

async function buscarRespuesta(pregunta) {
    const p = pregunta.toLowerCase().trim();
    const datos = window.DATOS_LOCALES;
    
    // ========== SALUDOS ==========
    if (p.match(/^(hola|buenas|holi|hello|hey|que tal|como estas|saludos|buen día|buenas tardes|buenas noches)/i)) {
        return "👋 ¡Hola! Soy el asistente virtual del COTOLAR. ¿En qué puedo ayudarte hoy? Podés preguntarme sobre matriculación, aranceles, requisitos, capacitaciones o contacto.";
    }
    
    // ========== AGRADECIMIENTOS ==========
    if (p.match(/^(gracias|thank you|merci|graciass|muchas gracias|gracias por|te agradezco)/i)) {
        return "😊 ¡De nada! Para eso estoy. Si necesitás algo más, estoy aquí para ayudarte. ¡Que tengas un buen día!";
    }
    
    // ========== DESPEDIDAS ==========
    if (p.match(/^(chau|adiós|bye|nos vemos|hasta luego|hasta pronto|me voy|saludos)/i)) {
        return "👋 ¡Hasta luego! Cualquier consulta, volvé a escribirme. ¡Que tengas un excelente día!";
    }
    
    // ========== PRESENTACIÓN ==========
    if (p.match(/^(quien eres|que eres|quien sos|qué eres|presentate|decime quien sos)/i)) {
        return "🤖 Soy el asistente virtual del COTOLAR, el Colegio de Terapia Ocupacional de La Rioja. Fui creado para ayudarte con información sobre matriculación, trámites, aranceles, capacitaciones y más. ¿En qué puedo ayudarte?";
    }
    
    // ========== MATRICULACIÓN ==========
    if (p.includes('matrícula') || p.includes('matricular') || p.includes('inscripción') || p.includes('como me matricula') || p.includes('como me inscribo') || p.includes('quiero matricularme')) {
        return "📝 Para matricularte en COTOLAR necesitás:\n\n✅ Título de Terapia Ocupacional (copia autenticada)\n✅ DNI actualizado\n✅ Foto 4x4 fondo blanco\n✅ Comprobante de pago del arancel\n✅ Curso de Ética Profesional (válido por 2 años)\n\n📞 ¿Más dudas? Contactanos al 380 412-3456 o escribí a info@cotolar.org";
    }
    
    // ========== ARANCELES / COSTOS ==========
    if (p.includes('arancel') || p.includes('costo') || p.includes('precio') || p.includes('cuanto cuesta') || p.includes('valor') || p.includes('costos') || p.includes('aranceles')) {
        return "💰 Aranceles COTOLAR 2025:\n\n• Matrícula Inicial: $15.000\n• Renovación Anual: $8.500\n• Certificado de Buena Conducta: $2.000\n• Constancia de Matrícula: $1.200\n\n📅 Los precios pueden actualizarse cada año. Para información actualizada, contactanos al 380 412-3456.";
    }
    
    // ========== REQUISITOS ==========
    if (p.includes('requisitos') || p.includes('documentación') || p.includes('que necesito') || p.includes('que papeles') || p.includes('que documentos') || p.includes('necesito para matricularme')) {
        return "📋 Requisitos para matriculación en COTOLAR:\n\n1️⃣ Título de Terapia Ocupacional (original y copia autenticada)\n2️⃣ DNI actualizado (frente y dorso)\n3️⃣ Foto 4x4 fondo blanco (últimos 6 meses)\n4️⃣ Comprobante de pago del arancel\n5️⃣ Certificado del Curso de Ética Profesional\n\n📌 Todos los documentos deben presentarse en la sede del colegio en horario de atención.";
    }
    
    // ========== CAPACITACIONES / CURSOS ==========
    if (p.includes('capacitación') || p.includes('curso') || p.includes('jornada') || p.includes('próximas') || p.includes('talleres') || p.includes('formación') || p.includes('actualización')) {
        const cursos = datos.capacitaciones;
        if (cursos && cursos.length > 0) {
            let respuesta = "🎓 Próximas capacitaciones del COTOLAR:\n\n";
            cursos.forEach(c => { 
                respuesta += `📌 ${c.nombre_curso}\n   📅 ${new Date(c.fecha_inicio).toLocaleDateString('es-AR')} | ${c.modalidad} | $${c.arancel_curso.toLocaleString()}\n   👨‍🏫 ${c.instructor}\n\n`; 
            });
            respuesta += "📞 Para inscribirte, contactanos al 380 412-3456.";
            return respuesta;
        }
        return "🎓 Actualmente no hay capacitaciones programadas. Te recomendamos consultar más tarde o contactarnos al 380 412-3456 para más información.";
    }
    
    // ========== UBICACIÓN / DIRECCIÓN ==========
    if (p.includes('ubicación') || p.includes('dirección') || p.includes('dónde están') || p.includes('donde queda') || p.includes('donde nos encontramos') || p.includes('sede')) {
        return "📍 Nuestra sede está en:\n\n🏢 Av. Ramírez de Velazco 123, La Rioja Capital\n\n🕐 Horario de atención: Lunes a Viernes de 8:00 a 14:00\n📞 Teléfono: 380 412-3456\n📧 Email: info@cotolar.org";
    }
    
    // ========== HORARIOS ==========
    if (p.includes('horario') || p.includes('atención') || p.includes('cuando abren') || p.includes('horarios de atencion')) {
        return "🕐 Horarios de atención del COTOLAR:\n\nLunes a Viernes: 8:00 a 14:00\n\n📞 Consultas telefónicas: 380 412-3456\n📧 Consultas por email: info@cotolar.org (respondemos en 48hs hábiles)";
    }
    
    // ========== CONTACTO / TELÉFONO / EMAIL ==========
    if (p.includes('contacto') || p.includes('teléfono') || p.includes('whatsapp') || p.includes('llamar') || p.includes('email') || p.includes('correo') || p.includes('mail') || p.includes('contactarnos')) {
        return "📞 Datos de contacto del COTOLAR:\n\n• Teléfono: 380 412-3456\n• Email: info@cotolar.org\n• Dirección: Av. Ramírez de Velazco 123, La Rioja Capital\n\n🕐 Atención: Lunes a Viernes 8:00 a 14:00\n\n¡Estamos para ayudarte!";
    }
    
    // ========== PROFESIONALES / COLEGIADOS ==========
    if (p.includes('profesional') || p.includes('colegiado') || p.includes('matriculado') || p.includes('terapeutas') || p.includes('profesionales activos') || p.includes('lista de profesionales')) {
        const pro = window.PROFESIONALES_ACTIVOS || [];
        if (pro.length > 0) {
            let respuesta = "👥 Profesionales matriculados en COTOLAR:\n\n";
            pro.slice(0, 10).forEach(p => { respuesta += `• ${p.nombre} - ${p.especialidad} (${p.localidad})\n`; });
            if (pro.length > 10) respuesta += `\n... y ${pro.length - 10} profesionales más.`;
            respuesta += `\n\n📊 Total de profesionales activos: ${pro.length}`;
            return respuesta;
        }
        return "👥 Actualmente hay más de 350 profesionales matriculados en COTOLAR en toda la provincia de La Rioja.";
    }
    
    // ========== NOTICIAS ==========
    if (p.includes('noticia') || p.includes('novedad') || p.includes('información') || p.includes('nuevo') || p.includes('actualidad')) {
        const noticias = datos.noticias;
        if (noticias && noticias.length > 0) {
            let respuesta = "📰 Últimas noticias del COTOLAR:\n\n";
            noticias.slice(0, 3).forEach(n => {
                respuesta += `📌 ${n.titulo}\n   ${n.contenido.substring(0, 100)}...\n   📅 ${new Date(n.fecha).toLocaleDateString('es-AR')}\n\n`;
            });
            return respuesta;
        }
        return "📰 No hay noticias recientes. Mantente atento a nuestras actualizaciones.";
    }
    
    // ========== CONVENIOS ==========
    if (p.includes('convenio') || p.includes('acuerdo') || p.includes('universidad') || p.includes('unlar')) {
        return "🤝 COTOLAR tiene convenios vigentes con:\n\n• Universidad Nacional de La Rioja (UNLaR)\n• Ministerio de Salud de La Rioja\n• Obras sociales provinciales\n\n📌 Actualmente contamos con 12 convenios activos que benefician a nuestros matriculados.";
    }
    
    // ========== APP / DESCARGAR ==========
    if (p.includes('app') || p.includes('descargar') || p.includes('instalar') || p.includes('aplicación') || p.includes('celular') || p.includes('telefono')) {
        return "📱 Para usar COTOLAR como app en tu celular:\n\n📲 Android: Abrí Chrome → 3 puntos → 'Instalar aplicación'\n🍎 iPhone: Abrí Safari → Compartir → 'Agregar a pantalla de inicio'\n\n✅ Beneficios: Funciona offline, notificaciones, acceso rápido desde tu pantalla de inicio.";
    }
    
    // ========== DEMO / AVISO ==========
    if (p.includes('demo') || p.includes('prueba') || p.includes('ejemplo') || p.includes('datos reales')) {
        return "⚠️ Esto es una versión DEMO del sistema COTOLAR. Los datos mostrados (nombres de profesionales, aranceles, fechas) son a modo de ejemplo. Para información oficial, contactate con el Colegio de Terapia Ocupacional de La Rioja al 380 412-3456.";
    }
    
    // ========== AYUDA ==========
    if (p.includes('ayuda') || p.includes('que podes hacer') || p.includes('funciones') || p.includes('comandos') || p.includes('que sabes')) {
        return "💡 Puedo ayudarte con:\n\n• 📝 Matriculación (requisitos y pasos)\n• 💰 Aranceles y costos\n• 📋 Requisitos documentales\n• 🎓 Capacitaciones y cursos\n• 📍 Ubicación y contacto\n• 👥 Profesionales activos\n• 📰 Noticias del colegio\n\n¿Sobre qué querés consultar?";
    }
    
    // ========== BUSCAR EN NOTICIAS ==========
    const noticia = datos.noticias.find(n => 
        n.titulo.toLowerCase().includes(p) || 
        n.contenido.toLowerCase().includes(p)
    );
    if (noticia) {
        return `📰 Te puede interesar esta noticia:\n\n"${noticia.titulo}"\n\n${noticia.contenido.substring(0, 200)}${noticia.contenido.length > 200 ? '...' : ''}\n\n📅 ${new Date(noticia.fecha).toLocaleDateString('es-AR')}`;
    }
    
    // ========== BUSCAR EN CURSOS ESPECÍFICOS ==========
    const curso = datos.capacitaciones.find(c => 
        c.nombre_curso.toLowerCase().includes(p)
    );
    if (curso) {
        return `🎓 Información del curso:\n\n📌 ${curso.nombre_curso}\n📅 Fecha: ${new Date(curso.fecha_inicio).toLocaleDateString('es-AR')}\n📍 Modalidad: ${curso.modalidad}\n💰 Arancel: $${curso.arancel_curso.toLocaleString()}\n👨‍🏫 Instructor: ${curso.instructor}\n📍 Lugar: ${curso.lugar}\n👥 Vacantes: ${curso.vacantes}`;
    }
    
    // ========== RESPUESTA POR DEFECTO (cuando no entiende) ==========
    return "❓ No encontré información exacta sobre \"" + pregunta + "\".\n\n📌 Te sugiero:\n\n• Reformular tu pregunta con otras palabras\n• Preguntar por temas como: matrícula, aranceles, requisitos, capacitaciones, horarios, contacto\n• Revisar la sección Trámites en el menú principal\n• Contactarnos directamente al 📞 380 412-3456 o 📧 info@cotolar.org\n\n¿Podés intentar de nuevo?";
}

document.addEventListener('DOMContentLoaded', () => { 
    inicializarChat(); 
});